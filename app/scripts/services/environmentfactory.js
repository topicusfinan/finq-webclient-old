'use strict';

angular.module('jbehaveWebApp').factory('environmentFactory', ['endPoint', function (endPoint) {

    var webSocketUrl = 'ws://'+endPoint;
    var httpUrl = 'http://'+endPoint;

    return {
      getWebsocketUrl: function(){
        return webSocketUrl;
      },
      getHttpUrl: function(){
        return httpUrl;
      }
    };
  }]);
