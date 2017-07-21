(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('LoginModalService', LoginModalService);

    LoginModalService.$inject = ['$uibModal'];

    function LoginModalService($uibModal) {
        var service = {
            open: open,
            modalInstance: undefined,
            resetModal: resetModal
        };
        return service;

        function resetModal() {
            service.modalInstance = undefined;
        };



        function open() {
            if (angular.isUndefined(service.modalInstance)) {
                service.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/loginPage/loginModal/loginModal.html',
                    controller: 'LoginModalController',
                    controllerAs: 'vm',
                    backdrop: 'static'
                });

                service.modalInstance.result.then(
                    resetModal,
                    resetModal
                );
            }

        }
    }
})();
