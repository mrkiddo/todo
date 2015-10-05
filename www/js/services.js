angular.module('starter.services', ['firebase'])

// define a service to CURD operation of to-do items
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
      // serialize the data for POST method
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
// define a service for user managment based on firebase
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
