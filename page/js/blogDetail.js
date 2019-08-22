var blogDetail = new Vue({
    el:"#blog_detail",
    data:{
        title:"",
        content:"",
        ctime:"",
        tags:"",
        views:""
    },
    computed:{

    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if(searchUrlParams == ""){
            return;
        }
        var bid = -1;
        for(var i = 0; i < searchUrlParams.length; i ++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method:"get",
            url:"/queryBlogById?bid=" + bid
        }).then(function(resp){
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(function(resp){
            console.log("请求失败");
        })
    }
})

var sendComment = new Vue({
    el:"#send_comment",
    data:{
        vcode:"",
        rightCode:""
    },
    computed:{
        changeCode:function(){
            return function(){

                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function(resp){
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                }).catch(function(resp){
                    console.log(resp);
                })
            }
        },
        sendComment:function(){
            return function(){

                var code = document.getElementById("comment_code").value;
                if(code != sendComment.rightCode){
                    alert("验证码有误！");
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if(searchUrlParams == ""){
                    return;
                }
                var bid = -1;
                for(var i = 0; i < searchUrlParams.length; i ++){
                    if(searchUrlParams[i].split("=")[0] == "bid"){
                        try {
                            bid = searchUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
                var replay = document.getElementById("comment_replay").value;
                var replayName = document.getElementById("comment_replay_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method:"get",
                    url:"/addComment?bid=" + bid + "&parent=" + replay + "&userName=" + name + "&email=" + email + "&comments=" + content + "&parentName=" + replayName
                }).then(function(resp){
                    alert(resp.data.msg);
                    location.reload();
                }).catch(function(resp){
                    console.log(resp);
                })
            }
        }
    },
    created(){
this.changeCode();
    }
})

var blogComment = new Vue({
    el:"#blog_comments",
    data:{
        total:0,
        comments:[]
    },
    computed:{
reply:function(){
    return function(commentId, userName){
        document.getElementById("comment_replay").value = commentId;
        document.getElementById("comment_replay_name").value = userName;
        location.href = "#send_comment";
    }
}
    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if(searchUrlParams == ""){
            return;
        }
        var bid = -10;
        for(var i = 0; i < searchUrlParams.length; i ++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try {
                    bid = searchUrlParams[i].split("=")[1];
                }catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method:"get",
            url:"/queryCommentsByBlogId?bid=" + bid
        }).then(function(resp){
            blogComment.comments = resp.data.data;
            for(var i = 0; i < blogComment.comments.length; i ++){
                if(blogComment.comments[i].parent > -1){
                    blogComment.comments[i].options = "回复@" + blogComment.comments[i].parent_name;
                }
            }
        })
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid=" + bid
        }).then(function(resp){
            blogComment.total = resp.data.data[0].count;
        })
    }
})