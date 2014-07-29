'use strict';
angular.module('jbehaveWebApp').factory('SocketService', [ 'environmentFactory', '$rootScope', function(environmentFactory, $rootScope) {
	    // We return this object to anything injecting our service
    var SocketService = {};
    // Create our websocket object with the address to the websocket
    var socket = new WebSocket(environmentFactory.getWebsocketUrl()+'/api/statusws');

    var statusData;

    socket.onopen = function(){
        console.log('Socket has been opened!');
    };

    socket.onmessage = function(message) {
        listener(JSON.parse(message.data));
    };

    function sendRequest(request) {
      socket.send(request);
    }

    function listener(data) {
      console.log('Received data from websocket: ', data);
      statusData = data;
      $rootScope.$emit('statusChangeEvent');
    }

    SocketService.subscribeToReport = function(reportId) {
      var request = 'subscribe: '+reportId;

      sendRequest(request);
    };

    SocketService.getStatus = function() {
      return statusData;
    };

    return SocketService;
}]);
