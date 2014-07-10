'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http', 'filterFilter',
  function StoryCtrl($scope, $http) {
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
        url: 'http://192.168.42.65:8080/api/runner/story',
        data: $storyid
      }).
      success(function(data){
        $scope.getStoryResponse(data, $storyid);
      });
    };

    $scope.getStoryResponse = function($id, $storyid){
      $http({
        method: 'GET',
        url: 'http://192.168.42.65:8080/api/status/'+$id,
      }).
      success(function(data){
        for(var i =0; i<$scope.stories.length; i++){
          if($scope.stories[i].id === $storyid){
            $scope.stories[i].status = data.status; 
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
