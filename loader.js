var fs = require("fs");
var globConfig = require("./config");
var controllerset = [];
var pathMap = new Map();
var files = fs.readdirSync(globConfig["web_path"]);
for(var i = 0; i < files.length; i ++){
    var temp = require("./" + globConfig["web_path"] + "/" + files[i]);
    // console.log(temp);
    if(temp.path){
        for(var [key, value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key, value);
            }else{
                throw new Error("url path 异常")
            }
        }
        controllerset.push(temp);
    }
}
module.exports = pathMap;