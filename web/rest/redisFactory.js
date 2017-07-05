angular.module('redis.rest')
    .factory('Redis', ['$resource', 'url',
        function RedisFactory($resource, url) {
            'use strict';
            return $resource(url + '/api/redis', null, {
                'query': { method: 'GET' }
            });
        }
    ]);