(function() {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            params: {
                selectedItem: {
                    value: null,
                    squash: true
                },
                selectedList: {
                    value:null,
                    squash: true
                }
            },
            views: {
                'header@': {
                    templateUrl: 'app/layouts/header/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'vm'
                }

            },
            resolve: {
                authorize: ['Auth',
                    function(Auth) {
                        return Auth.authorize();
                    }
                ]
            }
        });

    }
})();
