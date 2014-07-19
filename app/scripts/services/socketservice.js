'use strict';
angular.module('jbehaveWebApp').factory('SocketService', ['$q', '$rootScope', function($q, $rootScope) {
	    // We return this object to anything injecting our service
    var SocketService = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    var socket = new WebSocket('ws://localhost:8080/api/statusws');

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
      var request = "subscribe: "+reportId;

      sendRequest(request);
    };

    return SocketService;
}]);
