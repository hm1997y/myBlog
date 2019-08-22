var dbutil = require("./DBUtil");


function queryHotComments(size, success){
    var queryHotCommentsSql = "select * from comments order by id desc limit ?;";
    var params = [size];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryHotCommentsSql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function addComment(blogId, parent, parentName, userName, comments, email, ctime, utime, success){
var params = [blogId, parent, parentName, userName, comments, email, ctime, utime];
var addCommentSql = "insert into comments (blog_id, parent, parent_name, user_name, comments, email, ctime, utime) values(?, ?, ?, ?, ?, ?, ?, ?);";
var connection = dbutil.createConnection();
connection.connect();
connection.query(addCommentSql, params, function (error, result) {
    if(error == null){
        success(result)
    }else{
        console.log(error);
    }


})
    connection.end();
}


function queryCommentsByBlogId(blogId, success){
var queryCommentsByBlogIdSql = "select * from comments where blog_id = ?;";
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryCommentsByBlogIdSql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentsCountByBlogId(blogId, success){
    var queryCommentsCountByBlogIdSql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryCommentsCountByBlogIdSql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

module.exports.addComment = addComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryHotComments = queryHotComments;