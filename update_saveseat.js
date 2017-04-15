/**
 * Created by XX on 2017/4/15.
 */
function onRequest(request, response, modules) {
    var db = modules.oData;
    var rel = modules.oRelation;
    db.setHeader({"X-Bmob-Master-Key":"c8afc95b7f152950cb51efeffb738eba"});
    db.find({
        "table":"saveseat"
    },function(err,data){
        //将返回结果转换为Json对象
        var resultObject= JSON.parse(data);
        //遍历这个Json对象
        for(var results in resultObject) {
            var resultArr = resultObject[results];
            //遍历得到的每行结果
            for(var oneline in resultArr) {
                if(resultArr[oneline].status == 0) {
                    var objectid = resultArr[oneline].objectId;
                    if(resultArr[oneline].duration < (new Date().getTime() - new Date(resultArr[oneline].createdAt).getTime())/1000) {
                        db.update({
                            "table":"saveseat",
                            "objectId":objectid,
                            "data":{"status":"1","is_valid":false}
                        },function(err,data){
                            // response.send(objectid);
                        });
                    }
                    rel.query({
                        "table":"subscribe",
                        "where":{"save":{"__type":"Pointer","className":"saveseat","objectId":objectid}},
                    },function(err,data){
                        var resultObject= JSON.parse(data);
                        var resultArr = resultObject['results'];
                        for(var oneline in resultArr) {
                            if(resultArr[oneline].isvalid){
                                var objectid = resultArr[oneline].objectId;
                                db.update({
                                    "table":"subscribe",
                                    "objectId":objectid,
                                    "data":{"isvalid":false,"endstatus":"4"}
                                },function(err,data){
                                    // response.send(objectid);
                                })
                                rel.query({
                                    "table":"_User",
                                    "where":{"$relatedTo":{"object":{"__type":"Pointer","className":"subscribe","objectId":objectid},"key":"publisher"}},
                                },function(error,data){
                                    var resultObject= JSON.parse(data);
                                    var resultArr = resultObject['results'];
                                    var score;
                                    db.findOne({
                                        "table":"_User",
                                        "objectId":resultArr[0].objectId
                                    },function(err,data){
                                        var dataObject= JSON.parse(data);
                                        score = dataObject.score - 10;
                                        db.update({
                                            "table":"_User",
                                            "objectId":resultArr[0].objectId,
                                            "data":{"score":score}
                                        },function(err,data){
                                            // response.send(resultArr[0].objectId);
                                        })
                                    })

                                })

                                rel.query({
                                    "table":"seat",
                                    "where":{"$relatedTo":{"object":{"__type":"Pointer","className":"subscribe","objectId":objectid},"key":"seat"}},
                                },function(error,data){
                                    var resultObject= JSON.parse(data);
                                    var resultArr = resultObject['results'];
                                    var frequency;
                                    db.findOne({
                                        "table":"seat",
                                        "objectId":resultArr[0].objectId
                                    },function(err,data){
                                        var dataObject= JSON.parse(data);
                                        frequency = dataObject.frequency + 1;
                                        db.update({
                                            "table":"seat",
                                            "objectId":resultArr[0].objectId,
                                            "data":{"status":"0","frequency":frequency}
                                        },function(err,data){
                                            // response.send(frequency.toString());
                                            // response.send(resultArr[0].objectId);
                                            // response.send(frequency.toString());
                                        })
                                    })

                                })
                            }

                        }
                    });
                }
            }
        }
    });
}