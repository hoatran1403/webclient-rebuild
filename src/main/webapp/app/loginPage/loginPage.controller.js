(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .controller('LoginPageController', LoginPageController);

    LoginPageController.$inject = ['LoginModalService'];

    function LoginPageController(LoginModalService) {
        var vm = this;

        vm.openLogin = openLogin;


        function openLogin() {

            LoginModalService.open();

        }

    }
})();
