(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('authentication', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'body@': {
                    templateUrl: 'app/loginPage/loginPage.html',
                    controller: 'LoginPageController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        });

    }


})();
