angular.module('starter.pagesCtrl', ['ionic'])

.controller('ColonyCtrl', function($scope, $state, $window, $stateParams,$ionicModal, colony, user) {
    
    $scope.keycode = "";
    $scope.foundMsg = "";
    $scope.availToday = false;
    function successful(data, status, headers, config) {
        if(data.status == 1){
            if(data.col == $stateParams.cid){
                $scope.foundMsg = "found it";
                $state.go("location", {lid:$stateParams.lid}, {reload:true});
                $window.location.reload();
            }else{
                var locid = 0;
                if(data.col<=4)locid = 1;
                if(data.col==5)locid = 2;
                if(data.col==6)locid = 3;
                else locid = 2;
                $scope.foundMsg = "you found a different colony, "+data.col;
                $state.go("location", {lid:locid}, {reload:true});
                $window.location.reload();
            }
        }else if(data.status == 0){
            $scope.foundMsg = "youve already found that colony.";
        }else{
            $scope.foundMsg = "please enter a valid code";
        }
    }
    $scope.discover = function(code) {
        user.discover(window.localStorage['username'],code).success(successful).
          error(function(data, status, headers, config) {
        console.log(data);
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

    var dateAvail = Date.parse($scope.loc.avail);
    var todaysDate = Date.now();

    if(dateAvail > todaysDate)
        angular.element( document.querySelector( '#notAvail' ) ).removeClass('hidden');
    else
        angular.element( document.querySelector( '#Avail' ) ).removeClass('hidden');
            
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
        //check if its a good email address
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(!re.test(uid)){
            $scope.signupMsg = "please enter a valid email address";
        }else{
            user.signup(uid).success(successful).
              error(function(data, status, headers, config) {
                $scope.signupMsg = "cant connect";
              });
        }
    }
    var name = window.localStorage['username'] || 'you';
    $scope.yep = 'Hello, ' + name;
})

