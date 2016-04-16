angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
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
    },
    onUpdate:function(data)
    {

    }
  };
})

.factory('MsgType',function($http, $q){
  return {
    getMsgTypes:function(user_id)
    {
      var deferred = $q.defer();
      var success = function(response){
      try{
        if(response)
        deferred.resolve(response);
      }catch(e)
      {
        alert(e);
      }
      }

      var error = function(error){
        alert(error);
        deferred.reject(error);
      }
      try{
      var query = new AV.Query("msgType");
      query.equalTo("user_id",user_id);
      query.limit(20);
      query.find(success,error);
      }catch(e)
      {
        alert(e);
      }
      return deferred.promise;
    },
    createMsgType:function(user_id,type,name,des)
    {
      var deferred = $q.defer();
      var success = function(response){
        if(response)
        deferred.resolve(response);
      }

      var error = function(error){
        deferred.reject(error);
      }
      var query = new AV.Query("msgType");
      query.equalTo("user_id",user_id);
      query.equalTo("type",type);
      query.find(function(data){
        if(data.length == 0)
        {
          var obj = new AV.Object("msgType");
          obj.set('user_id',user_id);
          obj.set('type',type);
          obj.set('name',name);
          obj.set('des',des);
          obj.save().then(success,error)
        }
        else
        {
          deferred.reject({"status":false,"error":"type exist"});
        }

      },error);


      return deferred.promise;
    }


  }
})

.factory('Notifys', ['$http','$q',
  function($http, $q) {
  return {

      getMessage:function(user_id,key,page){
              var deferred = $q.defer();

              var success = function(response){
                if(response)
                deferred.resolve(response);
              }

              var error = function(error){
                deferred.reject(error);
              }
              var query = new AV.Query("message");
              query.addDescending('createdAt');
              query.equalTo("type",key);
              query.equalTo("user_id",user_id);
              query.limit(10);
              query.skip((page-1)*10);
              query.find(success,error)
              return deferred.promise;
      },
      getMessageById:function(user_id,msgId)
      {
              var deferred = $q.defer();

              var success = function(response){
                if(response)
                deferred.resolve(response);
              }

              var error = function(error){
                deferred.reject(error);
              }
              var query = new AV.Query("message");
              query.equalTo("objectId",msgId);
              query.equalTo("user_id",user_id);
              query.first(success,error)
              return deferred.promise;
      }
  }

}]);
