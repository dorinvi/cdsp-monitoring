angular.module('mongo.component').component('mongoStatus', {
    templateUrl: 'components/mongoTemplate.html',
    controller: ['Mongo', function(Mongo) {
        var ctrl = this;
        ctrl.$onInit = function() {
            console.log("Retrieve mongo status");
            // ctrl.mongoStatus = Mongo.query();
            Mongo.query().$promise
                .then(
                    function(result) {
                        console.log(JSON.stringify(result));
                        ctrl.mongoStatus = result;
                    })
                .catch(
                    function(error) {
                        console.log(JSON.stringify(error));
                        ctrl.mongoStatus = {
                            "status": "INDETERMINATE"
                        };
                    }
                );
        };
    }]
});