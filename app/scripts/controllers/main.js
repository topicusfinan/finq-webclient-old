'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http', 'filterFilter', 'SocketService',
  function StoryCtrl($scope, $http, filterFilter, SocketService) {
    $scope.bundles = [];
    $scope.stories = [];
    $scope.scenarios = [];

    $scope.selectedIndex = null;
    $scope.isDone = '';
    $scope.stepWord = 'Given';


    $scope.scenarioFilter = [];

      $http({
        method: 'GET',
        url: 'bundles-endpoint.json'
      }).
      success(function(data) {
        $scope.bundles = data;
        $scope.stories = data[0].stories;
      });


    $scope.setFilter = function($name, $index) {
      $scope.isDone = 'done';
      $scope.scenarioFilter = $name;
      $scope.selectedIndex = $index;
    };

    $scope.loadScenarios = function($index) {
      $scope.scenarios = $scope.stories[$index].scenarios;
    };

    $scope.runStory = function($storyid){

      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/runner/story',
        data: $storyid
      }).
      success(function(data){
        $scope.getReportIdForStory(data, $storyid);
      });
    };

    $scope.getStoryResponse = function($id, $storyid){
      $http({
        method: 'GET',
        url: 'http://localhost:8080/api/status/'+$id,
      }).
      success(function(data){
        for(var i =0; i<$scope.stories.length; i++){
          if($scope.stories[i].id === $storyid){
            $scope.stories[i].status = data.status;
          }
        }
      });
    };

    $scope.getReportIdForStory = function($id, $storyid){
      console.log('getting reportid for story: ' + $id + ' - ' + $storyid);

      // find the reportid to keep track of
    };

    $scope.subscribeToReport = function($reportId){
      console.log('subscribing to report ' + $reportId);
      SocketService.subscribeToReport($reportId);
    };
  }
]);

angular.module('jbehaveWebApp').filter('to_trusted', ['$scope', function($scope){
    return function(text) {
        return $scope.trustAsHtml(text);
    };
}]);
