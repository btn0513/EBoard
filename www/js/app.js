// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',
    'starter.services', 'ngMap'])

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

  $ionicConfigProvider.backButton.previousTitleText(false).text(''); // Hide default back btn text
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.transition("android");  // android view transition

  $stateProvider
  .state('home', {
      url: "/",
      templateUrl: "templates/pages/home.html"
    })
  .state('signin', {
      url: "/signin",
      templateUrl: "templates/pages/signin.html"
    })
  .state('mainlocs', {
      url: "/locations",
      templateUrl: "templates/pages/mainlocations.html"
    })
  .state('map', {
      controller:"MapCtrl",
      url: "/locations/map",
      templateUrl: "templates/pages/map.html"
    })
  .state('subloc', {
      url: "/locations/:lid",
      templateUrl: "templates/pages/sublocation.html"
    })
  .state('sublocitem', {
      url: "/locations/:lid/item/:iid",
      templateUrl: "templates/pages/item.html"
    })

    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});