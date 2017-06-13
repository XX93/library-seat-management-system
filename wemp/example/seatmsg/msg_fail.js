var failstatus = [
  {"status":"11","text":"预约失败","reason":"您尚未绑定学生卡，请先验证学生信息"},
  {"status":"12","text":"预约失败","reason":"位置被别人先占了哦，试试换一个吧"},
  {"status":"13","text":"预约失败","reason":"您已经有座位了，不能重复预约哦"},
  {"status":"14","text":"预约失败","reason":"您的信用分过低，暂不支持预约功能"},
  {"status":"15","text":"退座失败","reason":"您没有座位，不需要退座"},
  {"status":"16","text":"无法暂离","reason":"您没有座位，无法暂离"},
  {"status":"17","text":"无法暂离","reason":"您已暂离过，你的回收时间点为"},
  {"status":"18","text":"占座失败","reason":"这个位置已经有人了，换一个试试吧"},
  {"status":"19","text":"占座失败","reason":"你已经有位置了，不能重复占座哦"},
  {"status":"20","text":"占座失败","reason":"您的信用分过低，无法占座"},
  {"status":"21","text":"占座失败","reason":"请先打开蓝牙才能进行占座"},
  {"status":"22","text":"占座失败","reason":"别以为我不知道，你没在现场吧"},
  {"status":"23","text":"签到失败","reason":"您的信用分过低，无法签到"},
  {"status":"24","text":"签到失败","reason":"请先打开蓝牙才能进行签到"},
  {"status":"25","text":"签到失败","reason":"别以为我不知道，你没在现场吧"},
  {"status":"26","text":"签到失败","reason":"跑错位置了，解锁路痴成就"},
  {"status":"27","text":"无法举报","reason":"请先打开蓝牙才能进行举报"},
  {"status":"28","text":"无法举报","reason":"对方正处于暂离状态，无法举报"},
  {"status":"29","text":"无法举报","reason":"改座位正处于预约状态，无法举报"}
];
Page({
    data:{
        failstatus:failstatus,
    },
    onLoad: function(options) {
        this.setData({
            statusid: options.statusid
        })
    },
    returnBack: function () {
        wx.navigateBack({
            delta:1
        })
    }
});