var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
var columns = [
   {"name":"我的积分","ico":"sms.png","url":"score/score"},
   {"name":"学号绑定","ico":"pic.png","url":"collegeid/collegeid"},
   {"name":"座位情况","ico":"autologin.png","url":"myseat/myseat"},
   {"name":"个人资料","ico":"openid.png","url":"myinfo/myinfo"},
   {"name":"我的动态","ico":"pay.png","url":"release/release"},
   {"name":"反馈建议","ico":"code.png","url":"feedback/feedback"},
   {"name":"关于我们","ico":"code.png","url":"aboutus/aboutus"}, 
];
Page({
    data: {
        userInfo: {},
        columns:columns
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

    },
    
    about: function (e) {
         common.showModal('本程序后端使用Bmob简单实现，仅供学习使用，如想加入一起学习，请加QQ群：118541934');
    }

})