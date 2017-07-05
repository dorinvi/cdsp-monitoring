angular.module('redis.component').component('redisStatus', {
    templateUrl: 'components/redisTemplate.html',
    controller: ['Redis', function(Redis) {
        var ctrl = this;
        ctrl.$onInit = function() {
            console.log("Retrieve redis status");
            Redis.query().$promise
                .then(
                    function(result) {
                        console.log(JSON.stringify(result));
                        ctrl.redisStatus = result;
                    })
                .catch(
                    function(error) {
                        console.log(JSON.stringify(error));
                        ctrl.redisStatus = {
                            "status": "INDETERMINATE"
                        };
                    }
                );
        };
    }]
});