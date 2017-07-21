(function () {
    'use strict';

    angular.module('sdomWebClientApp').config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {


        $stateProvider.state('configurationtree', {
            parent: 'app',
            url: '/configurationtree',
            data: {
                authorities: []

            },
            views: {
                'sidebar@': {
                    templateUrl: 'app/layouts/sidebar/sidebar.html',
                    controller: 'SidebarController',
                    controllerAs: 'vm'
                },
                'body@': {
                    templateUrl: 'app/configurationtree/configurationtree.html',
                    controller: 'ConfigurationTreeController',
                    controllerAs: 'vm'
                }
            }
        });

    }

})();
