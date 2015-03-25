angular.module('eboard.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
 
    $scope.closeLogin = function() { 
     $state.go('tab.home'); 
	};
});