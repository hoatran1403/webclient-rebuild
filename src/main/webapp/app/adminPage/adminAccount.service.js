(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('AdminAccountService', AdminAccountService);

    AdminAccountService.$inject = ['$http', '$q'];

    function AdminAccountService($http, $q) {
         var sdomAccount = undefined;

        var service = {
            get: get

        };

        return service;

        function get() {
            var deferred = $q.defer();

            if (angular.isDefined(sdomAccount)) {
                deferred.resolve(sdomAccount);
                return deferred.promise;
            }

            $http({
                url: "api/adminpage/getsdomaccount",
                method: "GET"
            }).then(function (response) {
                deferred.resolve(response.data);

            });


            return deferred.promise;

        }



    }
})();
