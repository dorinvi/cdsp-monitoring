module.exports = function(grunt) {
    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        distdir: 'dist',
        libsDir: 'bower_components',
        iconFont: '<%= libsDir %>/material-design-icons/iconfont',
        src: {
            jsLibs: [
                '<%= libsDir %>/angular/angular.js',
                '<%= libsDir %>/angular-resource/angular-resource.js'
            ],
            fonts: [
                '<%= iconFont %>/MaterialIcons-Regular.eot',
                '<%= iconFont %>/MaterialIcons-Regular.woff2',
                '<%= iconFont %>/MaterialIcons-Regular.woff',
                '<%= iconFont %>/MaterialIcons-Regular.ttf'
            ],
            app: [
                'index.html',
                'app.js',
                'app.css',
                'config.js',
                'rest/mongoFactory.js',
                'rest/redisFactory.js',
                'rest/rethinkFactory.js',
                'components/mongoComponent.js',
                'components/mongoTemplate.html',
                'components/redisComponent.js',
                'components/redisTemplate.html',
                'components/rethinkComponent.js',
                'components/rethinkTemplate.html'
            ]
        },
        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['gruntfile.js']
        },
        uglify: {
            libs: {
                options: {
                    output: {
                        comments: 'some' // Preserve license comments
                    }
                },
                files: {
                    '<%= distdir %>/js/libs.js': '<%= src.jsLibs %>'
                }
            }
        },
        copy: {
            files: {
                src: '<%= src.app %>',
                dest: '<%= distdir %>',
                expand: true
            },
            fonts: {
                src: '<%= src.fonts %>',
                dest: '<%= distdir %>/fonts',
                expand: true,
                flatten: true
            }
        },
        ngconstant: {
            options: {
                name: 'config',
                wrap: '\'use strict\';\n\n{%= __ngModule %}',
                space: '  '
            },
            development: {
                options: {
                    dest: '<%= distdir %>/config.js'
                },
                constants: {
                    url: 'http://localhost:8080'
                }
            },
            production: {
                options: {
                    dest: '<%= distdir %>/config.js'
                },
                constants: {
                    url: ''
                }
            }
        },
        watch: {
            files: '<%= src.app %>',
            tasks: ['copy']
        },
        connect: {
            server: {
                options: {
                    port: 8001,
                    base: 'dist'
                }
            }
        }
    });

    // Default task(s)
    grunt.registerTask('default', ['ngconstant:development', 'uglify', 'copy', 'connect', 'watch']);
    grunt.registerTask('prod', ['ngconstant:production', 'uglify', 'copy']);

    // Load dependencies
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ng-constant');
};

// Setup ng-config: https://github.com/werk85/grunt-ng-constant#upgrade-from-v04x-to-v05x
// Using ENV: https://stackoverflow.com/questions/16339595/how-do-i-configure-different-environments-in-angular-js
// Using provider:  https://stackoverflow.com/questions/23217263/angular-js-resource-as-a-service-with-dynamic-root