(function () {
    'use strict';

    angular.module('sdomWebClientApp')
        .factory('StringManipulation', StringManipulation);

    function StringManipulation() {
        var service = {
            extractFilenameFromHeader: extractFilenameFromHeader
        }

        return service;

        function extractFilenameFromHeader(str) {
            if (str) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(str);
                if (matches != null && matches[1]) {
                   return matches[1].replace(/['"]/g, '');
                }
            }
            return null;
        }
    }
})();
