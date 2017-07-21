(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('InfoBlockService', InfoBlockService);

    InfoBlockService.$inject = ['$mdDialog', '$mdMedia', '$http', '$q', 'configurationTreeData'];

    function InfoBlockService($mdDialog, $mdMedia, $http, $q, configurationTreeData) {
        var service = {
            open: open,
            hide: hide
        };

        return service;

        function open(ev) {


            if (configurationTreeData.selectedList[0]) {
                $mdDialog.show({
                    controller: 'InfoBlockController',
                    controllerAs: 'vm',
                    templateUrl: 'app/configurationtree/infoBlock/infoBlock.tmpl.html',
                    // parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }
        }

        function hide() {
            $mdDialog.hide();
        }

    }
})();
