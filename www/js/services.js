angular.module('starter.services', [])

.factory('user', function($http){
    var fac = {};
    var site = "urbancolonization.com";
    if(document.location.host == "localhost:8383"){
        site = "urbancolonization.com";
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
                "avail":"06/05/2015",
                "address":"2018 Baltimore Ave",
                "city":"Kansas City, MO 64108",
                "url":"http://maaa.org/",
                "website":"maaa.org",
                "img":"maaa.jpg",
                "colonies":[1,2,3,4]},
            {"id":2,
                "name":"Plug Projects",
                "times":[{"days":"Saturday",
                "hours":"10am - 5pm"}],
                "avail":"6/26/2015",
                "address":"1613 Genessee St",
                "city":"Kansas City, MO 64102",
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
                "address":"30 West Pershing Road",
                "city":"Kansas City, MO 64108",
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
                "address":"4750 Troost Ave",
                "city":"Kansas City, MO 64110",
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
                "name":"Flavoparmelia caperata",
                "descrip":"Common greenshield lichen",
                "img":"Colony_01_Flavoparmelia_caperata",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=54388"
            },
            {"id":2,
                "name":"Arthonia rubella",
                "descrip":"Dot lichen",
                "img":"Colony_02_Arthonia_rubella",
                "website":"http://lichenportal.org/portal"
            },
            {"id":3,
                "name":"Lecanora hybocarpa",
                "descrip":"Bumpy-rim lichen",
                "img":"Colony_02_Lecanora_hybocarpa",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=53819"
            },
            {"id":222,
                "name":"Arthonia rubella ",
                "descrip":"Dot lichen",
                "img":"Colony_02_Arthonia_rubella",
                "website":"http://lichenportal.org/portal"
            },
            {"id":333,
                "name":"Lecanora hybocarpa",
                "descrip":"Bumpy-rim lichen",
                "img":"Colony_02_Lecanora_hybocarpa",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=53819"
            },
            {"id":4,
                "name":"Teloschistes chrysophthalmus & Parmotrema perforatum",
                "descrip":"Golden-eye lichen",
                "img":"Colony_03_Teloschistes_chryspothalmus_Parmotrema",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=54703"
            },
            {"id":5,
                "name":"Teloschistes chrysophthalmus",
                "descrip":"Golden-eye lichen",
                "name2":"Parmotrema perforatum",
                "descrip2":"Perforated ruffle lichen",
                "img":"Colony_03_Teloschistes_chryspothalmus_Parmotrema",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=56375",
                "website2":"http://lichenportal.org/portal/taxa/index.php?taxon=54560"
            },
            {"id":6,
                "name":"Usnea subcarbrosa",
                "descrip":"Horny beard lichen",
                "img":"Colony_03_Usnea_subscabrosa",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=54703"
            },
            {"id":555,
                "name":"Teloschistes chrysophthalmus",
                "descrip":"Golden-eye lichen",
                "name2":"Parmotrema perforatum",
                "descrip2":"(Perforated ruffle lichen)",
                "img":"Colony_03_Teloschistes_chryspothalmus_Parmotrema",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=56375",
                "website2":"http://lichenportal.org/portal/taxa/index.php?taxon=54560"
            },
            {"id":666,
                "name":"Usnea subcarbrosa",
                "descrip":"Horny beard lichen",
                "img":"Colony_03_Usnea_subscabrosa",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=54703"
            },
            {"id":7,
                "name":"Xanthora elegans",
                "descrip":"Elegant sunburst lichen",
                "img":"Colony_04_Xanthoria_elegans",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=56384"
            },
            {"id":8,
                "name":"Physcia stellaris",
                "descrip":"Star rosette lichen",
                "img":"Colony_04_Physcia_stellaris",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=53819"
            },
            {"id":777,
                "name":"Xanthora elegans",
                "descrip":"Elegant sunburst lichen",
                "img":"Colony_04_Xanthoria_elegans",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=56384"
            },
            {"id":888,
                "name":"Physcia stellaris",
                "descrip":"Star rosette lichen",
                "img":"Colony_04_Physcia_stellaris",
                "website":"http://lichenportal.org/portal/taxa/index.php?taxon=53819"
            },
            {"id":9,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":10,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":11,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":12,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":13,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":14,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":15,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":16,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":17,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":18,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":19,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":20,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":21,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":22,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":23,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":24,
                "name":"lichen 5",
                "descrip":"blah blah something",
                "img":"lichen5",
                "website":""
            },
            {"id":25,
                "name":"lichen 6",
                "descrip":"blah blah something",
                "img":"lichen6",
                "website":""
        }];
        if(id!=undefined)
            return lichen[id-1];
        return lichen;
    };
   
})
.service('colony', function(){
     
    this.get = function(id) {
        var colonies = [
            {"id":1,
                "qr":"F653CH",
                "hint":"These versatile shields of green-- just hanging out, with a nice view of First Friday's street scene.",
                "img":"Colony_01",
                "lichen":[1]
            },
            {"id":2,
                "qr":"L12R2A",
                "hint":"They took a \"poll\" and confirmed the spots resemble german measles.",
                "img":"Colony_02",
                "lichen":[2,3,222,333]
            },
            {"id":3,
                "qr":"Q3DUS7",
                "hint":"This architectural horizon has a bizarre fashion sense complete with blue ruffles, black eyelashes, a green beard and blonde split-ends.",
                "img":"Colony_03",
                "lichen":[5,6,555,666]
            },
            {"id":4,
                "qr":"XE7P1S",
                "hint":"One of these belongs to a family of stars and another is a namesake of the sun. It is no surprise that these two share an affinity for watching the sky. They chose their home accordingly.",
                "img":"Colony_04",
                "lichen":[7,8,777,888]
            },
            {"id":5,
                "qr":"C5R2B5",
                "hint":"This elusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"Colony_05",
                "lichen":[9,10,11,12,13,14]
            },
            {"id":6,
                "qr":"2R5GP7",
                "hint":"This group is a social one. Their communial lifestyle connects them to more than just each other.",
                "img":"Colony_06",
                "lichen":[15,16]
            },
            {"id":7,
                "qr":"7",
                "hint":"After traveling to space, this species relocated to a place less extreme but suspended between land and sky.",
                "img":"Colony_07",
                "lichen":[17]
            },
            {"id":8,
                "qr":"8",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"Colony_08",
                "lichen":[18]
            },
            {"id":9,
                "qr":"9",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"Colony_09",
                "lichen":[19]
            },
            {"id":10,
                "qr":"10",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"Colony_10",
                "lichen":[20]
            },
            {"id":11,
                "qr":"11",
                "hint":"This allusive and camera shy colony is flourishing in a liminal habitat.",
                "img":"Colony_11",
                "lichen":[21]
            },
            {"id":12,
                "qr":"12",
                "hint":"Pixies and reindeer",
                "img":"Colony_12",
                "lichen":[22,23,24,25]
            }
        ];
        if(id!=undefined)
            return colonies[id-1];
        return colonies;
    };
   
});
