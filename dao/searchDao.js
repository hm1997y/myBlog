var dbutil = require("./DBUtil");
function searchBlog(keyWord, success){
var querySearchBlog = "select * from blog where content like '%' ? '%';";
     // var querySearchBlog = "select * from blog where content like \'%?%\';";
var params = [keyWord];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySearchBlog, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
module.exports.searchBlog = searchBlog;