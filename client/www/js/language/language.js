angular.module('starter.language', [])
.factory('Zh', function() {

var language = {

    "dashboard":"首页",
    "contact":"联系人",
    "setting":"设置",
    "create-msg":"创建新类别"
}


return {

    get:function(key)
    {
        if(key in language)
        {
            return language[key];
        }
        return key;
    }
}
});
