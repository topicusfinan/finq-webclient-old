 'use strict';
angular.module('jbehaveWebApp', ['ngRoute', 'mgcrea.ngStrap', 'ui.bootstrap','ui.utils']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'StoryCtrl'
  }).when('/build', {
    templateUrl: 'views/main.html',
    controller: 'StoryCtrl'
  }).when('/configure', {
    templateUrl: 'views/main.html',
    controller: 'StoryCtrl'
  }).otherwise({
    redirectTo: '/'
  });
});

angular.module('jbehaveWebApp').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
