(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$log','$mdDialog', '$mdMedia', '$rootScope', '$http', '$httpParamSerializer','$document'];

    function SearchService($log, $mdDialog, $mdMedia, $rootScope, $http, $httpParamSerializer, $document) {
        var searchResult = [];
        var searchError;

        var service = {
            open: open,
            search: search,
            hide: hide,
            searchResult: [],
            searchError: '',
            clear: clear
        };

        return service;

        function search(searchObj) {
            var temp = angular.toJson(searchObj);
            clear();

            $http({
                url: "api/getConfigurationByFullname",
                method: "POST",
                timeout: 240000,
                data: temp

            }).then(function (response) {
                var jsonResponse = response.data;

                for (var i = 0; i < jsonResponse.length; i++) {
                    service.searchResult.push(jsonResponse[i]);
                }

                // $log.debug("Search Result: " + angular.toJson(response));
                $rootScope.$broadcast('searchSuccess');
                hide();
            }, function (error) {
                service.searchError = error.data.description;
                $rootScope.$broadcast('searchError');
            });
        }

        function clear(){
            service.searchResult = [];
            service.searchError = '';
        }

        function open(ev) {
            $mdDialog.show({
                controller: 'SearchController',
                controllerAs: 'vm',
                templateUrl: 'app/configurationtree/search/search.tmpl.html',
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
