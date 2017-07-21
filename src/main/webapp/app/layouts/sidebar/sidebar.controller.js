/**
 *
 */

(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('SidebarController',
        SidebarController);

    SidebarController.$inject = ['$state', 'Auth', 'Principal', '$mdMedia', '$scope', 'AdminAccountService', '$timeout', '$mdSidenav'];

    function SidebarController($state, Auth, Principal, $mdMedia, $scope, AdminAccountService, $timeout, $mdSidenav) {
        var vm = this;
        vm.goConfigurationTree = goConfigurationTree;
        vm.goNormalizationEditor = goNormalizationEditor;
        vm.goImplementationEditor = goImplementationEditor;
        vm.goAdminPage = goAdminPage;
        vm.checkAdminNotification = checkAdminNotification;
        vm.adminNotification = false;

        $scope.$on('openSidebar', function () {
            $timeout(function () { $mdSidenav('left').open(); });
        });

        // $scope.$on('passwordAdminChange', function () {
        //     getSdomAccount();

        // });

        // Check for admin password expired notification
        function checkAdminNotification() {
            if (Principal.hasAuthority('ROLE_ADMIN')) {
                AdminAccountService.get().then(function (data) {
                    if (data.expiredDate <= 60) {
                        vm.adminNotification = true;
                    } else {
                        vm.adminNotification = false;
                    }
                });
            }
        }

        function goConfigurationTree() {
            $state.go('configurationtree');
        }

        function goNormalizationEditor() {
            $state.go('normalizationEditor');
        }

        function goImplementationEditor() {
            $state.go('implementationEditor');
        }

        function goAdminPage() {
            $state.go('adminPage');
        }
    }


})();
