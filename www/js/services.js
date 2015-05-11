angular.module('starter.services', [])

.service('user', function($http){
    var site = "urbancolonization.com";
    if(document.location.host == "localhost:8383"){
        site = "104.236.43.114";
    }
    var siteurl = "http://"+site+"/test/api.php";
            
    this.colonies = function(uid) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "colonies", user:uid}
         });
    };
    this.discover = function(uid,code) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "discover", user:uid, code:code}
         });
    };
    this.login = function(uid) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "login", user:uid}
         });
    };
    this.signup = function(uid) {
        
        return $http({
            url: siteurl, 
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
   
});
