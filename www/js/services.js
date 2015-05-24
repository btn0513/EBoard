angular.module('starter.services', [])

.factory('user', function($http){
    var fac = {};
    var site = "urbancolonization.com";
    if(document.location.host == "localhost:8383"){
        site = "104.236.43.114";
    }
    var siteurl = "http://"+site+"/api.php";
            
    fac.colonies = function(uid) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "colonies", user:uid}
         });
    };
    fac.discover = function(uid,code) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "discover", user:uid, code:code}
         });
    };
    fac.login = function(uid) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "login", user:uid}
         });
    };
    fac.signup = function(uid) {
        
        return $http({
            url: siteurl, 
            method: "GET",
            params: {action: "signup", user:uid}
         });
    };
    return fac;
})
.service('location', function(){
    this.get = function(id) {
        var locations = [
            {"id":1,
                "name":"Mid-America Arts Alliance",
                "times":[{"days":"Mon - Fri",
                "hours":"10am - 5pm"},
                {"days":"1st Fridays",
                "hours":"6pm - 8pm"}],
                "avail":"6/5/2015",
                "address":"2018 Baltimore Ave. Kansas City, MO 64108",
                "url":"http://maaa.org/",
                "website":"maaa.org",
                "img":"maaa.jpg",
                "colonies":[1,2,3,4]},
            {"id":2,
                "name":"Plug Projects",
                "times":[{"days":"Saturday",
                "hours":"10am - 5pm"}],
                "avail":"6/26/2015",
                "address":"1613 Genessee St. Kansas City, MO 64102",
                "url":"http://www.plugprojects.com/",
                "website":"plugprojects.com",
                "img":"plugprojects.jpg",
                "colonies":[5]
            },
            {"id":3,
                "name":"Union Station",
                "times":[{"days":"Mon",
                    "hours":"closed"},
                    {"days":"Tu - Sa",
                    "hours":"10am - 5pm"},
                    {"days":"Su",
                    "hours":"12pm - 5pm"}],
                "avail":"6/26/2015",
                "address":"30 West Pershing Road, Kansas City, MO 64108",
                "url":"http://www.unionstation.org/",
                "website":"unionstation.org",
                "img":"unionstation.jpg",
                "colonies":[6]
            },
            {"id":4,
                "name":"Anita B. Gorman",
                "times":[{"days":"Mon - Fri",
                "hours":"8am - 5pm"},
                {"days":"Sat (1st & 3rd)",
                "hours":"9am - 4pm"},
                {"days":"Su",
                "hours":"closed"}],
                "avail":"7/17/2015",
                "address":"4750 Troost Ave. Kansas City, MO 64110",
                "url":"http://mdc.mo.gov/regions/kansas-city/discovery-center",
                "website":"mdc.mo.gov/...",
                "img":"anitab.jpg",
                "colonies":[7,8,9]
            }
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
                "name":"Flavoparmelia caperata",
                "descrip":"blah blah something",
                "hint":"These versatile shields of green-- just hanging out, with a nice view of First Friday's street scene.",
                "img":"Graphis_scripta_dsc_1719",
                "imgsil":"Flavoparmelia caperata silhouette small",
                "lichen":[1,2,6]
            },
            {"id":2,
                "name":"Lecanora hybocarpa, Arthonia rubella",
                "descrip":"blah blah something",
                "hint":"They took a \"poll\" and confirmed the spots resemble german measles.",
                "img":"Lecanora_hybocarpa_2242",
                "imgsil":"Flavoparmelia caperata silhouette medium",
                "lichen":[1,4,5,6]
            },
            {"id":3,
                "name":"Teloschistes chrysophthalmus, Parmotrema perforatum",
                "descrip":"blah blah something",
                "hint":"This architectural horizon has a bizarre fashion sense complete with blue ruffles, black eyelashes, a green beard and blonde split-ends.",
                "img":"Parmotrema chinense_0483",
                "imgsil":"Flavoparmelia caperata silhouette large",
                "lichen":[1,2,3]
            },
            {"id":4,
                "name":"Xanothoria parientina, physcia stellaris",
                "descrip":"blah blah something",
                "hint":"One of these belongs to a family of stars and another is a namesake of the sun. It is no surprise that these two share an affinity for watching the sky. They chose their home accordingly.",
                "img":"Parmotrema perferatum_5659",
                "imgsil":"colony1_sil",
                "lichen":[3,2]
            },
            {"id":5,
                "name":"Candelariella vitellina, Candelaria fibrosa",
                "descrip":"dfgsdg",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"Teloschistes chryspothalmus & Parmotrema",
                "imgsil":"colony1_sil",
                "lichen":[1,2,3,4,5,6]
            },
            {"id":6,
                "name":"Punctelia rudecta Xanthoparmelia hypomelaena Acoraspora socialis Parmotrema chinese Parmotrema perforatum Lecanora muralis",
                "descrip":"blah blah something",
                "hint":"This group is a social one. Their communial lifestyle connects them to more than just each other.",
                "img":"Xanthoria parientina_5071",
                "imgsil":"colony1_sil",
                "lichen":[1,5]
            },
            {"id":7,
                "name":"Xanothoria elegans7",
                "descrip":"dfgsdg",
                "hint":"After traveling to space, this species relocated to a place less extreme but suspended between land and sky.",
                "img":"lichen5",
                "imgsil":"colony1_sil",
                "lichen":[1]
            },
            {"id":8,
                "name":"Candelariella vitellina8, Candelaria fibrosa",
                "descrip":"dfgsdg",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"lichen5",
                "imgsil":"colony1_sil",
                "lichen":[1,2]
            },
            {"id":9,
                "name":"Candelariella vitellina, Candelaria fibrosa9",
                "descrip":"dfgsdg",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"lichen5",
                "imgsil":"colony1_sil",
                "lichen":[4,5]
            }
        ];
        if(id!=undefined)
            return colonies[id-1];
        return colonies;
    };
   
});
