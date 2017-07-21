/**
 *
 * @author ORT1HC
 * @description treetable controller for Sdom Web Client
 *              
 */
(function (angular, undefined) {
    'use strict';

    angular.module('sdomWebClientApp').controller('TreetableController',
        TreetableController);

    TreetableController.$inject = ['$sessionStorage', '$localStorage', 'ConfigurationChildrenResource', '$scope', 'SearchService', '$window', '$log', 'configurationTreeObjectConstant', 'configurationTreeData'];

    function TreetableController($sessionStorage, $localStorage, ConfigurationChildrenResource, $scope, SearchService, $window, $log, configurationTreeObjectConstant, configurationTreeData) {

        var vm = this;

        vm.defaultObject = configurationTreeObjectConstant;
        vm.list = [];
        vm.expandNode = expandNode;
        vm.openWindow = openWindow;
        vm.toggleCheckbox = toggleCheckbox;
        vm.isExisted = isExisted;
        vm.selectedList = configurationTreeData.selectedList;
        vm.clearSelectedList = clearSelectedList;
        vm.init = init;

        //table pagination configuration
        vm.pagination = {
            limitOptions: [50, 100, 150],
            options: {
                boundaryLinks: false,
                pageSelect: true
            },
            query: {
                order: 'fullname',
                limit: 50,
                page: 1
            }
        };

        function clearSelectedList() {
            vm.selectedList.splice(0, vm.selectedList.length);
        }

        //Toogle function of checkbox
        function toggleCheckbox(item) {

            if (isExisted(item)) {
                //remove item if already exist in selectedList
                vm.selectedList.splice(vm.selectedList.indexOf(item), 1);
            }
            else {
                //remove first item if list contains more than 2 items
                if (vm.selectedList.length >= 2) {
                    vm.selectedList.shift();
                }
                //add item to selectedList if not exist
                vm.selectedList.push(item);

            }
        }

        //exists function of checkbox
        function isExisted(item) {
            try {
                return vm.selectedList.indexOf(item) > -1;
            } catch (err) {
                vm.selectedList = [];
                return vm.selectedList.indexOf(item) > -1;
            }

        }

        $scope.$on('searchSuccess', function () {
            var searchResult = SearchService.searchResult;
            //clear list
            vm.list = [];
            if (searchResult) {

                var tempList = [];
                searchResult.map(function (item) {
                    tempList.push(item);
                });
                vm.list = tempList;
            }

            clearSelectedList();
        });


        /**
        * FUNCTION: to open new window on double click in configuration tree view
        */

        function openWindow(item) {
            $window.selectedItem = item;
            $window.open('https://' + $window.location.host + '/sdomwebclient/#/configurationtree');
            // $window.open('https://' + $window.location.host + '/#/configurationtree');
        }


        /**
        * FUNCTION: to get configuration tree children when open new node or recall
        * current node
        */
        function expandNode(item) {

            //toggle expand and collapse node
            item.opened = !item.opened;
            //fetch data when it's not available(lazy loading)
            if (angular.isUndefined(item.children) && item.iconUrl === null) {
                item.children = [];

                ConfigurationChildrenResource.save(item, function (data) {
                    data.map(function (it) {
                        item.children.push(it);
                    })
                });
            }

        }

        /**
       * FUNCTION: to initialize data for list
       */
        function init() {
            if (angular.isDefined($window.opener) && $window.opener !== null && angular.isDefined($window.opener.selectedItem)) {
                var selectedItem = $window.opener.selectedItem;

                    var searchObject = {
                        'rootId': selectedItem.rootId,
                        'clazz': selectedItem.clazz,
                        'elementName': selectedItem.elementName,
                        'variant': selectedItem.variant,
                        'revision': selectedItem.revision
                    };
                    SearchService.search(searchObject);
                    $sessionStorage.searchObject = searchObject;
                    $window.opener.selectedItem = undefined;
                
            } else {

                var sessionSearchObj = $sessionStorage.searchObject;
                var localSearchObject = $localStorage.searchObject;

                if (angular.isDefined(sessionSearchObj)) {
                    SearchService.search(sessionSearchObj);
                } else if (angular.isDefined(localSearchObject)) {
                    SearchService.search(localSearchObject);
                } else {
                    SearchService.open();
                }
            }
        }

    }
    // }
})(angular);

/*
 * Copyright (c) 2016 Robert Bosch GmbH and its subsidiaries. This program and
 * the accompanying materials are made available under the terms of the License
 * which accompanies this distribution. Developed by RBVH/ENG2 team.
 */
