var everyDayDao = require("../dao/EveryDayDao");
var timeUtil = require("../utils/TimeUtil");
var respUtil = require("../utils/RespUtil");
var path = new Map();
function editEveryDay(request, response){
    request.on("data", function(data){
        // console.log(data.toString().trim());
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        })
    })
}
path.set("/editEveryDay", editEveryDay);

function queryEveryDay(request, response){

        // console.log(data.toString().trim());
        everyDayDao.queryEveryDay(function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
        })

}
path.set("/queryEveryDay", queryEveryDay);
module.exports.path = path;