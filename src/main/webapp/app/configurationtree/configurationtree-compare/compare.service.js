(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('CompareService', CompareService);

    CompareService.$inject = ['$mdDialog', '$mdMedia', '$rootScope', '$http', '$httpParamSerializer','$document'];

    function CompareService($mdDialog, $mdMedia, $rootScope, $http, $httpParamSerializer, $document) {

        var service = {
            open: open,
            hide: hide
        };

        return service;

        function open(ev) {
            $mdDialog.show({
                controller: 'CompareController',
                controllerAs: 'vm',
                templateUrl: 'app/configurationtree/configurationtree-compare/compare.tmpl.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        function hide() {
            $mdDialog.hide();
        }
    }
})();
