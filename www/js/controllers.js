angular.module('starter.controllers', ['ionic'])

.controller('QRCtrl', function($scope, $ionicActionSheet, $timeout) {

    // Triggered on a button click, or some other target
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<b>Take Photo</b>' }
        ],
        titleText: 'Get QR Code',
        cancelText: 'Cancel',
        cancel: function() {
             
           },
        buttonClicked: function(index) {
          return true;
        }
      });

     
      $timeout(function() {
        hideSheet();
      }, 10000);

    };
});

