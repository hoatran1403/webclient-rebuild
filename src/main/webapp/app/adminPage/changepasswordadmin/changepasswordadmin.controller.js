(function() {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .controller('ChangePasswordAdminController', ChangePasswordAdminController);

    ChangePasswordAdminController.$inject = ['$rootScope' , '$uibModalInstance', '$http','AdminAccountService'];

    function ChangePasswordAdminController($rootScope, $uibModalInstance, $http, AdminAccountService) {
        var vm = this;

        vm.sdomAccount = null;
        vm.passwordError = '';

        vm.getSdomAccount = function() {
            AdminAccountService.get().then(function(response) {
                vm.sdomAccount = response;
            });

        }

        vm.cancel= function() {
            $uibModalInstance.dismiss('cancel');
        }

        vm.submit= function(event) {
            event.preventDefault();

            var temp = angular.toJson(vm.sdomAccount)

            $http({
                url: "api/adminpage/changepassword",
                method: "POST",
                data: temp
            }).then(function(response) {
                $rootScope.$broadcast('passwordAdminChange');
                $uibModalInstance.close();

            }, function(error) {
                vm.passwordError = error.data.description || error.data.message || error.data.AuthenticationException || error.statusText;
                console.log(error);
            });
        }



    }
})();
