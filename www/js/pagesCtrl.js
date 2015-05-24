angular.module('starter.pagesCtrl', ['ionic'])

.controller('LichenCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, colony, lichen) {
    
    $scope.colony = colony.get($stateParams.cid); //lichen in this colony
    $scope.lichens = lichen.get(); //all lichen
    $scope.lichenList = [];
    
    //add to undiscovered and discovered list
    for(i=0;i<$scope.colony.lichen.length;i++){
        for(j=0;j<$scope.lichens.length;j++){
            if(($scope.lichens[j]).id == $scope.colony.lichen[i])
                $scope.lichenList.push($scope.lichens[j]);
        }
    }
    
    $scope.slideChanged = function($index){
        $scope.name = $scope.lichenList[$index].name;
        $scope.descrip = $scope.lichenList[$index].descrip;
    }
    
    $ionicSlideBoxDelegate.update();
    $scope.slideChanged(0);
    //$ionicSlideBoxDelegate.$getByHandle('lichenslide').update();
})

.controller('ColonyCtrl', function($scope, $state, $ionicHistory, $stateParams, $ionicModal, colony, user) {
    
    $scope.keycode = "";
    $scope.found = false;
    $scope.foundMsg = "";
    $scope.availToday = false;
    
    var locid = 0;
    var colid = 0;
    
    function successful(data, status, headers, config) {
        if(data.status == 1){
            $scope.found = true;
            
            if(data.col == $stateParams.cid){
                $scope.foundMsg = "found it";
            }else{
                $scope.foundMsg = "you found a different colony, "+data.col;
            }
            
            if(data.col<=4)locid = 1;
            else if(data.col==5)locid = 2;
            else if(data.col==6)locid = 3;
            else locid = 4;
            colid = data.col;
            
        }else if(data.status == 0){
            $scope.foundMsg = "you've already found that colony.";
        }else{
            $scope.foundMsg = "please enter a valid code";
        }
        $scope.openModal();
    }
    
    $scope.discover = function(code) {
        user.discover(window.localStorage['username'],code).success(successful).
          error(function(data, status, headers, config) {
        console.log(data);
                console.log("ouch");
          });
    }
    $scope.goto = function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.reload();
            $state.go("colony.known", {lid:locid,cid:colid});
    }
    $ionicModal.fromTemplateUrl('pages/fragment/colonyStatus.html', {
      scope: $scope,
      animation: 'fade-in'
    }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function() {
      $scope.keycode = "";
        if($scope.found)
            $scope.goto();
    });
})

.controller('ColonyPageCtrl', function($scope, $state, $stateParams, colony) {
    
    $scope.lid = $stateParams.lid;
    $scope.cid = $stateParams.cid;
    $scope.colony = colony.get($stateParams.cid);
    
    
    if($state.is("colony.known"))
        $scope.title = $scope.colony.name;
    else $scope.title = "Colony " + $scope.colony.id;
})

.controller('LocCtrl', function($scope, $stateParams, location, colony, user) {
    $scope.loc = location.get($stateParams.lid);
    colonyList = location.get($stateParams.lid).colonies;
    $scope.discovered = [];
    $scope.undiscovered = [];
    discoveredList = [];

    var dateAvail = Date.parse($scope.loc.avail);
    var todaysDate = Date.now();
    if(window.localStorage['username']=="reggie.a.roby@gmail.com" ||
        window.localStorage['username']=="sarahwilliamshearn@gmail.com" || dateAvail < todaysDate)
        angular.element( document.querySelector( '#Avail' ) ).removeClass('hidden');
    else
        angular.element( document.querySelector( '#notAvail' ) ).removeClass('hidden');
            
    user.colonies(window.localStorage['username']).success(successful).
          error(function(data, status, headers, config) {
                console.log("ouch");
          });
    function successful(data, status, headers, config) {
        if(data.status){
            discoveredList = data.discovered;
            //add to undiscovered and discovered list
            for(i=0;i<colonyList.length;i++){
                if(discoveredList.indexOf(colonyList[i]) != -1)
                    $scope.discovered.push(colony.get(colonyList[i]));
                else
                    $scope.undiscovered.push(colony.get(colonyList[i]));
            }
        }else{
            console.log("not so much");
        }
    }
})

.controller('LocsCtrl', function($scope, $state, location) {
    
    $scope.locations = location.get();
    
    $scope.dontSwitch = function($event){
     $event.stopPropagation();
    }
    $scope.goto = function(locid){
        $state.go("location", {lid:locid});
    }
})

.controller('loginCtrl', function($scope, $state, $ionicLoading, $ionicModal, user) {
    $scope.username = "";
    if(window.localStorage['username'])
        $scope.username = window.localStorage['username'];
    
    function successful(data, status, headers, config) {
        $ionicLoading.hide();
        if(data.status){
            window.localStorage['username'] = data.user;
            $state.go('locations');
        }else{
            $scope.loginMsg = 'Invalid email. '+
                    'if not already a user please signup';
            $scope.openModal();
        }
    }
    $scope.loginbtn = function(uid) {
        showLoad();
        $scope.loginMsg = "";
        user.login(uid).success(successful).
          error(function(data, status, headers, config) {
                $scope.loginMsg = "cant connect";
                $ionicLoading.hide();
                $scope.openModal();
          });
    }
    function showLoad(){
        $ionicLoading.show({
	    noBackdrop: 0,
	    delay: 0
        });
    }
    
    $ionicModal.fromTemplateUrl('pages/fragment/loginStatus.html', {
      scope: $scope,
      animation: 'fade-in'
    }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function() {
    });
})

.controller('signupCtrl', function($scope, $state, $ionicLoading, $ionicModal, user) {
    $scope.username = "";
    $scope.loginMsg = "";
    if(window.localStorage['username'])
        $scope.username = window.localStorage['username'];
    
    function successful(data, status, headers, config) {
        $ionicLoading.hide();
        if(data.status){
            window.localStorage['username'] = data.user;
            $state.go('locations');
        }else{
            $scope.loginMsg = "username already in use";
            $scope.openModal();
        }
    }
    $scope.register = function(uid) {
        //check if its a good email address
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(!re.test(uid)){
            $scope.loginMsg = "please enter a valid email address";
        }else{
            showLoad();
            user.signup(uid).success(successful).
              error(function(data, status, headers, config) {
                $scope.loginMsg = "cant connect";
                $ionicLoading.hide();
                $scope.openModal();
              });
        }
    }
    
    function showLoad(){
        $ionicLoading.show({
	    noBackdrop: 0,
	    delay: 0
        });
    }
    
    $ionicModal.fromTemplateUrl('pages/fragment/loginStatus.html', {
      scope: $scope,
      animation: 'fade-in'
    }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function() {
    });
})

