var quitid = 2;
var saveid = 3;
var occupyid = 4;
var checkinid = 5;
var reportid = 6;
// var status = [
//   {"status":"1","text":"预约成功","reason":"请于以下时间点到现场签到"},
//   {"status":"2","text":"退座成功","reason":"个人信用分+10，学习时长为"},
//   {"status":"3","text":"暂离成功","reason":"请于以下时间点亲自到场签到"},
//   {"status":"4","text":"现场占座成功","reason":"我爱学习，学习使我快乐"},
//   {"status":"5","text":"签到成功","reason":"我爱学习，学习使我快乐"},
//   {"status":"6","text":"举报成功","reason":"感谢您的反馈，我们以向该用户发送提示短信，15min后若该用户未返回，你能使用该座位"},
//   {"status":"11","text":"预约失败","reason":"您尚未绑定学生卡，请先验证学生信息"},
//   {"status":"12","text":"预约失败","reason":"位置被别人先占了哦，试试换一个吧"},
//   {"status":"13","text":"预约失败","reason":"您已经有座位了，不能重复预约哦"},
//   {"status":"14","text":"预约失败","reason":"您的信用分过低，暂不支持预约功能"},
//   {"status":"15","text":"退座失败","reason":"您没有座位，不需要退座"},
//   {"status":"16","text":"无法暂离","reason":"您没有座位，无法暂离"},
//   {"status":"17","text":"无法暂离","reason":"您已暂离过，你的回收时间点为"},
//   {"status":"18","text":"占座失败","reason":"这个位置已经有人了，换一个试试吧"},
//   {"status":"19","text":"占座失败","reason":"你已经有位置了，不能重复占座哦"},
//   {"status":"20","text":"占座失败","reason":"您的信用分过低，无法占座"},
//   {"status":"21","text":"占座失败","reason":"请先打开蓝牙才能进行占座"},
//   {"status":"22","text":"占座失败","reason":"别以为我不知道，你没在现场吧"},
//   {"status":"23","text":"签到失败","reason":"您的信用分过低，无法签到"},
//   {"status":"24","text":"签到失败","reason":"请先打开蓝牙才能进行签到"},
//   {"status":"25","text":"签到失败","reason":"别以为我不知道，你没在现场吧"},
//   {"status":"26","text":"签到失败","reason":"跑错位置了，解锁路痴成就"},
//   {"status":"27","text":"无法举报","reason":"请先打开蓝牙才能进行举报"},
//   {"status":"28","text":"无法举报","reason":"对方正处于暂离状态，无法举报"},
//   {"status":"29","text":"无法举报","reason":"改座位正处于预约状态，无法举报"},
// ];
var grids = [
   {"name":"占座","ico":"sms.png","url":"../room/room"},
   {"name":"退座","ico":"pic.png","function":"quitConfirm"},
   {"name":"暂离","ico":"autologin.png","function":"saveConfirm"},
   {"name":"现抢","ico":"openid.png","function":"occupyScan"},
   {"name":"签到","ico":"pay.png","function":"checkinScan"},
   {"name":"举报","ico":"code.png","function":"reportConfirm"}, 
];

Page({
  data: {
    image: { 
      mode: 'aspectFit',
      src: '../../image/dada/0.jpg',
      text: '使用前请先绑定学生卡，并打开蓝牙'
    },
    grids: grids
  },
  quitConfirm: function () {
      wx.showModal({
          title: '温馨提示',
          content: "您确定要退座吗,你本次的学习时间为1小时",
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              console.log(res);
              if (res.confirm) {
                  if (quitid<=10){
                      wx.redirectTo({
                          url: '../seatmsg/msg_success?statusid=' + quitid
                      })
                  }else{
                      wx.redirectTo({
                          url: '../seatmsg/msg_fail?statusid=' + quitid
                      })
                  }                    
              }else{
                  console.log('用户点击取消操作')
              }
          }
      });
  },
  saveConfirm: function () {
      wx.showModal({
          title: '温馨提示',
          content: "您确定要离开吗，我们将为您保留座位15分钟，请及时签到",
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              console.log(res);
              if (res.confirm) {
                  if (saveid<=10){
                      wx.redirectTo({
                          url: '../seatmsg/msg_success?statusid=' + saveid
                      })
                  }else{
                      wx.redirectTo({
                          url: '../seatmsg/msg_fail?statusid=' + saveid
                      })
                  }                    
              }else{
                  console.log('用户点击取消操作')
              }
          }
      });
  },
  reportConfirm: function () {
      wx.showModal({
          title: '温馨提示',
          content: "您确定要举报吗，我们以向该用户发送提示短信，15min后若该用户未返回，你能使用该座位",
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              console.log(res);
              if (res.confirm) {
                  if (reportid<=10){
                      wx.redirectTo({
                          url: '../seatmsg/msg_success?statusid=' + reportid
                      })
                  }else{
                      wx.redirectTo({
                          url: '../seatmsg/msg_fail?statusid=' + reportid
                      })
                  }                    
              }else{
                  console.log('用户点击取消操作')
              }
          }
      });
  },
  occupyScan: function () {
      wx.scanCode({
          success: function (res) {
              console.log(res);
              if (occupyid<=10){
                  wx.redirectTo({
                      url: '../seatmsg/msg_success?statusid=' + occupyid
                  })
              }else{
                  wx.redirectTo({
                      url: '../seatmsg/msg_fail?statusid=' + occupyid
                  })
              }                    
          }
      });
  },
  checkinScan: function () {
      wx.scanCode({
          success: function (res) {
              console.log(res);
              if (checkinid<=10){
                  wx.redirectTo({
                      url: '../seatmsg/msg_success?statusid=' + checkinid
                  })
              }else{
                  wx.redirectTo({
                      url: '../seatmsg/msg_fail?statusid=' + checkinid
                  })
              }                    
          }
      });
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  }
})