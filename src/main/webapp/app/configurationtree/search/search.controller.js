
(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('SearchController',
        SearchController);
    SearchController.$inject = ['SearchService', '$scope', '$localStorage', '$sessionStorage'];
    function SearchController(SearchService, $scope, $localStorage, $sessionStorage) {
        var vm = this;


        var searchObject = {
            rootId: '10239202',
            clazz: "",
            elementName: "",
            variant: "",
            revision: ""
        };

        vm.searchObject = searchObject;
        vm.search = search;
        vm.hide = hide;
        vm.clear = clear;
        vm.isSearching = false;
        vm.searchError = '';
        vm.retrieveSearchList = retrieveSearchList;
        vm.searchList = [];
        // vm.isSelected = isSelected;
        vm.selectObject = selectObject;

        $scope.$on('searchError', function () {
            vm.searchError = SearchService.searchError;
            vm.isSearching = false;
        });

        $scope.$on('searchSuccess', function () {
            vm.isSearching = false;
            $localStorage.searchObject = vm.searchObject;
            $sessionStorage.searchObject = vm.searchObject;

            if (angular.isUndefined(vm.searchList)) {
                vm.searchList = [];
            }
            addToSearchList(vm.searchObject);

            $localStorage.searchList = vm.searchList;


            vm.hide();
        });

        function addToSearchList(obj) {
            var isDuplicate = false;

            //convert all values to lowercase
            for(var i in obj){
                obj[i] = angular.lowercase(obj[i]);
            }
            
            //check for duplication
            vm.searchList.map(function (item) {
                if (item.clazz === obj.clazz && item.elementName === obj.elementName
                    && item.variant === obj.variant && item.revision === obj.revision) isDuplicate = true;
            })
            if (!isDuplicate) {
                if (vm.searchList.length >= 7) {
                    vm.searchList.shift();
                }
                vm.searchList.push(obj);
            }

            console.log("searchObject: " + obj);
            console.log("isDuplicate: " + isDuplicate);

        }

        function selectObject(item) {

            vm.searchObject = Object.assign({}, item);
        }

        function retrieveSearchList() {
            vm.searchList = $localStorage.searchList;
        }

        function search() {
            if (vm.searchObject.clazz === '' || vm.searchObject.elementName === '') {
                vm.searchError = 'Invalid Search Criteria';
            } else {
                vm.searchError = '';
                SearchService.search(vm.searchObject);
                vm.isSearching = true;
            }

        }

        function clear() {
            vm.searchObject = searchObject;
        }

        function hide() {
            vm.searchList = [];
            SearchService.hide();
        }


    }

})();
