(function () {
    'use strict';

    angular
        .module('sdomWebClientApp')
        .factory('DownloadService', DownloadService);

    DownloadService.$inject = ['StringManipulation','$mdDialog', '$http', '$document', 'FileSaver', 'Blob', '$rootScope','$log'];

    function DownloadService(StringManipulation, $mdDialog, $http, $document, FileSaver, Blob,$rootScope, $log) {

        var service = {
            open: open,
            hide: hide,
            download: download
        };

        return service;

       

        function download(downloadObj) {
            var temp = angular.toJson(downloadObj);

            $rootScope.$broadcast('configurationtree.downloading');

            $http({
                url: "api/download",
                method: "POST",
                data: temp,
                timeout: 250000,
                headers: {
                    accept: 'application/octet-stream'
                },
                responseType: 'arraybuffer',
                cache: false,
                transformResponse: function (data, headers) {
                    var octet = null;

                    if (data) {
                        octet = new Blob([data], {
                            type: 'application/octet-stream' //or whatever you need, should match the 'accept headers' above
                        });
                    }

                    var fileName = StringManipulation.extractFilenameFromHeader(headers('content-disposition'));

                    var result = {
                        blob: octet,
                        fileName: fileName
                    };

                    return {
                        response: result
                    };
                }
            }).then(function (res) {
                var blob = res.data.response.blob;
                var fileName = res.data.response.fileName || "file.zip";
                FileSaver.saveAs(blob, fileName);
                $rootScope.$broadcast('configurationtree.downloaded');
            },function(error){
                $rootScope.$broadcast('configurationtree.downloaded');
                $log.error('[sdom-web-client]Configurationtree.download error: ' + error);
            });
        }


        function open(ev) {
            $mdDialog.show({
                controller: 'DownloadController',
                controllerAs: 'vm',
                templateUrl: 'app/configurationtree/configurationtree-download/download.tmpl.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }



        function hide() {
            $mdDialog.hide();
        }


    }
})();
