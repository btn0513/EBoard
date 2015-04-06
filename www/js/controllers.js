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
})

    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var site = new google.maps.LatLng(55.9879314,-4.3042387);
        var hospital = new google.maps.LatLng(55.8934378,-4.2201905);
      
        var mapOptions = {
          streetViewControl:true,
          center: site,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: site,
          map: map,
          title: 'Strathblane (Job Location)'
        });
        
        var hospitalRoute = new google.maps.Marker({
          position: hospital,
          map: map,
          title: 'Hospital (Stobhill)'
        });
        
        var infowindow = new google.maps.InfoWindow({
             content:"Project Location"
        });

        infowindow.open(map,marker);
        
        var hospitalwindow = new google.maps.InfoWindow({
             content:"Nearest Hospital"
        });

        hospitalwindow.open(map,hospitalRoute);
       
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
        
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin : site,
            destination : hospital,
            travelMode : google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay.setMap(map); 
       
      }
  
      google.maps.event.addDomListener(window, 'load', initialize);
    
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    })



.controller('ItemCtrl', function($scope, $ionicActionSheet, $timeout) {

 
    $scope.Art = 
            [{"title":"The Anita B Gorman Discovery & Conservation Center",
                "gps":"",
                "spots":[
                  {"id":1,
                    "img":"",
                    "gps":"",
                    "hint":"",
                    "descrip":""},
                  {"id":2,
                    "img":"",
                    "gps":"",
                    "hint":"",
                    "descrip":""},
                  {"id":3,
                    "img":"",
                    "gps":"",
                    "hint":"",
                    "descrip":""
            }]},
            {"title":"Plug Projects",
                "gps":"",
                "spots":
                    [{"id":1,
                    "img":"",
                    "gps":"",
                    "hint":"",
                    "descrip":""
            }]},
            {"title":"Union Station & Science City",
                "gps":"",
                "spots":
                    [{"id":1,
                    "img":"",
                    "gps":"",
                    "hint":"",
                    "descrip":""
            }]},
            {"title":"The Mid-America Arts Alliance",
                "gps":"",
                "spots":
                    [{"id":1,
                    "img":"",
                    "gps":"",
                    "hint":"",
                    "descrip":""
            }]}];
})

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})


;


