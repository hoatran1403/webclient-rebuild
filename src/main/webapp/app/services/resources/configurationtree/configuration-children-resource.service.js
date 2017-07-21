(function () {
    'use strict';

    angular.module('sdomWebClientApp')
        .factory('ConfigurationChildrenResource', ConfigurationChildrenResource);

    ConfigurationChildrenResource.$inject = ['$resource'];

    function ConfigurationChildrenResource($resource) {

        var service = $resource("api/getConfigurationChildren", {}, {
            'save': { method: 'POST', isArray: true }
        });
        return service;

    };

})();
