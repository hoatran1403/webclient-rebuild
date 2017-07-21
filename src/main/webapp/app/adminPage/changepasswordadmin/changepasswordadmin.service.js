(function() {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('ChangePasswordAdminService', ChangePasswordAdminService);

    ChangePasswordAdminService.$inject = ['$uibModal','$rootScope'];

    function ChangePasswordAdminService ($uibModal, $rootScope) {
        var service = {
            open: open,
            resetModal: resetModal,
            modalInstance: undefined,
            passwordError: ''
        };

        return service;

        function resetModal() {
            service.modalInstance = undefined;
        };

        function open () {
            if (angular.isUndefined(service.modalInstance)){
                  service.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/adminPage/changepasswordadmin/changepasswordadmin.html',
                controller: 'ChangePasswordAdminController',
                controllerAs: 'vm',
                resolve: {}
            });
            service.modalInstance.result.then(
                resetModal,resetModal
            );
            }

        }
    }
})();
