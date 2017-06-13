var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp()
var grids = [
   {"name":"发送短信","ico":"sms.png","url":"../sendSms/sendSms"},
   {"name":"扫码","ico":"jjl.png","url":"../coding/coding"},
   {"name":"微信自动登录","ico":"autologin.png","url":"../sendSms/sendSms","click":"autuLogin"},
   {"name":"获取openid","ico":"openid.png","url":"../getOpenId/getOpenId"},
   //{"name":"微信支付","ico":"pay.png","url":"../pay/pay"},
   {"name":"预约","ico":"jjl.png","url":"../appointment/appointment"},
   {"name":"登录","ico":"login.png","url":"../login/login"},
   {"name":"注册","ico":"reg.png","url":"../register/register"},
   {"name":"绑定","ico":"jjl.png","url":"../binding/binding"},
   {"name":"email","ico":"logout.png","url":"../email/email"},
   
  
];
Page({    
    data: {        
        userInfo: {},
        grids: grids
    
    },
    onLoad:function(){
        var that = this 
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    autuLogin:function(){
        common.showModal("App.js实现小程序访问则将数据写入系统User表，具体代码请查看App.js。")
    }

})