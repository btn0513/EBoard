// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',
    'starter.services', 'starter.pagesCtrl', 'ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.backButton.previousTitleText(false).text(''); // Hide default back btn text
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.transition("platform");  // android view transition

  $stateProvider
  .state('home', {
      url: "/",
      templateUrl: "pages/home.html"
    })
  .state('admin', {
      url: "/admin",
      templateUrl: "pages/admin.html"
    })
  .state('signin', {
      url: "/signin",
      templateUrl: "pages/signin.html",
      controller:"loginCtrl"
    })
  .state('signup', {
      url: "/signup",
      templateUrl: "pages/signup.html",
      controller:"signupCtrl"
    })
  .state('about', {
      url: "/about",
      templateUrl: "pages/about.html"
    })
  .state('locations', {
      url: "/locations",
      templateUrl: "pages/locations.html",
      controller:"LocsCtrl"
    })
  .state('map', {
      controller:"MapCtrl",
      url: "/locations/map",
      templateUrl: "pages/map.html"
    })
  .state('location', {
      url: "/locations/:lid",
      templateUrl: "pages/location.html",
      controller:"LocCtrl"
    })
  .state('colony', {
      url: "/locations/:lid/colony/:cid",
      templateUrl: "pages/colony.html",
      controller:"ColonyPageCtrl"
    })
  .state('colony.known', {
      templateUrl: "pages/fragment/knownColony.html",
      controller:"LichenCtrl"
    })
  .state('colony.unknown', {
      templateUrl: "pages/fragment/unknownColony.html",
      controller:"ColonyCtrl"
    })

    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});