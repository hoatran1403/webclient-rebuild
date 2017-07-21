
(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('ConfigurationTreeController',
        ConfigurationTreeController);
    ConfigurationTreeController.$inject = ['CompareService', 'DownloadService', 'SearchService', 'InfoBlockService', 'configurationTreeData', '$rootScope', '$state', '$scope'];
    function ConfigurationTreeController(CompareService, DownloadService, SearchService, InfoBlockService, configurationTreeData, $rootScope, $state, $scope) {
        var vm = this;

        vm.openSearch = openSearch;
        vm.openDownload = openDownload;
        vm.openCompare = openCompare;
        vm.openInfoBlock = openInfoBlock;
        vm.goImplementationEditor = goImplementationEditor;
        vm.$state = $state;
        vm.openSidebar = openSidebar;
        vm.selectedMode = 'md-fling';
        vm.selectedList = configurationTreeData.selectedList;
        vm.isDownloading = false;

        $scope.$on('configurationtree.downloading', function(){
            vm.isDownloading = true;
        });

        $scope.$on('configurationtree.downloaded', function(){
            vm.isDownloading = false;
        });

        function openSidebar() {
            $rootScope.$broadcast('openSidebar');
        }

        function openSearch(ev) {
            SearchService.open(ev);
        }

        function openDownload(ev) {
            DownloadService.open(ev);
        }

        function openCompare(ev) {
            CompareService.open(ev);
        }

        function goImplementationEditor() {
            if (vm.selectedList[0]) {
                $state.go('implementationEditor', { selectedItem: vm.selectedList[0] });
            }
        }

        function openInfoBlock(ev) {
            InfoBlockService.open(ev);
        }

    }

})();
