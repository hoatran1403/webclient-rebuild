(function() {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('notificationInterceptor', notificationInterceptor);

    notificationInterceptor.$inject = ['$q'];

    function notificationInterceptor ($q) {
        var service = {
            response: response
        };

        return service;

        function response (response) {
            var alertKey = response.headers('X-sdomWebClientApp-alert');
            if (angular.isString(alertKey)) {
                // AlertService.success(alertKey, { param : response.headers('X-sdomWebClientApp-params')});
            }
            return response;
        }
    }
})();
