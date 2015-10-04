angular.module('starter.services', ['firebase'])

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
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
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

.factory('todoService', function($http){

  var doRequest = function(userId){
    return $http({
      method: 'JSONP',
      url: "http://pinkymango.com/test.php?callback=JSON_CALLBACK&&read=" + userId
    });
  };
  var doDelete = function(index){
    return $http({
      method: 'JSONP',
      url: "http://pinkymango.com/test.php?callback=JSON_CALLBACK&&delete=" + index
    });
  };
  var doChange = function(index, state){
    return $http({
      method: 'JSONP',
      url: "http://pinkymango.com/test.php?callback=JSON_CALLBACK&&change=" + index + "&&state=" + state
    });
  };
  var doCreate = function(userId, data){
    var serialData = 'userid=' + userId + '&' + data;
    console.log(serialData);
    return $http({
      url: "http://pinkymango.com",
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: serialData
    });
  }

  return {
    all: function(userId){
      return doRequest(userId);
    },
    delete: function(index){
      return doDelete(index);
    },
    change: function(index, state){
      return doChange(index, state);
    },
    create: function(userId, data){
      var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for(name in obj){
          value = obj[name];  
          if(value instanceof Array) {
            for(i=0; i<value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object) {
            for(subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        } 
        return query.length ? query.substr(0, query.length - 1) : query;
      };

      var serialData = param(data);
      return doCreate(userId, serialData);
    }
  }
})

.factory('userService', function($firebaseAuth){

  var Auth = {};
  var ref = new Firebase("https://todolo.firebaseio.com");
  var auth = $firebaseAuth(ref);
    
  Auth = {
    auth: auth,
    ref: ref,
    login: function(email, password){
      return auth.$authWithPassword({email: email, password: password});
    },
    logout: function(){
        return auth.$unauth();
    },
    checkState: function(){
      return auth.$requireAuth();
    },
    add: function(email, password){
      return auth.$createUser({email: email, password: password});
    }
  };

  return Auth;
});
