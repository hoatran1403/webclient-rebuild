(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('AdminPageController',
        AdminPageController);
    AdminPageController.$inject = ['$scope', 'Principal', 'ChangePasswordAdminService','AdminAccountService','$rootScope'];

    function AdminPageController($scope, Principal, ChangePasswordAdminService, AdminAccountService, $rootScope) {
        var vm = this;
        vm.sdomAccount = undefined;
        vm.adminNotification = false;


        $scope.$on('passwordAdminChange', function () {
            vm.getSdomAccount();

        });

        vm.openSidebar = function () {
            $rootScope.$broadcast('openSidebar');

        }


        // Check for admin password expired notification
        vm.checkAdminNotification = function() {
            if (Principal.hasAuthority('ROLE_ADMIN')) {
                AdminAccountService.get().then(function (data) {
                    if (data.expiredDate <= 30) {
                        vm.adminNotification = true;
                    } else {
                        vm.adminNotification = false;
                    }
                });
            }
        }

        vm.getSdomAccount = function() {
            AdminAccountService.get().then(function (response) {
                vm.sdomAccount = response;
                vm.checkAdminNotification();
            });

        }

        vm.openChangePassword = function() {
            ChangePasswordAdminService.open();
        }


    }

})();
