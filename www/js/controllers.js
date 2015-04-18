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

.controller('MapCtrl', ['$scope','$ionicPlatform', '$location',
	function($scope, $ionicPlatform, $location) {

	// init gps array
    $scope.whoiswhere = [];
    $scope.basel = { lat: 47.55633987116614, lon: 7.576619513223015 };


    // check login code
	$ionicPlatform.ready(function() {
            navigator.geolocation.getCurrentPosition(function(position) {
		    $scope.position=position;
	        var c = position.coords;
	        $scope.gotoLocation(c.latitude, c.longitude);
		    $scope.$apply();
		    },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });
	    $scope.gotoLocation = function (lat, lon) {
	        if ($scope.lat != lat || $scope.lon != lon) {
	            $scope.basel = { lat: lat, lon: lon };
	            if (!$scope.$$phase) $scope.$apply("basel");
				}
			};

		    // some points of interest to show on the map
		    // to be user as markers, objects should have "lat", "lon", and "name" properties
		    $scope.whoiswhere = [
		        { "name": "My Marker", "lat": $scope.basel.lat, "lon": $scope.basel.lon },
				];

			});

}])
.filter('lat', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
})
.filter('lon', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? "E" : "W";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
})
.directive("appMap", function ($window) {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            width: "@",         // Map width in pixels.
            height: "@",        // Map height in pixels.
            zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
            panControl: "@",    // Whether to show a pan control on the map.
            zoomControl: "@",   // Whether to show a zoom control on the map.
            scaleControl: "@"   // Whether to show scale control on the map.
        },
        link: function (scope, element, attrs) {
            var toResize, toCenter;
            var map;
            var infowindow;
            var currentMarkers;
            var callbackName = 'InitMapCb';

            scope.markers = [
                {"lat":"39.040677","lon":"-94.574427","name":"Anita B Gorman Discovery & Conservation Center"},
                {"lat":"39.094057","lon":"-94.604697","name":"Plug Projects"},
                {"lat":"39.085255","lon":"-94.586066","name":"Union Station & Science City"},
                {"lat":"39.088249","lon":"-94.585216","name":"Mid-America Arts Alliance"},
            ];
            // callback when google maps is loaded
            $window[callbackName] = function() {
                console.log("map: init callback");
                createMap();
                updateMarkers();
            };

            if (!$window.google || !$window.google.maps ) {
                console.log("map: not available - load now gmap js");
                loadGMaps();
            }else{
                console.log("map: IS available - create only map now");
                createMap();
            }
            function loadGMaps() {
                console.log("map: start loading js gmaps");
                var script = $window.document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb';
                $window.document.body.appendChild(script);
            }

            function createMap() {
                console.log("map: create map start");
                var mapOptions = {
                    zoom: 12,
                    center: new google.maps.LatLng(39.066814,-94.583535),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    navigationControl: true,
                    disableDefaultUI: true,
                    overviewMapControl: true
                };
                if (!(map instanceof google.maps.Map)) {
                    console.log("map: create map now as not already available ");
                    map = new google.maps.Map(element[0], mapOptions);
                    // EDIT Added this and it works on android now
                    // Stop the side bar from dragging when mousedown/tapdown on the map
                    google.maps.event.addDomListener(element[0], 'mousedown', function(e) {
                        e.preventDefault();
                        return false;
                    });
                    infowindow = new google.maps.InfoWindow(); 
                }
            }

            scope.$watch('markers', function() {
                updateMarkers();
            });

            // Info window trigger function 
            function onItemClick(pin, label, datum, url) { 
                // Create content  
                var contentString = "Name: " + label;
                // Replace our Info Window's content and position
                infowindow.setContent(contentString);
                infowindow.setPosition(pin.position);
                infowindow.open(map)
                google.maps.event.addListener(infowindow, 'closeclick', function() {
                    //console.log("map: info windows close listener triggered ");
                    infowindow.close();
                });
            } 

            function markerCb(marker, member, location) {
                return function() {
                    //console.log("map: marker listener for " + member.name);
                    var href="http://maps.apple.com/?q="+member.lat+","+member.lon;
                    map.setCenter(location);
                    onItemClick(marker, member.name, member.date, href);
                };
            }
            // update map markers to match scope marker collection
            function updateMarkers() {
                if (map && scope.markers) {
                    // create new markers
                    //console.log("map: make markers ");
                    currentMarkers = [];
                    var markers = scope.markers;
                    console.log(scope.markers);
                    if (angular.isString(markers)) markers = scope.$eval(scope.markers);
                    for (var i = 0; i < markers.length; i++) {
                        var m = markers[i];
                        var loc = new google.maps.LatLng(m.lat, m.lon);
                        var mm = new google.maps.Marker({ position: loc, map: map, title: m.name });
                        //console.log("map: make marker for " + m.name);
                        google.maps.event.addListener(mm, 'click', markerCb(mm, m, loc));
                        currentMarkers.push(mm);
                    }
                }
            }
        } // end of link:
    }; // end of return
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


