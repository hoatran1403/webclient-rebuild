
(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('DownloadController',
        DownloadController);
    DownloadController.$inject = ['DownloadService', '$scope', 'configurationTreeData', '$http'];
    function DownloadController(DownloadService, $scope, configurationTreeData, $http) {
        var vm = this;

        vm.close = close;
        vm.download = download;
        vm.selectedItem = configurationTreeData.selectedList[0];
        vm.directoryRulesResList = [];
        vm.dirrule = {};
        vm.keywords = false;
        vm.errorMessage = '';

        var dirrulesObj = {
            'bereich': 'SDOM',
            'clazz': vm.selectedItem.clazz
        }

        getDirectoryRules();

        function getDirectoryRules() {
            var temp = angular.toJson(dirrulesObj);

            $http({
                url: "api/getDirrules",
                method: "POST",
                data: temp
            }).then(function (response) {
                vm.directoryRulesResList = response.data;
            });
        }

        function close() {
            DownloadService.hide();
        }

        function download() {

                //validate input value
                if (angular.isUndefined(vm.dirrule.dirRuleVersion)) {
                    vm.errorMessage = 'Invalid Download Options';
                    
                } else if(angular.isDefined(vm.selectedItem)){
                    var downloadDTO = {
                        'fullname': vm.selectedItem.fullname,
                        'clazz': vm.selectedItem.clazz,
                        'dirRuleVersion': vm.dirrule.dirRuleVersion,
                        'editions': true,
                        'keywords': vm.keywords
                    };

                    DownloadService.download(downloadDTO);
                    close();
                }


            }

        }

    

})();
