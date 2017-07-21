(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('HeaderController',
        HeaderController);
    HeaderController.$inject = ['Principal', 'Auth', '$state', '$scope', '$window'];

    function HeaderController(Principal, Auth, $state, $scope, $window) {
        var vm = this;

        vm.account;

        $scope.$on('authenticationSuccess', function () {
            vm.getAccount();
        });



        vm.getAccount = function() {
            Principal.identity().then(function (account) {
                vm.account = account;
            });
        }



        vm.isAuthenticated = function() {
            return Principal.isAuthenticated();
        }


        vm.logout= function() {
            $state.go('authentication');
            Auth.logout();

        }

    }

})();
