angular.module('starter.controllers', [])

.controller('MainCtrl', ['$scope', function($scope) {}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('BrowseCtrl', function($scope, Posts) {
  $scope.posts = Posts.all(); 
})

.controller('PostDetailCtrl', function($scope, $stateParams, Posts) {
  $scope.post = Posts.get($stateParams.postId);
})

;
