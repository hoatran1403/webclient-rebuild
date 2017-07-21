(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
