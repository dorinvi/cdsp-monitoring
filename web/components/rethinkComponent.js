angular.module('rethink.component').component('rethinkStatus', {
    templateUrl: 'components/rethinkTemplate.html',
    controller: ['Rethink', function(Rethink) {
        var ctrl = this;
        ctrl.$onInit = function() {
            console.log("Retrieve rethink status");
            Rethink.query().$promise
                .then(
                    function(result) {
                        console.log(JSON.stringify(result));
                        ctrl.rethinkStatus = result;
                    })
                .catch(
                    function(error) {
                        console.log(JSON.stringify(error));
                        ctrl.rethinkStatus = {
                            "status": "INDETERMINATE"
                        };
                    }
                );
        };
    }]
});