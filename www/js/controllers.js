angular.module('starter.controllers', ['ionic'])

.service('user', function($http){
    this.colonies = function(uid) {
        
        return $http({
            url: "http://104.236.43.114/test/api.php", 
            method: "GET",
            params: {action: "colonies", user:uid}
         });
    };
    this.discover = function(uid,code) {
        
        return $http({
            url: "http://104.236.43.114/test/api.php", 
            method: "GET",
            params: {action: "discover", user:uid, code:code}
         });
    };
    this.login = function(uid) {
        
        return $http({
            url: "http://104.236.43.114/test/api.php", 
            method: "GET",
            params: {action: "login", user:uid}
         });
    };
    this.signup = function(uid) {
        
        return $http({
            url: "http://104.236.43.114/test/api.php", 
            method: "GET",
            params: {action: "signup", user:uid}
         });
    };
})
.service('location', function(){
    this.get = function(id) {
        var locations = [
            {"id":1,
                "name":"Union Station",
                "days":"Mon - Sun",
                "hours":"6am - Midnight",
                "address":"30 West Pershing Road, Kansas City, MO 64108",
                "url":"http://www.unionstation.org/",
                "website":"unionstation.org",
                "img":"unionstation.jpg",
                "colonies":[1,2,3]
            },
            {"id":2,
                "name":"Plug Projects",
                "days":"Saturday",
                "hours":"10am - 5pm",
                "address":"1613 Genessee St. Kansas City, MO 64102",
                "url":"http://www.plugprojects.com/",
                "website":"plugprojects.com",
                "img":"plugprojects.jpg",
                "colonies":[1,4]
            },
            {"id":3,
                "name":"Anita B. Gorman",
                "days":"Mon - Fri",
                "hours":"8am - 5pm",
                "address":"4750 Troost Ave. Kansas City, MO 64110",
                "url":"http://mdc.mo.gov/regions/kansas-city/discovery-center",
                "website":"mdc.mo.gov/...",
                "img":"anitab.jpeg",
                "colonies":[5]
            },
            {"id":4,
                "name":"Mid-America Arts Alliance",
                "days":"Mon - Fri",
                "hours":"8am - 5pm",
                "address":"2018 Baltimore Ave. Kansas City, MO64108",
                "url":"http://maaa.org/",
                "website":"maaa.org",
                "img":"maaa.jpg",
                "colonies":[2,4,5,6]}
        ];
        if(id!=undefined)
            return locations[id-1];
        return locations;
    };
})

.service('lichen', function(){
     
    this.get = function(id) {
        var lichen = [
            {"id":1,
                "name":"lichen 1",
                "descrip":"blah blah something",
                "img":"lichen1"
            },
            {"id":2,
                "name":"lichen 2",
                "descrip":"blah blah something",
                "img":"lichen2"
            },
            {"id":3,
                "name":"lichen 3",
                "descrip":"blah blah something",
                "img":"lichen3"
            },
            {"id":4,
                "name":"lichen 4",
                "descrip":"blah blah something",
                "img":"lichen4"
            },
            {"id":5,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5"
            },
            {"id":6,
                "name":"lichen 6",
                "descrip":"blah blah something",
                "img":"lichen6"} 
        ];
        if(id!=undefined)
            return lichen[id-1];
        return lichen;
    };
   
})
.service('colony', function(){
     
    this.get = function(id) {
        var colonies = [
            {"id":1,
                "name":"colony 1",
                "descrip":"blah blah something",
                "hint":"This can be found hanging high above with a sunny disposition. They were named in Latin for their \"slit-end\" appearance.",
                "img":"lichen1",
                "imgsil":"colony1_sil",
                "lichen":[1,2,6]
            },
            {"id":2,
                "name":"colony 2",
                "descrip":"blah blah something",
                "hint":"hint hint something",
                "img":"lichen2",
                "imgsil":"colony1_sil",
                "lichen":[1,4,5,6]
            },
            {"id":3,
                "name":"colony 3",
                "descrip":"blah blah something",
                "hint":"hint hint something",
                "img":"lichen3",
                "imgsil":"colony1_sil",
                "lichen":[1,2,3]
            },
            {"id":4,
                "name":"colony 4",
                "descrip":"blah blah something",
                "hint":"hint hint something",
                "img":"lichen4",
                "imgsil":"colony1_sil",
                "lichen":[3,2]
            },
            {"id":5,
                "name":"colony 5",
                "descrip":"blah blah something",
                "hint":"hint hint something",
                "img":"lichen5",
                "imgsil":"colony1_sil",
                "lichen":[1,2,3,4,5,6]
            },
            {"id":6,
                "name":"colony 6",
                "descrip":"blah blah something",
                "hint":"hint hint something",
                "img":"lichen6",
                "imgsil":"colony1_sil",
                "lichen":[1,5]}
        ];
        if(id!=undefined)
            return colonies[id-1];
        return colonies;
    };
   
})
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
            console.log("not so much");
        }
    }
    $scope.loginbtn = function(uid) {
        user.login(uid).success(successful).
          error(function(data, status, headers, config) {
                console.log("ouch");
          });
    }
    var name = window.localStorage['username'] || 'you';
    $scope.yep = 'Hello, ' + name;
})

.controller('signupCtrl', function($scope, $state, user) {
    $scope.username = "";
    if(window.localStorage['username'])
        $scope.username = window.localStorage['username'];
    
    function successful(data, status, headers, config) {
        if(data.status){
            window.localStorage['username'] = data.user;
            $state.go('locations');
        }else{
            console.log("not so much");
        }
    }
    $scope.register = function(uid) {
        user.signup(uid).success(successful).
          error(function(data, status, headers, config) {
                console.log("ouch");
          });
    }
    var name = window.localStorage['username'] || 'you';
    $scope.yep = 'Hello, ' + name;
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
});


