var base64 = require("../images/base64");
var list = [
   {"name":"图书馆一楼","ico":"sms.png","number":"10","url":"../seat/seat"},
   {"name":"图书馆二楼","ico":"pic.png","number":"20","url":"../../pages/picasa/picasa"},
   {"name":"图书馆三楼","ico":"autologin.png","number":"61","url":"../../pages/sendSms/sendSms"},
   {"name":"露天平台","ico":"openid.png","number":"30","url":"../../pages/getOpenId/getOpenId"}     
];
Page({
    data: {
    list: list
    },
    onLoad: function(){
        this.setData({
            icon: base64.icon20
        });
    }
});