// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.language'])

.run(function($ionicPlatform) {


  AV.initialize('app_id', 'app_key');
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    _notifyHandler.init();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // .state('login',{
  //   url: '/login',
  //   // abstract: true,
  //   templateUrl: 'templates/login.html',
  //   controller : 'LoginController'
  // })
  .state('githubLogin',{
    url: '/githubLogin',
    // abstract: true,
    templateUrl: 'templates/githubLogin.html',
    controller : 'GithubLoginController'
  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller : 'TabController'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.message', {
      url: '/message/:type/:typeName',
      views: {
        'tab-dash': {
          templateUrl: 'templates/message/msg.html',
          controller: 'MessageCtrl'
        }
      }
    })
  .state('tab.msg-detail', {
      url: '/msg-detail/:msgId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/message/msg-detail.html',
          controller: 'MessageDetailCtrl'
        }
      }
    })

  .state('tab.setting', {
    url: '/setting',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'SettingCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
