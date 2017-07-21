(function () {
    'use strict';

    angular.module('sdomWebClientApp').config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {


        $stateProvider.state('implementationEditor', {
            parent: 'app',
            url: '/implementationeditor',
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
                    templateUrl: 'app/configurationtree/implementationEditor/implementationEditor.html',
                    controller: 'ImplementationEditorController',
                    controllerAs: 'vm'
                }
            },
            resolve: {

            }
        });

    }

})();
