var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:""
    },
    computed:{
        getContent:function(){
            return this.content;
        }
    },
    created(){
axios({
method:"get",
    url:"/queryEveryDay"
}).then(function(resp){
    everyDay.content = resp.data.data[0].content;
}).catch(function(resp){
    console.log(resp);
})
    }
});
var articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        count:null,
        pageNumList:[],
        articleList:[]
    },
    computed:{
        jumpTo:function(){
            return function(page){
                console.log(page, "jump");
                this.getPage(page, this.pageSize);
            }
        },
getPage: function(){
    return function(page, pageSize){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        // if(searchUrlParams == ""){
        //     return;
        // }
        var tag = "";
        for(var i = 0; i < searchUrlParams.length; i ++){
            if(decodeURI(searchUrlParams[i].split("=")[0]) == "tag"){
                try {
                    tag = searchUrlParams[i].split("=")[1];
                }catch (e) {
                    console.log(e)
                }
            }
        }
        var keyWord = "";
        for(var i = 0; i < searchUrlParams.length; i ++){
            if(decodeURI(searchUrlParams[i].split("=")[0]) == "keyWord"){
                try {
                    keyWord = decodeURI(searchUrlParams[i].split("=")[1]);

                }catch (e) {
                    console.log(e)
                }
            }
        }
        if(tag == "" && keyWord == ""){
            axios({
                method:"get",
                url:"/queryBlogByPage?page=" + (page-1) + "&pageSize=" + pageSize
            }).then(function(resp){
                var result = resp.data.data;
                for(var i = 0; i < result.length; i ++){
                    result[i].link = "/blogDetail.html?bid=" + result[i].id;
                }
                articleList.articleList = result;
                this.page = page;
            }).catch(function(resp){
                console.log("请求错误");
            });
            axios({
                method:"get",
                url:"/queryBlogCount"
            }).then(function(resp){
                articleList.count = resp.data.data[0].count;
                articleList.generatePageTool;
            }).catch(function (resp) {
                console.log("请求错误");
            })
        }else if(tag == "" && keyWord != ""){
            axios({
                mehtod:"get",
                url:"/searchBlog?page=" + (page-1) + "&pageSize=" + pageSize  + "&keyWord=" + keyWord

            }).then(function(resp){
                articleList.articleList = resp.data.data;
                articleList.count = resp.data.data.length;
                articleList.generatePageTool;
            })
        }
        else{


            axios({
                method:"get",
                url:"/queryByTag?page=" + (page-1) + "&pageSize=" + pageSize + "&tag=" + tag
            }).then(function(resp){
                var result = resp.data.data;
                for(var i = 0; i < result.length; i ++){
                    result[i].link = "/blogDetail.html?bid=" + result[i].id;
                }
                articleList.articleList = result;
                this.page = page;
            }).catch(function(resp){
                console.log("请求错误");
            });
            axios({
                method:"get",
                url:"/queryByTagCount?tag=" + tag
            }).then(function(resp){
                articleList.count = resp.data.data[0].count;
                articleList.generatePageTool;
            }).catch(function (resp) {
                console.log("请求错误");
            })
        }


    }
},
        generatePageTool:function(){
    var nowPage = this.page;
    var pageSize = this.pageSize;
    var count = this.count;
    var result = [];
    result.push({text:"<<", nowPage:1})
            if(nowPage > 2){
                result.push({text:nowPage - 2, nowPage:nowPage -2})
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1, nowPage:nowPage -1})
            }
            result.push({text:nowPage, nowPage:nowPage});
            if(nowPage + 1 <= (count + pageSize -1) / pageSize){
                result.push({text:nowPage + 1, pageSize: nowPage + 1})
            }
            if(nowPage + 2 <= (count + pageSize -1) / pageSize){
                result.push({text:nowPage + 2, pageSize: nowPage + 2})
            }
            result.push({text:">>", nowPage: parseInt((count +pageSize -1) / pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created(){
this.getPage(this.page, this.pageSize);
    }
})
var searchBar = new Vue({
    el:"#search_bar",
    data:{
        keyWord:""
    },
    computed:{
        searchWord:function(){
            var keyWord = document.getElementById("keyWord").value;
            searchBar.keyWord = keyWord;
            return function(keyWord){
                if(keyWord == ""){
                    return;
                }
                location.href = "/?keyWord=" + keyWord;
                    // axios({
                    //     mehtod:"get",
                    //     url:"/searchBlog?keyWord=" + keyWord
                    // }).then(function(resp){
                    //     console.log(resp,"resp");
                    // })
            }
        }
    },
    created(){

    }
})
