angular.module('mongo.rest')
    .factory('Mongo', ['$resource', 'url',
        function MongoFactory($resource, url) {
            'use strict';
            return $resource(url + '/api/mongo', null, {
                'query': { method: 'GET' }
            });
        }
    ]);