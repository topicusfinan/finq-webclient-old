'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http', 'filterFilter',
  function StoryCtrl($scope, $http) {
    $scope.stories = [];

    $scope.loadStories = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/api/stories'
      }).
      success(function(data) {
        $scope.stories = data;
      });
    };

    $scope.runStory = function($storyid){
      console.log('this will run story  '+$storyid)
      $http({
        method: 'POST',
        url: "http://localhost:8080/api/runner/story",
        data: $storyid
      }).
      success(function(data){
        console.log('status id = ' +data)
      });
    }
  }
]);
