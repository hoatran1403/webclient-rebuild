(function () {
    'use strict';

    angular.module('sdomWebClientApp').config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {


        $stateProvider.state('normalizationEditor', {
            parent: 'app',
            url: '/normalizationeditor',
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
                    templateUrl: 'app/normalizationEditor/normalizationEditor.html',
                    controller: 'NormalizationEditorController',
                    controllerAs: 'vm'
                }
            }
        });
    }

})();
