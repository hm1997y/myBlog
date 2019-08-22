var blogList = new Vue({
    el:"#blog_list",
    data:{
        blogList:[]
    },
    computed:{

    },
    created(){
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then(function(resp){
            blogList.blogList = resp.data.data;
            for(var i = 0;i < blogList.blogList.length; i ++){
                blogList.blogList[i].link = "/blogDetail.html?bid=" + blogList.blogList[i].id;
            }
        })
    }
})