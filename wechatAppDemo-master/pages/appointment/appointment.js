var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var timestamp = require('../../utils/timestamp.js')
var app = getApp()
var seatid = 2;//该变量对应点击选座
var objectid_appoint;
var objectid_seat;
var types = ['default', 'primary', 'warn']
var pageObject = {
  appoint: function () {
    common.showTip("appointment", "loading");
    var myDate = new Date();
    var User = Bmob.Object.extend("_User");
    var Appointseat = Bmob.Object.extend("appointseat");
    var Subscribe = Bmob.Object.extend("subscribe");
    var Seat = Bmob.Object.extend("seat");
    var user = Bmob.User.current();
    var query = new Bmob.Query(User);
    query.get(user.id, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        if (result.get("emailVerified") == true) {
          console.log("email认证通过");
          query.get(user.id, {
            success: function (result) {
              // 查询成功，调用get方法获取对应属性的值
              if (result.get('violation') < 3) {
                console.log("可使用系统");
                timestamp.getServerTime({
                  success: function (res) {
                    // success
                    var date = new Date(res);
                    var query = new Bmob.Query(Appointseat);
                    var datestart = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 0:0:0")
                    var dateend = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) + " 0:0:0")
                    query.equalTo("createdAt", { "$lt": dateend, "$gte": datestart })
                    query.equalTo("user", user)
                    query.find({
                      success: function (results) {
                        console.log("共查询到 " + results.length + " 条记录");
                        // 循环处理查询到的数据
                        var count0 = 0;
                        var count1 = 0;
                        for (var i = 0; i < results.length; i++) {
                          var object = results[i];
                          console.log(object.id + ' - ' + object.get("status"))
                          if (object.get("status") == "0") {
                            // console.log('c0' + count0)
                            count0++;
                          }
                          if (object.get("status") == "1") {
                            // console.log('c1' + count1)
                            count1++;
                          }
                        }
                        //todo
                        if (count0 > 0) {
                          console.log("已预约过");
                        }
                        else {
                          console.log("未预约过");
                          if (count1 > 1) {
                            console.log("已取消两次，今日不能预约");
                          }
                          else {
                            console.log("预约状态验证通过");
                            var query = new Bmob.Query(Subscribe)
                            query.equalTo("publisher", user)
                            query.find({
                              success: function (results) {
                                console.log("Total:" + results.length + "records.")
                                var count0 = 0;
                                for (var i = 0; i < results.length; i++) {
                                  var object = results[i];
                                  console.log(object.id + ' - ' + object.get("endstatus"))
                                  if (object.get("endstatus") == "0") {
                                    count0++;
                                    if (object.get("status") == "0" || "2") {
                                      console.log("你已经有座位");
                                    }
                                    if (object.get("status") == "1") {
                                      console.log("你已预约过座位")
                                    }
                                  }
                                }
                                if (count0 == 0) {
                                  console.log("可以选座");
                                  //与选座操作相关
                                  var query = new Bmob.Query(Seat)
                                  query.equalTo("id", seatid)
                                  query.find({
                                    success: function (result) {
                                      objectid_seat = result[0].id;
                                      console.log("Total:" + result.length + "records.");
                                      if (result[0].get("status") != "0") {
                                        console.log("不能预约");
                                      }
                                      else {
                                        console.log("该座位能预约");
                                        //修改seat
                                        // var query = new Bmob.Query(Seat);
                                        // query.get(objectid_seat, {
                                        //   success: function (result) {
                                        //     result.set('statu', '1');
                                        //     result.save();
                                        //   },
                                        //   error: function (object, error) {

                                        //   }
                                        // });
                                        //新建appointseat
                                        var appoint = new Appointseat();
                                        appoint.set("user", user);
                                        appoint.set("status", "0");
                                        // appoint.set("is_valid", "0");
                                        appoint.save(null, {
                                          success: function (result) {
                                            // 添加成功，返回成功之后的objectId
                                            objectid_appoint = result.id;
                                            console.log("appointseat创建成功, objectId:" + result.id);
                                            //新建subscribe
                                            var subscribe = new Subscribe();
                                            subscribe.set("status", "1");
                                            subscribe.set("endstatus", "0");
                                            var myappointseat = new Appointseat();
                                            myappointseat.id = objectid_appoint;
                                            subscribe.set("appoint", myappointseat);
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
                                          },
                                          error: function (result, error) {
                                            // 添加失败
                                            console.log('appiontseat创建失败');

                                          }
                                        });
                                        //修改seat
                                        var query = new Bmob.Query(Seat);
                                        query.get(objectid_seat, {
                                          success: function (seat) {
                                            seat.set('status', '1');
                                            seat.save();
                                          },
                                          error: function (object, error) {

                                          }
                                        });
                                      }
                                    }
                                  })
                                }
                              }
                            })
                          }

                        }

                      },
                      error: function (error) {
                        console.log("查询失败: " + error.code + " " + error.message);
                      }
                    });
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })
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