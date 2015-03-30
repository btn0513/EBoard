angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.Title = "Messaging";
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.Title = $stateParams.chatId;
})
        
        .controller('MainCtrl', ['$scope', function($scope) {
  
 
  
}])

;