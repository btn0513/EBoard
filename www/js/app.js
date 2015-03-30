// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('home', {
      url: "/",
      templateUrl: "templates/pages/home.html"
    })
    
    //**************     BROWSE PAGE     *******************************
    
    .state('home.browse', { //  url#/browse
      url: "browse",
      views: {
        'browse' :{
          templateUrl: "templates/browse/browse.html"
        }
      }
    })
    .state('home.browse.featured', { //  url#/browse/featured
      url: "/featured",
      views: {
        'browsing' :{
          templateUrl: "templates/browse/featured.html"
        }
      }
    })
    .state('home.browse.following', { //  url#/browse/following
      url: "/following",
      views: {
        'browsing' :{
          templateUrl: "templates/browse/following.html"
        }
      }
    })
    .state('home.browse.bulletin', { //  url#/browse/bulletin
      url: "/bulletin",
      views: {
        'browsing' :{
          templateUrl: "templates/browse/bulletin.html"
        }
      }
    })
    .state('home.browse.classified', { //  url#/browse/classified
      url: "/classified",
      views: {
        'browsing' :{
          templateUrl: "templates/browse/classified.html"
        }
      }
    })
    .state('home.browse.search', { //  url#/browse/search
      url: "/search",
      views: {
        'browsing' :{
          templateUrl: "templates/browse/search.html"
        }
      }
    })
    
    //**************     CHAT PAGE     *******************************
    
    .state('home.chat', {
      url: "chat",
      views: {
        'chat' :{
          templateUrl: "templates/chat/chat.html"
        }
      }
    })
    
    //**************     PROFILE PAGE     *******************************
    
    .state('home.profile', {
      url: "profile",
      views: {
        'profile' :{
          templateUrl: "templates/profile/profile.html"
        }
      }
    })
    
    //**************     POST PAGE     *******************************
    
    .state('home.post', {
      url: "post",
      views: {
        'post' :{
          templateUrl: "templates/post/post.html"
        }
      }
    })
    
    
    
    
    
 
    
    
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});