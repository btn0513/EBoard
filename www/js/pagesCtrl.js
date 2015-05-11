angular.module('starter.pagesCtrl', ['ionic'])

.controller('ColonyCtrl', function($scope, $stateParams,$ionicModal, colony, user) {
    
    $scope.keycode = "";
    function successful(data, status, headers, config) {
        if(data.status){
            
        }else{
            console.log("not so much");
        }
    }
    $scope.discover = function(code) {
        user.discover(window.localStorage['username'],code).success(successful).
          error(function(data, status, headers, config) {
                console.log("ouch");
          });
    }
    
    $scope.lid = $stateParams.lid;
    $scope.colony = colony.get($stateParams.cid);
    
})

.controller('LocCtrl', function($scope, $stateParams, location, colony, user) {
    $scope.loc = location.get($stateParams.lid);
    colonyList = location.get($stateParams.lid).colonies;
    $scope.discovered = [];
    $scope.undiscovered = [];
    discoveredList = [];
            
    user.colonies(window.localStorage['username']).success(successful).
          error(function(data, status, headers, config) {
                console.log("ouch");
          });
    function successful(data, status, headers, config) {
        if(data.status){
            discoveredList = data.discovered;
            //add to undiscovered and discovered list
            for(i=0;i<colonyList.length;i++){
                if(discoveredList.indexOf(colonyList[i]) == -1)
                    $scope.discovered.push(colony.get(colonyList[i]));
                else
                    $scope.undiscovered.push(colony.get(colonyList[i]));
            }
        }else{
            console.log("not so much");
        }
    }
})

.controller('LocsCtrl', function($scope, location) {
    
    $scope.locations = location.get();
})

.controller('loginCtrl', function($scope, $state, user) {
    $scope.username = "";
    if(window.localStorage['username'])
        $scope.username = window.localStorage['username'];
    
    function successful(data, status, headers, config) {
        if(data.status){
            window.localStorage['username'] = data.user;
            $state.go('locations');
        }else{
            $scope.loginMsg = 'Invalid email. '+
                    'if not already a user please signup';
        }
    }
    $scope.loginbtn = function(uid) {
        $scope.loginMsg = "";
        user.login(uid).success(successful).
          error(function(data, status, headers, config) {
                $scope.loginMsg = "cant connect";
          });
    }
})

.controller('signupCtrl', function($scope, $state, user) {
    $scope.username = "";
    $scope.signupMsg = "";
    if(window.localStorage['username'])
        $scope.username = window.localStorage['username'];
    
    function successful(data, status, headers, config) {
        if(data.status){
            window.localStorage['username'] = data.user;
            $state.go('locations');
        }else{
            $scope.signupMsg = "username already in use";
        }
    }
    $scope.register = function(uid) {
        user.signup(uid).success(successful).
          error(function(data, status, headers, config) {
            $scope.signupMsg = "cant connect";
          });
    }
    var name = window.localStorage['username'] || 'you';
    $scope.yep = 'Hello, ' + name;
})

