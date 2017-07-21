/**
*
* @author YGD1HC
* @description Package List Directives (for both PL-M1 and PL-MDG1C,
*              respectively)
*/
(function (angular, undefined) {
    'use strict';

    angular.module('sdomWebClientApp')
        .directive('objectsCompare', objectsCompare);

    function objectsCompare() {
        return {
            controller: "objectsCompareController",
            controllerAs: "vm",
            restrict: "E",
            templateUrl: "app/configurationtree/configurationtree-compare/objectsCompare/objectsCompare.tmpl.html",
            scope: {}
        };
    }



})(angular);

	/*
	* Copyright (c) 2016 Robert Bosch GmbH and its subsidiaries. This program and
	* the accompanying materials are made available under the terms of the License
	* which accompanies this distribution. Developed by RBVH/ENG2 team.
	*/
