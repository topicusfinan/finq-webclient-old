'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http', 'filterFilter',
  function StoryCtrl($scope, $http) {
    $scope.bundles = [];
    $scope.stories = [];
    $scope.scenarios = [];

    $scope.selectedBundleIndex = null;
    $scope.selectedStoryIndex = null;

    $scope.stepWord = 'Given';

    $scope.alerts = [];

    $scope.storyFilter = [];
    $scope.scenarioFilter = [];

      $http({
        method: 'GET',
        url: 'http://jenkins-slave1:8080/api/bundles'
      }).
      success(function(data) {
        $scope.bundles = data;
        $scope.stories = data[0].stories;
      });


    $scope.setFilter = function($type,$name, $index) {
      if($type === 'bundle'){
        $scope.storyFilter = $name;
        $scope.selectedBundleIndex = $index;
      }
      else if($type === 'story'){
        $scope.scenarioFilter = $name;
        $scope.selectedStoryIndex = $index;
      }
    };

    $scope.getClass = function($status, $type) {
      var cssClass = $type;
      
      switch($status) {
        case 'FAILED':
          cssClass += '-danger';
          break;
        case 'SUCCESS':
          cssClass += '-success';
          break;
        default:
          cssClass += '-default';
      }
      return cssClass;  
    };

    $scope.loadScenarios = function($index) { 
      $scope.scenarios = $scope.stories[$index].scenarios;
    };

    $scope.runStory = function($storyid){

      $http({
        method: 'POST',
        url: 'http://jenkins-slave1:8080/api/runner/story',
        data: $storyid
      }).
      success(function(data){
        $scope.getStoryResponse(data, $storyid);
      });
    };

    $scope.getStoryResponse = function($statusid, $storyid){
      console.log($statusid);
      $http({
        method: 'GET',
        url: 'http://jenkins-slave1:8080/api/status/'+$statusid,
      }).
      success(function(data){
        for(var i =0; i<$scope.stories.length; i++){
          if($scope.stories[i].id === $storyid){
            $scope.stories[i].status = data.status;
            $scope.stories[i].statusId = $statusid;
            if(data.logs[0]) {
              $scope.stories[i].logs = data.logs[0];
            }
          }
        }
      });
    };
  }
]);

angular.module('jbehaveWebApp').filter('to_trusted', ['$scope', function($scope){
    return function(text) {
        return $scope.trustAsHtml(text);
    };
}]);
