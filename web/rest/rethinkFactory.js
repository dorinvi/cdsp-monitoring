angular.module('rethink.rest')
    .factory('Rethink', ['$resource', 'url',
        function RethinkFactory($resource, url) {
            'use strict';
            return $resource(url + '/api/rethink', null, {
                'query': { method: 'GET' }
            });
        }
    ]);