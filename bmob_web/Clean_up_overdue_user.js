function onRequest(request, response, modules) {
    var db = modules.oData;
    db.setHeader({"X-Bmob-Master-Key":"c8afc95b7f152950cb51efeffb738eba"});
    db.find({
        "table":"_User"
    },function(err,data){
        //将返回结果转换为Json对象
        var resultObject= JSON.parse(data);
        //遍历这个Json对象
        for(var results in resultObject)
        {
            var resultArr = resultObject[results];
            //遍历得到的每行结果
            for(var oneline in resultArr){
                if(!resultArr[oneline].sid){
                    var tmpDate = resultArr[oneline].emailsentAt;
                    var objectid = resultArr[oneline].objectId;
                    var duration = (new Date().getTime() - new Date(tmpDate.iso).getTime())/1000;
                    if(duration > 300){
                        db.removeUserByObjectId({
                            "objectId":objectid        //记录的objectId
                        },function(err,data){         //回调函数
                        });
                    }
                }
            }
        }
    });
}