
(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('InfoBlockController',
        InfoBlockController);
    InfoBlockController.$inject = ['configurationTreeData', '$http', 'InfoBlockService'];
    function InfoBlockController(configurationTreeData, $http, InfoBlockService) {
        var vm = this;
        var infoBlock = {};

        vm.infoBlock = infoBlock;
        vm.hideDialog = hideDialog;

        getEOP();

        function getEOP() {
            if (configurationTreeData.selectedList[0]) {

                var temp = angular.toJson(configurationTreeData.selectedList[0]);

                $http({
                    url: "api/getEOP",
                    method: "POST",
                    data: temp
                }).then(function (response) {
                    vm.infoBlock = response.data;
                });

            }
        }

        function hideDialog() {
            InfoBlockService.hide();
        }

    }

})();
