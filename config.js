var fs = require("fs");
var globConfig = {};
var conf = fs.readFileSync("./server.conf");
var confArr = conf.toString().split("\n");

for(var i = 0; i < confArr.length; i ++ ){
    globConfig[confArr[i].split("=")[0].trim()] = confArr[i].split("=")[1].trim();
}

module.exports = globConfig;
