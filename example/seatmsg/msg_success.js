var successstatus = [
  {"status":"1","text":"预约成功","reason":"请于以下时间点到现场签到"},
  {"status":"2","text":"退座成功","reason":"个人信用分+10，学习时长为"},
  {"status":"3","text":"暂离成功","reason":"请于以下时间点亲自到场签到"},
  {"status":"4","text":"现场占座成功","reason":"我爱学习，学习使我快乐"},
  {"status":"5","text":"签到成功","reason":"我爱学习，学习使我快乐"},
  {"status":"6","text":"举报成功","reason":"感谢您的反馈，我们以向该用户发送提示短信，15min后若该用户未返回，你能使用该座位"}
];
Page({
    data:{
        successstatus:successstatus,
    },
    returnBack: function () {
        wx.switchTab({
            url: '../occupy/occupy'
        })
    },
    onLoad: function(options) {
        this.setData({
            statusid: options.statusid
        })
    }
});