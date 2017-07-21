(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('ImplementationEditorController',
        ImplementationEditorController);
    ImplementationEditorController.$inject = ['$q', '$scope', '$timeout', '$http', '$state', '$sessionStorage', '$rootScope', '$log'];

    function ImplementationEditorController($q, $scope, $timeout, $http, $state, $sessionStorage, $rootScope, $log) {
        var vm = this;

        vm.selected = [];
        vm.limitOptions = [50, 100, 150];
        vm.rootName = "PVER:P1291_FIAT_DS/D030;9";
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

        // vm.getSystemConstantImplementation();

        vm.SystemConstants = { count: 0, data: [] };

        vm.openSidebar = function () {
            $rootScope.$broadcast('openSidebar');

        }

        vm.getSystemConstantImplementation = function (pageno) {
            if ($state.params.selectedItem) {
                vm.callAPI($state.params.selectedItem, pageno);

                //store rootId of selected item to session
                $sessionStorage.selectedItem = $state.params.selectedItem;
            } else {
                if ($sessionStorage.selectedItem) {
                    vm.callAPI($sessionStorage.selectedItem, pageno);
                }
            }
        }

        vm.callAPI = function (item, pageno) {
            $http({
                url: "api/systemConstant/implementation",
                method: "POST",
                data: item,
                headers: {
                    'oslc-page-number': pageno
                }
            }).then(function (response) {
                if (response.data) {
                    vm.SystemConstants.count += response.data.length;
                    //append reponse to data
                    vm.SystemConstants.data = vm.SystemConstants.data.concat(response.data);
                }
            });

        }



        vm.toggleLimitOptions = function () {
            vm.limitOptions = vm.limitOptions ? undefined : [50, 100, 150];
        };



        vm.logPagination = function (page, limit) {

            var totalItem = page * limit;

            if (totalItem >= vm.SystemConstants.count) {
                vm.oslcPageNo++;
                vm.getSystemConstantImplementation(vm.oslcPageNo);
            }


            $log.info('page: ', page);
            $log.info('limit: ', limit);
        };


    }

})();
