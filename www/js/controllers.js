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

.controller('BrowseCtrl', function($scope) {
  

})

.controller('featuredCtrl', function($scope, Posts) {
  $scope.posts = null;

    var handleSuccess = function(data, status) {
        $scope.posts = data;
        console.log("heres the posts");
        console.log(data);
    };
    var handleError = function(data, status) {
        console.log("error with post get");
        console.log(data);
    };

    Posts.getPosts().success(handleSuccess).error(handleError);
})

.controller('PostDetailCtrl', function($scope, $stateParams, Posts) {
    //$scope.post = Posts.get($stateParams.postId);
    
   /* $scope.post = [];

    var handleSuccess = function(data, status) {
       
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === parseInt($stateParams.postId)) {
             $scope.post = data[i];
          }
        }
        console.log(data[0]);
    };
    var handleError = function(data, status) {
        $scope.posterr = data;
        console.log("error with post get")
        console.log($scope.posterr);
    };

    Posts.getPosts().success(handleSuccess).error(handleError);*/
  
})

;
