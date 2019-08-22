var commentDao = require("../dao/CommentDao");
var timeUtil = require("../utils/TimeUtil");
var respUtil = require("../utils/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");
var path = new Map();

function queryHotComments(request, response){
    commentDao.queryHotComments(5, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryHotComments", queryHotComments);

function addComment(request, response){
var params = url.parse(request.url, true).query;
commentDao.addComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.comments, params.email, timeUtil.getNow(), timeUtil.getNow(), function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", null));
    response.end();
})
}
path.set("/addComment", addComment);


function queryRandomCode(request, response){
    var img = captcha.create({fontSize: 50,width:100, height:40,lineHeight:40,paddingTop:10 });
    console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response){
    var params = url.parse(request.url, true).query;
commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
})
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);


function queryCommentsCountByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);
module.exports.path = path;