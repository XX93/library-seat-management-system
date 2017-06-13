function getServerTime({success, fail}) {
    wx.request({
        url: 'https://api.bmob.cn/1/timestamp',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "X-Bmob-Application-Id": "0d1ed0c20a6cc1c6b10cde2a190a5ead",
            "X-Bmob-REST-API-Key": "771ecd97226b4eec23ed39eece1a37e3"
        }, // 设置请求的 header
        success: function (res) {
            // success
            var timestamp = new Date(res.data.datetime);
            success(timestamp)
        },
        fail: function () {
            // fail
            fail('Getting Server Time Error!')
        },
        complete: function () {
            // complete
        }
    })
}
module.exports = {
  getServerTime: getServerTime
}