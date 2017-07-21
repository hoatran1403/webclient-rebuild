(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('NormalizationEditorController',
        NormalizationEditorController);
    NormalizationEditorController.$inject = ['$q', '$scope', '$timeout', '$http', '$rootScope', '$log'];

    function NormalizationEditorController($q, $scope, $timeout, $http, $rootScope, $log) {
        var vm = this;

        vm.selected = [];
        vm.limitOptions = [50, 100, 150];
        vm.oslcPageNo = 1;

        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };

        vm.query = {
            order: 'name',
            limit: 50,
            page: 1
        };

        var SystemConstants = { count: 0, data: [] }

        vm.SystemConstants = SystemConstants;
        vm.openSidebar = openSidebar;
        vm.getSystemConstantNormalization = getSystemConstantNormalization;

        function openSidebar() {
            $rootScope.$broadcast('openSidebar');
        }

        function getSystemConstantNormalization(pageno) {
            $http({
                url: "api/systemConstant/normalization",
                method: "POST",
                headers: {
                    'oslc-page-number':pageno
                }
            }).then(function (response) {
                if (response.data) {
                    SystemConstants.count += response.data.length;
                    //append reponse to data
                    SystemConstants.data = SystemConstants.data.concat(response.data);
                }
            });
        }

          vm.logPagination = function (page, limit) {
              var totalItem = page * limit;
            
            if(totalItem >= SystemConstants.count){
                vm.oslcPageNo++;
                getSystemConstantNormalization(vm.oslcPageNo);
            }

            $log.info('page: ', page);
            $log.info('limit: ', limit);
        };

    }

})();
