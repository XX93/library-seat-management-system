var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()

Page({
    onLoad: function () {

    },
    formSubmit: function (event) {
        Bmob.User.logIn("2", "2", {
            success: function (user) {
                // Do stuff after successful login.
                console.log("success"+event.detail.value.username.trim() + "@fudan.edu.cn")
                
                user.set("email", event.detail.value.username.trim() + "@fudan.edu.cn");
                user.save();

                Bmob.User.requestEmailVerify(user.get("email"), {
                    success: function () {
                        // Password reset request was sent successfully
                        common.showTip("登录成功,请到邮箱验证身份", "success", function () {
                            wx.navigateBack({
                               delta:1
                            })
                        });
                        console.log("Email")
                    },
                    error: function (error) {
                        // Show the error message somewhere
                        console.log("Error: " + error.code + " " + error.message);
                    }
                })
            },
            error: function (user, error) {
                // The login failed. Check error to see why.
                console.log("Error")
            }
        });
        // var user = Bmob.User.current();
        // if (!user) {
        //     common.showTip("Null", "loading")
        // }
        // user.requestEmailVerify("15110720006@fudan.edu.cn", {
        //     success: function () {
        //         // Password reset request was sent successfully
        //         common.showTip("Sucess", "loading")
        //     },
        //     error: function (error) {
        //         // Show the error message somewhere
        //         common.showTip("Error: " + error.code + " " + error.message);
        //     }
        // })
    }
})  