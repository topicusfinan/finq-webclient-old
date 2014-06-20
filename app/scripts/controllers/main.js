'use strict';
angular.module('jbehaveWebApp').controller('StoryCtrl', ['$scope', '$http', 'filterFilter',
  function StoryCtrl($scope, $http) {
    $scope.stories = [];
    $scope.checkedStories = [];

    $scope.loadStories = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/api/stories'
      }).
      success(function(data) {
        console.log(data);
        var storiesResult = data;
        $scope.stories = data;
      });
    };
  }
]);
