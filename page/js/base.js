var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
    },
    computed:{
randomColor:function(){
    return function(){
        var red = Math.random() * 255 + 20;
        var green = Math.random() * 255 + 20;
        var blue = Math.random() * 255 + 20;
        return "rgb(" + red + "," + green + "," + blue + ")";
    }
    },
        randomSize:function() {
            return function () {
                var size = (Math.random() * 20 + 12) + "px";
                return size;
            }
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function(resp){
            var result = [];
            for(var i = 0; i < resp.data.data.length; i ++){
                result.push({text:resp.data.data[i].tag,link:"/?tag=" + resp.data.data[i].tag });
            }
            randomTags.tags = result;
        })
    }

})

var newHot = new Vue({
    el:"#new_hot",
    data:{
        hotList:[]
    },
    created(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(resp){
            newHot.hotList = resp.data.data;
            for(var i = 0; i < newHot.hotList.length; i ++){
                newHot.hotList[i].link = "/blogDetail.html?bid=" + newHot.hotList[i].id;
            }

        })
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentsList:[]
    },
    created(){
        axios({
            method:"get",
            url:"/queryHotComments"
        }).then(function(resp){
            newComments.commentsList = resp.data.data;
        })
    }
})