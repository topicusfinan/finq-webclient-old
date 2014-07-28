'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$rootScope', '$scope', '$http', 'environmentFactory', 'SocketService',
  function StoryCtrl($rootScope, $scope, $http, environmentFactory, SocketService) {

    $scope.bundles = [];
    $scope.stories = [];
    $scope.selectedIndex = null;
    $scope.isDone = '';
    $scope.scenarioFilter = [];
    $scope.storyStatus = '';
    // $scope.scenarioStatus = '';
    // $scope.stepStatus = '';

    $scope.loadBundles = function(){
      $http({
        method: 'GET',
        url: environmentFactory.getHttpUrl()+'/api/bundles'
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
        url: environmentFactory.getHttpUrl()+'/api/runner/story',
        data: $storyid
      }).
      success(function(data){
        subscribeToReport(data.id);
      });
    };

    function subscribeToReport(reportId){
      SocketService.subscribeToReport(reportId);
    }

    $rootScope.$on('statusChangeEvent', function updateStatus(){
      $scope.$apply(function(){
        var statusData = SocketService.getStatus();
        $scope.storyStatus = statusData.log.status;
      });
    });
  }
]);
