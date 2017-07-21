(function() {
    'use strict';

    angular
        .module('sdomWebClientApp', [            
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngAnimate',
            'ngCacheBuster',
            'ui.bootstrap',
            // 'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            'ngMaterial',
            'md.data.table',
            'ngFileSaver',
            'ngStorage'
        ])
        .run(run);

    run.$inject = ['stateHandler', '$rootScope','$mdToast', '$log'];

    function run(stateHandler, $rootScope, $mdToast, $log) {
        stateHandler.initialize();
        //display toast when http error
        $rootScope.$on('sdomWebClientApp.httpError', function(event, error){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(error.data.description || error.data.message || error.data.AuthenticationException)
                    .position('top right')
                    .hideDelay(3000)
            );
        });
    }
})();
