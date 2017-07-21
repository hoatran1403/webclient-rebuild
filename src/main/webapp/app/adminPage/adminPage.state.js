(function () {
    'use strict';

    angular.module('sdomWebClientApp').config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {


        $stateProvider.state('adminPage', {
            parent: 'app',
            url: '/adminpage',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            views: {
                'sidebar@': {
                    templateUrl: 'app/layouts/sidebar/sidebar.html',
                    controller: 'SidebarController',
                    controllerAs: 'vm'
                },
                'body@': {
                    templateUrl: 'app/adminPage/adminPage.html',
                    controller: 'AdminPageController',
                    controllerAs: 'vm'
                }


            },
            resolve: {

            }
        });

    }

})();
