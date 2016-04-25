angular.module('starter.controllers', [])
.controller('GithubLoginController',function($scope,$state,Zh,GithubUser,User){
  $scope.language = Zh;
  $scope.user = {"username":"","password":""};
  $scope.login = function()
  {
    GithubUser.login($scope.user.username,$scope.user.password).then(function(data){
      console.log(data);
      User.setStorage();

      //更新推送token
      var installData = _notifyHandler.getInstallationData();
      User.updateInstallId(installData);

      $state.go('tab.dash');return;
    },function(status,data){
      if(status != 200)
      {
        alert("用户名或密码错误");return false;
      }

    });
  }
})

.controller('AddTypeCtrl',function($scope,Zh,MsgType){
    $scope.patient = {};
   $scope.openAddTypeModal = function() {
      $scope.addModal.show();
   };

   $scope.closeAddTypeModal = function() {
      $scope.addModal.hide();
   };
   $scope.addTypeData = function()
   {
       var user_id = window.localStorage.getItem("user_id");
      MsgType.createMsgType(user_id, $scope.patient.type,$scope.patient.name,$scope.patient.desc).then(function(data){
          $scope.msgTypes.push(data);
          $scope.addModal.hide();
      },function(error){
        if('status' in error)
        {
          alert(error.error);
        }
      });


   }

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.addModal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {

   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
})

//首页控制器
.controller('DashCtrl', function($scope,$ionicModal,Zh,MsgType) {
  //设置页面语言
  $scope.language = Zh;
  var msgTypes = [];
  $scope.msgTypes = msgTypes;
  $scope.user_id = window.localStorage.getItem("user_id");

  if($scope.user_id)
  {
    MsgType.getMsgTypes($scope.user_id).then(function(datas){
      msgTypes = datas;
      updateMsgTypes();
    })
  }

  $ionicModal.fromTemplateUrl('templates/addType.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.addModal = modal;
   });

   function updateMsgTypes(){
    $scope.msgTypes = msgTypes;
   }

   $scope.remove = function(msgType)
   {

    msgTypes.splice(msgTypes.indexOf(msgType), 1);
    updateMsgTypes();
    var msgTypeCopty = msgType;
    msgTypeCopty.destroy().then(function(data){
     });

   }




})


//登陆控制器
.controller('LoginController',[ '$scope', '$state','Zh','User', function($scope, $state,Zh,User) {
        $scope.language = Zh;
        $scope.user = {
            username: null,
            password: null
        };

        $scope.login = function() {
          var error = function(error){
            alert("AuthenticateUser failed");
          };
          var success = function(response){
                User.setStorage();

                //更新推送token
                var installData = _notifyHandler.getInstallationData();
                User.updateInstallId(installData);
                $state.go('tab.dash');return;
          };
          AV.User.logIn($scope.user.username,$scope.user.password).then(success,error);
        }
}])


//tab控制器
.controller('TabController',[ '$scope', '$state','Zh','$rootScope', function($scope, $state,Zh,$rootScope) {
        $scope.language = Zh;
        if(!window.localStorage.getItem("user_id"))
        {
          $state.go('login');return;
        }


        _notifyHandler.setGetMessage($state,function(data){
            if('state' in data)
            {
              $state.go(data.state,{'type':data.type},{location:true});
            }

        });




}])




.controller('SettingCtrl', function($scope,$state,Zh,User) {
  $scope.language = Zh;
  $scope.user = {"username":User.getUserName()};
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function(){
    User.logout();
      alert('logout success');
      $state.go('login');return;

  }
})


//消息列表控制器
.controller('MessageCtrl', function($scope,$stateParams,Notifys,Zh) {

    var page = 1;
    $scope.language = Zh;
    $scope.type = $stateParams.type;

    var user_id = window.localStorage.getItem("user_id");
    if(user_id)
    {


    Notifys.getMessage(user_id, $scope.type,page).then(function(data){
          $scope.msgs = data;
        },function(error){});

    $scope.loadMore = function(){
        Notifys.getMessage(user_id,$scope.type,++page).then(function(data){
          $scope.msgs = data;
        },function(error){});
    }
  }

})

.controller('MessageDetailCtrl',function($scope,$stateParams,Notifys,Zh){

    $scope.language = Zh;
    $scope.msgId = $stateParams.msgId;
    $scope.msg = {};
    var user_id = window.localStorage.getItem("user_id");
    if(user_id)
    {
    Notifys.getMessageById(user_id, $scope.msgId).then(function(data){
          $scope.msg = data;
        },function(error){});
  }
})
;
