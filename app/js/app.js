/**
 * Created by Administrator on 2016/12/18.
 */
var blog = angular.module('blog',
    [ 'ngRoute','ngAnimate','indexControllers','detailControllers']);


blog
    .config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $httpProvider.defaults.transformRequest = [ function(data) {

            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name;
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1)
                    : query;
            };

            return angular.isObject(data)
            && String(data) !== '[object File]' ? param(data)
                : data;
        } ];
    }]);

blog.run(["$location","$rootScope",function($location,$rootScope){

    $rootScope.go = function ( path ) {
        $location.path( path );
    };
}]);
module.exports = blog;