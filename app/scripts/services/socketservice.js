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
      var defer = $q.defer();
      var callbackId = getCallbackId();
      callbacks[callbackId] = {
        time: new Date(),
        cb:defer
      };
      request.callbackIdentification = callbackId;
      console.log('Sending request', request);
      socket.send(JSON.stringify(request));
      return defer.promise;
    }

    function listener(data) {
      var messageObj = data;
      console.log('Received data from websocket: ', messageObj);
      // If an object exists with callbackIdentification in our callbacks object, resolve it
      if(callbacks.hasOwnProperty(messageObj.callbackIdentification)) {
        console.log(callbacks[messageObj.callbackIdentification]);
        $rootScope.$apply(callbacks[messageObj.callbackIdentification].cb.resolve(messageObj.data));
        delete callbacks[messageObj.callbackID];
      }
    }
    // This creates a new callback ID for a request
    function getCallbackId() {
      currentCallbackId += 1;
      if(currentCallbackId > 10000) {
        currentCallbackId = 0;
      }
      return currentCallbackId;
    }

    SocketService.subscribeToReport = function(reportId) {
      var request = {
        subscribe: + reportId
      };

      var promise = sendRequest(request);
      return promise;
    };

    return SocketService;
}]);
