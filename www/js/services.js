angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Posts', function($http) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var posts =
    [{
      id: 0,
      title: 'GSU Night',
      when: '4/7 at 4:00 PM',
      where: '560L Flarsheim Hall',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event1.jpg',
      postedDate: 'March 31, 2015 at 11:00 AM',
      postedAuthor: 'Binh Nguyen'
    },
    {
      id: 1,
      title: 'Literacy In Our Culture',
      when: '4/7 at 2:00 PM',
      where: 'Student Union',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event2.jpg',
      postedDate: 'March 15, 2015 at 12:00 AM',
      postedAuthor: 'An Nguyen'
    },
    {
      id: 2,
      title: 'Literacy In Our Culture',
      when: '4/7 at 1:00 PM',
      where: 'School of Education',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event3.jpg',
      postedDate: 'March 23, 2015 at 8:00 AM',
      postedAuthor: 'Hoang Nguyen'
    },
    {
      id: 3,
      title: 'Georgia State vs Atlanta Hawks',
      when: '4/8 at 10:00 AM',
      where: 'Swinney Recreational Center',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event4.jpg',
      postedDate: 'March 20, 2015 at 7:00 AM',
      postedAuthor: 'Micheal Nguyen'
    },
    {
      id: 4,
      title: 'Maleficient showing night',
      when: '4/8 at 8:00 PM',
      where: 'Student Union',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event5.jpg',
      postedDate: 'March 26, 2015 at 9:00 AM',
      postedAuthor: 'Jake Nguyen'
    },
    {
      id: 5,
      title: 'The Princess Pride',
      when: '4/79 at 7:00 PM',
      where: 'Student Union',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event6.jpg',
      postedDate: 'March 25, 2015 at 10:00 AM',
      postedAuthor: 'Reggie Roby'
    },
    {
      id: 6,
      title: 'Georgia State Night',
      when: '5/7 at 4:00 PM',
      where: 'Georgia State University',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event7.jpg',
      postedDate: 'March 22, 2015 at 9:00 AM',
      postedAuthor: 'Alex'
    },
    {
      id: 7,
      title: 'Life According to Jimmy',
      when: '4/9 at 5:00 PM',
      where: 'Student Union',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event8.jpg',
      postedDate: 'March 27, 2015 at 11:30 AM',
      postedAuthor: 'Reggie'
    },
    {
      id: 8,
      title: 'Disney Nature Bears',
      when: '4/12 at 11:00 AM',
      where: 'Miler Nichols Library',
      description: 'Description texts here... bla bla bla bla',
      img: 'img/event9.jpg',
      postedDate: 'March 30, 2015 at 12:00 AM',
      postedAuthor: 'Micheal'
    }];

    return {
      all: function() {
        return posts;
      },
      get: function(postId) {
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].id === parseInt(postId)) {
            return posts[i];
          }
        }
        return null;
      },
      getPosts: function() {
            return $http.get('http://banana-cobbler-6505.herokuapp.com/api/v1/listings.json');
        }
    };
  })

;
