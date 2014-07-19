'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http','endPoint', 'SocketService',
  function StoryCtrl($scope, $http, endPoint, SocketService) {

    $scope.bundles = [];
    $scope.stories = [];
    $scope.selectedIndex = null;
    $scope.isDone = '';
    $scope.scenarioFilter = [];

    $scope.loadBundles = function(){
      $http({
        method: 'GET',
        url: endPoint+'/api/bundles'
      }).
      success(function(data) {
        $scope.bundles = data;
        $scope.setActiveBundle(0);
      });
    };

    $scope.setFilter = function($name, $index) {
      $scope.isDone = 'done';
      $scope.scenarioFilter = $name;
      $scope.selectedIndex = $index;
    };

    $scope.setActiveBundle = function(bundleId){
      $scope.stories = $scope.bundles[bundleId].stories;
    };

    $scope.runStory = function($storyid){

      $http({
        method: 'POST',
        url: endPoint+'/api/runner/story',
        data: $storyid
      }).
      success(function(data){
        subscribeToReport(data.id);
      });
    };

    function subscribeToReport(reportId){
      console.log('Subscribing to report ' + reportId);
      SocketService.subscribeToReport(reportId);
    }
  }
]);
