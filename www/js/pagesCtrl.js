angular.module('starter.pagesCtrl', ['ionic', 'angularCharts'])

.controller('AdminCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate,
        location, colony, lichen) {
    
    $scope.locations = location.get();
    $scope.colonies = colony.get();
    $scope.lichens = lichen.get();
    $scope.selected = {"loc": $scope.locations[0],
                        "colo":$scope.colonies[0],
                        "lich":$scope.lichens[0]};
    $scope.Name = "";
    
    $scope.updateLoc = function(){
        location1 = $scope.selected.loc;
        location1.avail = new Date($scope.selected.loc.avail);
        $scope.location1 = location1;
        
        $scope.Name = "Location";
    }
    $scope.updateColo = function(){        
        colony1 = $scope.selected.colo;
        $scope.colony1 = colony1;
        
        $scope.Name = "Colony";
    }
    $scope.updateLich = function(){        
        lichen1 = $scope.selected.lich;
        //colony1.avail = new Date($scope.selected.loc.avail);
        $scope.lichen1 = lichen1;
        
        $scope.Name = "Lichen";
    }
    $scope.upload = function(){
        if($scope.Name == "Location")
            console.log($scope.selected.loc);
        if($scope.Name == "Colony")
            console.log($scope.selected.colo);
        if($scope.Name == "Lichen")
            console.log($scope.selected.lich);
    }
    
    $scope.randData = function(){
        for(i=0;i<4;i++){
            $scope.data1.data[i].y = [];
            for(j=0;j<5;j++){ 
                $scope.data1.data[i].y.push(Math.floor(Math.random()*100));
            }
        }
    }
    
    $scope.data1 = {
            series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
            data: [{
                    x: "Sales",
                    y: [100, 500, 0],
                    tooltip: "this is tooltip"
            }, {
                    x: "Not Sales",
                    y: [300, 100, 100]
            }, {
                    x: "Tax",
                    y: [351]
            }, {
                    x: "Not Tax",
                    y: [54, 0, 879]
            }]
    };

    $scope.chartType = 'bar';

    $scope.config1 = {
            tooltips: true,
            labels: false,
            title: "Products",
            legend: {
                    display: true,
                    position: 'left'
            },
            innerRadius: 30
    };
        
    $scope.randData();
})

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
        $scope.url = $scope.lichenList[$index].website;
        if(!$scope.lichenList[$index].name2){
            $scope.name2 = null;
            $scope.descrip2 = null;
            $scope.url = null;
        }else{
            $scope.name2 = $scope.lichenList[$index].name2;
            $scope.descrip2 = $scope.lichenList[$index].descrip2;
            $scope.url2 = $scope.lichenList[$index].website2;
        }
    }
    
    $ionicSlideBoxDelegate.update();
    $scope.slideChanged(0);
    //$ionicSlideBoxDelegate.$getByHandle('lichenslide').update();
})

.controller('ColonyCtrl', function($scope, $state, $ionicHistory, $stateParams, $ionicModal, colony, user) {
    
    $scope.keycode = "";
    $scope.found = "not";
    $scope.foundMsg = "";
    $scope.availToday = false;
    
    var locid = 0;
    var colid = 0;
    
    $scope.dontSwitch = function($event){
        $event.stopPropagation();
    }
    
    function successful(data, status, headers, config) {
        if(data.status == 1){
            if(data.col == $stateParams.cid){
                $scope.found = "this";
                $scope.foundMsg = "congratulations, you found it!";
            }else{
                $scope.found = "that";
                $scope.foundMsg = "Looks like you found colony "+data.col+" instead.";
            }
        }else if(data.status == 0){
            $scope.found = "that";
            $scope.foundMsg = "You've already found that colony.";
        }else{
            $scope.found = "not";
            $scope.foundMsg = "Please enter a valid code.";
        }
        if(data.col){
            if(data.col<=4)locid = 1;
            else if(data.col==5)locid = 2;
            else if(data.col==6)locid = 3;
            else locid = 4;
            colid = data.col;
        }
        console.log(data);
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
    $scope.reload = function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.reload();
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
    });
})

.controller('ColonyPageCtrl', function($scope, $stateParams, colony) {
    $scope.lid = $stateParams.lid;
    $scope.cid = $stateParams.cid;
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
    var un = window.localStorage['username'].toLowerCase();
    if(un=="reggie.a.roby@gmail.com" ||
        un=="sarahwilliamshearn@gmail.com" ||
        un=="art@maaa.org" ||
        un=="blhearn@gmail.com" || dateAvail < todaysDate)
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

.controller('LocsCtrl', function($scope, $state, $ionicModal, location) {
    
    $scope.locations = location.get();
    
    $scope.dontSwitch = function($event){
     $event.stopPropagation();
    }
    $scope.goto = function(locid){
        $state.go("location", {lid:locid});
    }
    
    $ionicModal.fromTemplateUrl('pages/fragment/locInfo.html', {
      scope: $scope,
      animation: 'fade-in'
    }).then(function(modal){
        $scope.modal = modal;
    });
    
    $scope.openModal = function(locid) {
      $scope.loc = $scope.locations[locid-1];
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
    });
})

.controller('loginCtrl', function($scope, $state, $ionicLoading, $ionicModal, user) {
    $scope.username = "";
    if(window.localStorage['username'])
        $scope.username = window.localStorage['username'];
    
    function logSuccess(data, status, headers, config) {
        $ionicLoading.hide();
        if(data.status){
            window.localStorage['username'] = data.user;
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.reload();
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
        user.login(uid).success(logSuccess).
          error(function(data, status, headers, config) {
                $scope.loginMsg = "cant connect";
                $ionicLoading.hide();
                $scope.openModal();
          });
    }
    function regSuccess(data, status, headers, config) {
        $ionicLoading.hide();
        if(data.status){
            window.localStorage['username'] = data.user;
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.reload();
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
            $scope.openModal();
        }else{
            showLoad();
            user.signup(uid).success(regSuccess).
              error(function(data, status, headers, config) {
                $scope.loginMsg = "cant connect";
                $ionicLoading.hide();
                $scope.openModal();
              });
        }
    }
    $scope.dontSwitch = function($event){
        $event.stopPropagation();
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
});

