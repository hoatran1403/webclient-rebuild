/**
*
* @author ort1hc
* @description objectsCompareController controller for configuration tree view
*
*/
(function (angular, undefined) {
    'use strict';

    angular.module('sdomWebClientApp').controller('objectsCompareController',
        objectsCompareController);

    objectsCompareController.$inject = ['ObjectsCompareResource', 'configurationTreeData'];

    function objectsCompareController(ObjectsCompareResource, configurationTreeData) {

        var vm = this;
        vm.firstSelectedObj;
        vm.secondSelectedObj;



        vm.firstList = [];
        vm.secondList = [];
        vm.init = init;

        vm.extractSecondObjects = extractSecondObjects;

        /**
        * FUNCTION: to initialize data for list
        */
        function init() {
            //get selected object
            vm.firstSelectedObj = angular.copy(configurationTreeData.selectedList[0]);
            vm.secondSelectedObj = angular.copy(configurationTreeData.selectedList[1]);

            vm.firstSelectedObj.opened = true;
            vm.secondSelectedObj.opened = true;

            var objs = [vm.firstSelectedObj, vm.secondSelectedObj];

            ObjectsCompareResource.save(objs, function (data) {
                vm.firstSelectedObj.children = vm.extractFirstObjects(data).slice();
                vm.secondSelectedObj.children = extractSecondObjects(data).slice();

                // push to List
                vm.firstList.push(vm.firstSelectedObj);
                vm.secondList.push(vm.secondSelectedObj);
            })

        }

        vm.extractFirstObjects = function (objects) {

            return objects.map(function (obj) {
                if (obj.comparisonResult !== 'secondOnly') {
                    return obj;
                } else {
                    return {
                        'objectCompareIconUrl': obj.objectCompareIconUrl
                    };
                }
            });
        };

        function extractSecondObjects(objects) {
            return objects.map(function (obj) {
                if (obj.comparisonResult !== 'firstOnly') {
                    return obj;
                } else {
                    return null;
                }
            });
        }
    }
})(angular);

/*
* Copyright (c) 2016 Robert Bosch GmbH and its subsidiaries. This program and
* the accompanying materials are made available under the terms of the License
* which accompanies this distribution. Developed by RBVH/ENG2 team.
*/
