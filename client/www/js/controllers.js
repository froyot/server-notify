angular.module('starter.controllers', [])
.controller('GithubLoginController',function($scope,$state,Zh,GithubUser,User,$ionicLoading,$ionicHistory){
  $scope.language = Zh;
  $scope.user = {"username":"xianlong.wang@dev-engine.com","password":"wang900206"};

$ionicHistory.clearHistory();
  $scope.login = function()
  {
    $ionicLoading.show();

    GithubUser.login($scope.user.username,$scope.user.password).then(function(data){
      console.log(data);
      User.setStorage();

      //更新推送token
      var installData = _notifyHandler.getInstallationData();
      User.updateInstallId(installData);
      $ionicLoading.hide();
      $state.go('tab.dash');return;
    },function(status,data){
      $ionicLoading.hide();
      if(status == 401)
      {
        alert("用户名或密码错误");return false;
      }
      else if(status == 0)
      {
        alert("网络连接失败，稍后再试");return false;
      }

    });
  }
})

.controller('AddTypeCtrl',function($scope,Zh,MsgType,$ionicLoading){
    $scope.patient = {};
   $scope.openAddTypeModal = function() {
      $scope.addModal.show();
   };

   $scope.closeAddTypeModal = function() {
      $scope.addModal.hide();
   };
   $scope.addTypeData = function()
   {
      $ionicLoading.show();
      var user_id = window.localStorage.getItem("user_id");
      MsgType.createMsgType(user_id, $scope.patient.type,$scope.patient.name,$scope.patient.desc).then(function(data){
          $scope.msgTypes.push(data);
          $scope.addModal.hide();
          $ionicLoading.hide();
      },function(error){
        $ionicLoading.hide();
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
.controller('DashCtrl', function($scope,$ionicModal,Zh,MsgType,$ionicLoading) {
  //设置页面语言
  $scope.language = Zh;
  var msgTypes = [];
  $scope.msgTypes = msgTypes;
  $scope.user_id = window.localStorage.getItem("user_id");

  if($scope.user_id)
  {
    $ionicLoading.show();
    MsgType.getMsgTypes($scope.user_id).then(function(datas){
      msgTypes = datas;
      $ionicLoading.hide();
      updateMsgTypes();
    },
    function(data){
      $ionicLoading.hide();
    }
    )
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
    $ionicLoading.show();
    msgTypes.splice(msgTypes.indexOf(msgType), 1);
    updateMsgTypes();
    var msgTypeCopty = msgType;
    msgTypeCopty.destroy().then(function(data){
      $ionicLoading.hide();
     },function(data){
      $ionicLoading.hide();
     });

   }




})


//登陆控制器
.controller('LoginController',function($scope, $state,$ionicHistory,Zh,User,$ionicLoading) {
        $scope.language = Zh;
        $scope.user = {
            username: null,
            password: null
        };
        $ionicHistory.clearHistory();
        $scope.login = function() {
          $ionicLoading.show();

          var error = function(error){
            $ionicLoading.hide();

          };
          var success = function(response){
                User.setStorage();

                //更新推送token
                var installData = _notifyHandler.getInstallationData();
                User.updateInstallId(installData);
                $ionicHistory.clearHistory();
                $ionicLoading.hide();
                $state.go('tab.dash');return;
          };
          AV.User.logIn($scope.user.username,$scope.user.password).then(success,error);
        }
})


//tab控制器
.controller('TabController',function($scope, $state,Zh,$rootScope,$ionicHistory) {
        $scope.language = Zh;
        $ionicHistory.clearHistory();
        if(!window.localStorage.getItem("user_id"))
        {

          $state.go('githubLogin');return;
        }


        _notifyHandler.setGetMessage($state,function(data){
            if('state' in data)
            {

              $state.go(data.state,{'type':data.type,'typeName':""},{location:true});
            }

        });




})




.controller('SettingCtrl', function($scope,$state,Zh,User,$ionicLoading) {
  $scope.language = Zh;

  $scope.user = {"username":User.getNickname(),"secureKey":User.getSecureKey()};
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function(){

    User.logout();

      $state.go('githubLogin');return;

  }
})


//消息列表控制器
.controller('MessageCtrl', function($scope,$stateParams,Notifys,Zh,MsgType,$ionicHistory) {

    var page = 1;
    $scope.language = Zh;
    $scope.type = $stateParams.type;
    $scope.typeName = $stateParams.typeName;
    var user_id = window.localStorage.getItem("user_id");

    var entryViewId = $ionicHistory.viewHistory().views;
    if(user_id)
    {

    if(!$scope.typeName)
    {
      MsgType.getMsgType(user_id,$scope.type).then(function(data){
        $scope.typeName = data.get("name");
      });
    }
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
