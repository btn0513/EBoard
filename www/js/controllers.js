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
    };
    var handleError = function(data, status) {
        console.log("error getting posts");
        console.log(data);
    };

    Posts.getPosts().success(handleSuccess).error(handleError);
})

.controller('PostDetailCtrl', function($scope, $stateParams, Posts) {
    $scope.post = null;

    var handleSuccess = function(data, status) {
        for (var i = 0; i < data.length; i++) {
             console.log(data[i].id);
          if (data[i].id === $stateParams.postId) {
             $scope.post = data[i];
          }
        }
    };
    var handleError = function(data, status) {
        console.log("error getting posts" );
        console.log(data);
    };

    Posts.getPosts().success(handleSuccess).error(handleError);

})
// Picture controller in the detail page
.controller('PicsCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/browse/image-popover.html', {
    scope: $scope,
    animation: 'fade-in'
  }).then(function(modal) {
      $scope.modal = modal;
  })

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    
  });
});

;