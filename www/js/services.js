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

.factory('Posts', function() {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var posts = 
    [{
      id: 0,
      title: 'GSU Night',
      img: 'img/event1.jpg'
    },
    {
      id: 1,
      title: 'Literacy In Our Culture',
      img: 'img/event2.jpg'
    },
    {
      id: 2,
      title: 'Literacy In Our Culture',
      img: 'img/event3.jpg'
    },
    {
      id: 3,
      title: 'Georgia State vs Atlanta Hawks',
      img: 'img/event4.jpg'
    },
    {
      id: 4,
      title: 'Maleficient showing night',
      img: 'img/event5.jpg'
    },
    {
      id: 5,
      title: 'The Princess Pride',
      img: 'img/event6.jpg'
    },
    {
      id: 6,
      title: 'Georgia State Night',
      img: 'img/event7.jpg'
    },
    {
      id: 7,
      title: 'Life According to Jimmy',
      img: 'img/event8.jpg'
    },
    {
      id: 8,
      title: 'Disney Nature Bears',
      img: 'img/event9.jpg'
    },
    {
      id: 9,
      title: 'Workaholics',
      img: 'img/event10.jpg'
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
      }
    };
  })

;