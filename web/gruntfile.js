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
        watch: {
            files: '<%= src.app %>',
            tasks: ['copy']
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'dist'
                }
            }
        }
    });

    // Default task(s)
    grunt.registerTask('default', ['copy', 'uglify', 'connect', 'watch']);

    // Load dependencies
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
};