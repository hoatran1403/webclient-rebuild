
(function () {
    'use strict';

    angular.module('sdomWebClientApp').controller('CompareController',
        CompareController);
    CompareController.$inject = ['CompareService', '$scope', '$state'];
    function CompareController(CompareService, $scope, $state) {
        var vm = this;

        vm.selectedItem = $state.params.selectedItem;
        vm.hide = hide;

        function hide() {
            CompareService.hide();
        }

    }

})();
