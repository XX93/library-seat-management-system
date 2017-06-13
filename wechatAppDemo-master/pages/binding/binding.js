var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var timestamp = require('../../utils/timestamp.js')
var app = getApp()
var College = Bmob.Object.extend("college");
var college = new Bmob.Query(College);
Page({

    onLoad: function () {

    },
    formSubmit: function (event) {
        //查询输入学号状态
        college.equalTo("studentid", event.detail.value.username.trim());
        college.find({
            success: function (results) {
                if (results.length == 0) {
                    console.log("无权绑定");
                    common.showTip("无权绑定", "loading")
                }
                else if (results[0].get("occupied")) {
                    console.log("已绑定");
                    common.showTip("该学号已被已绑定", "loading")
                }
                else {
                    console.log("可绑定");
                    //绑定当前用户
                    var user = Bmob.User.current();
                    //未绑定过学号
                    if (user.get('emailVerified') == null || (user.get('emailVerified') == false)) {
                        user.set("username", event.detail.value.username.trim());
                        user.set("email", event.detail.value.username.trim() + "@fudan.edu.cn");
                        user.set("violation", 0);
                        user.save(null, {
                            //学号未被没验证用户填写
                            success: function (result) {
                                console.log("绑定学号" + user.get('username'));
                                console.log("objectId:" + result.id);
                                //给后台1s时间更新
                                setTimeout(function () {
                                    //发送邮件
                                    Bmob.User.requestEmailVerify(user.get("email"), {
                                        success: function () {
                                            console.log("EmailSend");
                                            // var timestep = new Date();
                                            timestamp.getServerTime({
                                                success: function (res) {
                                                    // success
                                                    var object = results[0];
                                                    var timestep = new Date(res);
                                                    user.set('emailsendtime', timestep);
                                                    user.save();
                                                },
                                                fail: function (res) {
                                                    console.log(res)
                                                }
                                            })

                                            //跳转1
                                        },
                                        error: function (error) {
                                            // Show the error message somewhere
                                            console.log("Error: " + error.code + " " + error.message);
                                        }
                                    })
                                }, 1000);
                            },

                            //学号被填写但未认证
                            error: function (result, error) {
                                //查询占用者，并删除对应信息
                                var User = Bmob.Object.extend("_User");
                                var query = new Bmob.Query(User);
                                var username = Bmob.User.current().get("username");
                                query.equalTo("username", username);
                                query.find({
                                    success: function (results) {
                                        //抢绑用户未验证邮箱
                                        if (!results[0].get('emailVerified')) {
                                            //计算未认证时间
                                            timestamp.getServerTime({
                                                success: function (res) {
                                                    // success
                                                    var object = results[0];
                                                    var timestep1 = new Date(res);
                                                    var timestep2 = new Date(results[0].get('emailsendtime'));
                                                    var duration = (timestep1.getTime() - timestep2.getTime()) / 1000;
                                                    var retry = 300 - duration;
                                                    console.log("sendtime:" + duration + "s");
                                                    console.log("绑定失败，请" + retry + "秒后再试");
                                                    //*秒后再试
                                                },
                                                fail: function (res) {
                                                    console.log(res)
                                                }
                                            })
                                        }
                                        else {
                                            console.log("已绑定");
                                            common.showTip("该学号已被已绑定", "loading")
                                        }

                                    },
                                });
                            }
                        });
                    }
                    else {
                        common.showTip("您已通过验证", "loading")
                    }
                }
            },
        })
    },
    formReset: function () {
        //     console.log("in");
        common.showTip("reset", "loading");
        //     // var userpoint = Bmob.Object.createWithoutData("_User", "pakEz33P");
        //     // var subscribe = Bmob.Object.extend("subscribe");
        //     // var mysubscribe = new subscribe();
        //     // // mysubscribe.set("publisher", userpoint);
        //     // var relation = mysubscribe.relation("testrelation");
        //     // relation.add(userpoint);

        //     // mysubscribe.save();
    },

})