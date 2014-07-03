'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http', 'filterFilter',
  function StoryCtrl($scope, $http) {
    $scope.stories = [];

    $scope.loadStories = function() {
      $http({
        method: 'GET',
        url: 'http://192.168.42.44:8080/api/stories'
      }).
      success(function(data) {
        $scope.stories = data;
      });
    };

    $scope.runStory = function($storyid){

      $http({
        method: 'POST',
        url: "http://192.168.42.44:8080/api/runner/story",
        data: $storyid
      }).
      success(function(data){
        $scope.getStoryResponse(data, $storyid);
      });
    }

    $scope.getStoryResponse = function($id, $storyid){
      $http({
        method: 'GET',
        url: "http://192.168.42.44:8080/api/status/"+$id,
      }).
      success(function(data){
        for(var i =0; i<$scope.stories.length; i++){
          if($scope.stories[i].id == $storyid){
            $scope.stories[i].status = data.status; 
          }
        }
      });
    };
  }
]);
