var NotifyHandler = function()
{
    var afterGetMessage = null;
    var afterGetInstallation = null;
    var installationData = null;
    //初始化消息推送服务
    this.init = function()
    {
        try{
        window.LeanPush.init();
        window.LeanPush.onNotificationReceived(function(notify){
            if(afterGetMessage)
            {
                afterGetMessage(notify);
            }
        });
        window.LeanPush.getInstallation(function(data){

            installationData = data;
        }, function(data){

        })
        }
        catch(e)
        {
            console.log(e);
        }
    }

    this.setGetMessage = function($scope,callback)
    {
        afterGetMessage = callback;
    }

    this.setGetInstallation = function(callback)
    {
        afterGetInstallation = callback;
    }

    this.getInstallationData = function()
    {
        return installationData;
    }
}

var _notifyHandler = new NotifyHandler();




// _notifyHandler.setGetInstallation(function(data){
// //        'deviceType':'android' or 'ios',
// //        'installationId': 'android installation id' or 'ios deviceToken'
// //        'deviceToken':    'ios deviceToken' or 'android installation id'

// //更新用户表
// })
