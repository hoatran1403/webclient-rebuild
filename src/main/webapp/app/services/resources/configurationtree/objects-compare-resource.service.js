(function(){
    'use strict';

    angular.module('sdomWebClientApp')
        .factory('ObjectsCompareResource', ObjectsCompareResource);

        ObjectsCompareResource.$inject = ['$resource'];

        function ObjectsCompareResource($resource){
            return $resource('api/getObjectsComparison',{},{
                'save': { method: 'POST', isArray: true}
            });
        }
}


)();
