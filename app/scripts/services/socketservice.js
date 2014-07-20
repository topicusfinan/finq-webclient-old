'use strict';
angular.module('jbehaveWebApp').factory('SocketService', [ 'environmentFactory', function(environmentFactory) {
	    // We return this object to anything injecting our service
    var SocketService = {};
    // Create our websocket object with the address to the websocket
    var socket = new WebSocket(environmentFactory.getWebsocketUrl()+'/api/statusws');

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
      var messageObj = data;
      console.log('Received data from websocket: ', messageObj);
    }

    SocketService.subscribeToReport = function(reportId) {
      var request = 'subscribe: '+reportId;

      sendRequest(request);
    };

    return SocketService;
}]);
