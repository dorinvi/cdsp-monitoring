angular.module('config', []);
angular.module('mongo.rest', ['ngResource', 'config']);
angular.module('mongo.component', ['mongo.rest']);
angular.module('redis.rest', ['ngResource']);
angular.module('redis.component', ['redis.rest']);
angular.module('rethink.rest', ['ngResource']);
angular.module('rethink.component', ['rethink.rest']);
angular.module('cdsp-monitoring', [
    'config',
    'mongo.rest',
    'mongo.component',
    'redis.rest',
    'redis.component',
    'rethink.rest',
    'rethink.component'
]);