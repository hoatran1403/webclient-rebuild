/**
*
* @author YGD1HC
* @description Package List Directives (for both PL-M1 and PL-MDG1C,
*              respectively)
*/
(function () {
    'use strict';

    angular.module('sdomWebClientApp')
        .directive('treeTable', treeTable);


    function treeTable() {
        var directive = {
            controller: "TreetableController",
            controllerAs: "vm",
            restrict: "E",
            templateUrl: "app/configurationtree/treetable/treetable.tmpl.html",
            scope: {}
        };

        return directive;

    }



})();

	/*
	* Copyright (c) 2016 Robert Bosch GmbH and its subsidiaries. This program and
	* the accompanying materials are made available under the terms of the License
	* which accompanies this distribution. Developed by RBVH/ENG2 team.
	*/
