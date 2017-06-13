var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var timestamp = require('../../utils/timestamp.js')
var app = getApp()
var seatid = 5;//该变量为扫码结果
var objectid_appoint;
var objectid_subscribe;
var objectid_seat;
var types = ['default', 'primary', 'warn']
var pageObject = {
    coding: function () {
        common.showTip("coding", "loading");
        var myDate = new Date();
        var Appointseat = Bmob.Object.extend("appointseat");
        var Subscribe = Bmob.Object.extend("subscribe");
        var Seat = Bmob.Object.extend("seat");
        var User = Bmob.Object.extend("_User");
        var user = Bmob.User.current();
        var query = new Bmob.Query(User);
        query.get(user.id, {
            success: function (result) {
                if (result.get('emailVerified') == true) {
                    console.log("email认证通过");
                    query.get(user.id, {
                        success: function (result) {
                            if (result.get('violation') < 3) {
                                console.log("可使用系统");
                                query.get(user.id, {
                                    success: function (result) {
                                        timestamp.getServerTime({
                                            success: function (res) {
                                                // success
                                                var timestep1 = new Date(res);
                                                var timestep2 = new Date(result.get('cardAt'));
                                                console.log(result.get('cardAt'));
                                                var duration = (timestep1.getTime() - timestep2.getTime()) / 1000;
                                                if (duration < 9000000) {
                                                    console.log("刷卡通过");
                                                    var query = new Bmob.Query(Appointseat);
                                                    query.equalTo("status", "0");
                                                    query.equalTo("user", user.id);
                                                    query.find({
                                                        success: function (results) {
                                                            console.log("共查询到 " + results.length + " 条记录");
                                                            // 循环处理查询到的数据
                                                            if (results.length > 0) {
                                                                console.log("预约过");
                                                                objectid_appoint = results[0].id;
                                                                console.log(results[0].id + ' - ' + results[0].get('status'))
                                                                var query = new Bmob.Query(Subscribe);
                                                                query.equalTo("appoint", objectid_appoint);
                                                                query.find({
                                                                    success: function (results) {
                                                                        console.log("共查询到 " + results.length + " 条记录");
                                                                        objectid_subscribe = results[0].id;
                                                                        wx.request({
                                                                            url: 'https://api.bmob.cn/1/classes/seat?where=%7B%22$relatedTo%22:%7B%22object%22:%7B%22__type%22:%22Pointer%22,%22className%22:%22' + 'subscribe' + '%22,%22objectId%22:%22' + objectid_subscribe + '%22%7D,%22key%22:%22seat%22%7D%7D',
                                                                            data: {},
                                                                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                                                            header: {
                                                                                "X-Bmob-Application-Id": "0d1ed0c20a6cc1c6b10cde2a190a5ead",
                                                                                "X-Bmob-REST-API-Key": "771ecd97226b4eec23ed39eece1a37e3"
                                                                            }, // 设置请求的 header
                                                                            success: function (res) {
                                                                                // success
                                                                                console.log(res.data.results[0])
                                                                                console.log("bbb " + res.data.results.length + " 条记录");
                                                                                console.log(res.data.results[0].objectId);
                                                                                objectid_seat = res.data.results[0].objectId;
                                                                                if (res.data.results[0].id == seatid) {
                                                                                    //修改appointseat
                                                                                    var query = new Bmob.Query(Appointseat);
                                                                                    query.get(objectid_appoint, {
                                                                                        success: function (result) {
                                                                                            result.set('status', '3');
                                                                                            // result.set('is_valid', '1');
                                                                                            result.save();
                                                                                        },
                                                                                        error: function (object, error) {
                                                                                        }
                                                                                    });
                                                                                    //修改subscribe
                                                                                    var query = new Bmob.Query(Subscribe);
                                                                                    query.get(objectid_subscribe, {
                                                                                        success: function (result) {
                                                                                            result.set('status', '0');
                                                                                            timestamp.getServerTime({
                                                                                                success: function (res) {
                                                                                                    // success
                                                                                                    var object = results[0];
                                                                                                    var starttime = new Date(res);
                                                                                                    result.set('starttime', starttime)
                                                                                                    result.save();
                                                                                                },
                                                                                                fail: function (res) {
                                                                                                    console.log(res)
                                                                                                }
                                                                                            })

                                                                                        },
                                                                                        error: function (object, error) {
                                                                                        }
                                                                                    });
                                                                                    //修改seat
                                                                                    var query = new Bmob.Query(Seat);
                                                                                    query.get(objectid_seat, {
                                                                                        success: function (result) {
                                                                                            var number = result.get('frequency')
                                                                                            result.set('status', '2');
                                                                                            result.save('frequency', number + 1);

                                                                                            // The object was retrieved successfully.
                                                                                        },
                                                                                        error: function (object, error) {

                                                                                        }
                                                                                    });
                                                                                    console.log("领取座位成功");
                                                                                }
                                                                                else {
                                                                                    console.log("去领取自己的座位");
                                                                                }
                                                                            },
                                                                            fail: function () {
                                                                                // fail
                                                                            },
                                                                            complete: function () {
                                                                                // complete
                                                                            }
                                                                        })
                                                                    },
                                                                    error: function (error) {
                                                                        console.log("查询失败: " + error.code + " " + error.message);
                                                                    }
                                                                })

                                                            }
                                                            else {
                                                                console.log("没有预约过");
                                                                var query = new Bmob.Query(Subscribe);
                                                                query.equalTo("publisher", user);
                                                                query.equalTo("endstatus", "0");
                                                                query.find({
                                                                    success: function (results) {
                                                                        console.log("共查询到 " + results.length + " 条记录");
                                                                        // 循环处理查询到的数据
                                                                        if (results.length > 0) {
                                                                            console.log("你有正在使用的座位，不能预约");
                                                                        }
                                                                        else {
                                                                            console.log("有权领取座位");
                                                                            var query = new Bmob.Query(Seat);
                                                                            query.equalTo("id", seatid)
                                                                            query.find({
                                                                                success: function (results) {
                                                                                    objectid_seat = results[0].id;
                                                                                    if (results[0].get("status") == "0") {
                                                                                        console.log("座位领取成功");
                                                                                        //修改seat
                                                                                        var query = new Bmob.Query(Seat);
                                                                                        query.get(objectid_seat, {
                                                                                            success: function (result) {
                                                                                                var number = result.get('frequency')
                                                                                                result.set('status', '2');
                                                                                                result.save('frequency', number + 1);

                                                                                                // The object was retrieved successfully.
                                                                                            },
                                                                                            error: function (object, error) {

                                                                                            }
                                                                                        });
                                                                                        //新建subscribe
                                                                                        var subscribe = new Subscribe();
                                                                                        subscribe.set("status", "0");
                                                                                        subscribe.set("endstatus", "0");
                                                                                        subscribe.save(null, {
                                                                                            success: function (result) {
                                                                                                // 添加成功，返回成功之后的objectId
                                                                                                console.log("subscribe创建成功, objectId:" + result.id);
                                                                                                var userrel = Bmob.Object.createWithoutData("_User", user.id);
                                                                                                var seatrel = Bmob.Object.createWithoutData("seat", objectid_seat);
                                                                                                var relation = subscribe.relation("publisher");
                                                                                                relation.add(userrel);
                                                                                                subscribe.save();
                                                                                                var relation = subscribe.relation("seat");
                                                                                                relation.add(seatrel);
                                                                                                subscribe.save();
                                                                                            },
                                                                                            error: function (result, error) {
                                                                                                // 添加失败
                                                                                                console.log('subscribe创建失败');

                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        console.log("该座位不能使用")
                                                                                        if (results[0].get("status") == "1") {
                                                                                            console.log("已被预约");
                                                                                        }
                                                                                        else if (results[0].get("status") == "2" || "3") {
                                                                                            console.log("正在使用");
                                                                                        }
                                                                                        else if (results[0].get("status") == "4") {
                                                                                            console.log("座位禁用");
                                                                                        }

                                                                                    }
                                                                                },
                                                                                error: function (error) {
                                                                                    console.log("查询失败: " + error.code + " " + error.message);
                                                                                }
                                                                            });
                                                                        }
                                                                    },
                                                                    error: function (error) {
                                                                        console.log("查询失败: " + error.code + " " + error.message);
                                                                    }
                                                                });
                                                            }
                                                        },
                                                        error: function (error) {
                                                            console.log("查询失败: " + error.code + " " + error.message);
                                                        }
                                                    })
                                                }
                                                else {
                                                    console.log("请去刷卡");
                                                }
                                            },
                                            fail: function (res) {
                                                console.log(res)
                                            }
                                        })
                                    },
                                    error: function (object, error) {
                                        // 查询失败
                                    }
                                });



                            }
                            else {
                                console.log("违规超过2次已被禁用");
                            }
                        },
                        error: function (object, error) {
                            // 查询失败
                        }
                    });

                }
                else {
                    console.log("去认证");
                }
            },
            error: function (object, error) {
                // 查询失败
            }
        });

    }
}

for (var i = 0; i < types.length; ++i) {
    (function (type) {
        pageObject[type] = function (e) {
            var key = type + 'Size'
            var changedData = {}
            changedData[key] =
                this.data[key] === 'default' ? 'mini' : 'default'
            this.setData(changedData)
        }
    })(types[i])
}
Page(pageObject)