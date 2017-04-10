var statusid=11;//代表了当前该座位的状态
var seatindex;
var seat = new Array();
// for (seatindex=1;seatindex<100;seatindex++){
//     seat[seatindex].id=seatindex;
//     if(seatindex<20){
//         seat[seatindex].status=1;
//     }else if(seatindex<40){
//         seat[seatindex].status=2;
//     }else if(seatindex<60){
//         seat[seatindex].status=3;
//     }else if(seatindex<80){
//         seat[seatindex].status=4;
//     }else{
//         seat[seatindex].status=5;
//     }
// }
// document.write(seat);
function fix(num, length) {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
};
for (seatindex=0;seatindex<25;seatindex++){
    if(seatindex<5){
        seat[seatindex]={"id":fix(seatindex,3),"status":"1"};
    }else if(seatindex<10){
        seat[seatindex]={"id":fix(seatindex,3),"status":"2"};
    }else if(seatindex<15){
        seat[seatindex]={"id":fix(seatindex,3),"status":"3"};
    }else if(seatindex<20){
        seat[seatindex]={"id":fix(seatindex,3),"status":"4"};
    }else{
        seat[seatindex]={"id":fix(seatindex,3),"status":"5"};
    }
}
Page({
    data:{
        seat:seat
    },
    onLoad: function(options) {
        this.setData({
            statusid: options.statusid
        })
    },
    openConfirm: function () {
        wx.showModal({
            title: '温馨提示',
            content: '您确定要预定图书馆座位吗',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    if (statusid==0){
                        wx.redirectTo({
                            url: '../seatmsg/msg_success?statusid=1'
                        })
                    }else{
                        wx.redirectTo({
                            url: '../seatmsg/msg_fail?statusid=' + statusid
                        })
                    }                    
                }else{
                    console.log('用户点击取消操作')
                }
            }
        });
    },
});