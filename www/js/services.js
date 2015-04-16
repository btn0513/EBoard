angular.module('starter.services', [])

.factory('Posts', function($http) {
    return {
      getPosts: function() {
            return $http.get('js/testingPosts.json');
            //return $http.get('http://banana-cobbler-6505.herokuapp.com/api/v1/listings.json');
        }
    };
  })

;
