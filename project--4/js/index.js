window.onload = function(){
    imgLocation();

    // 滚动加载的图片数据
    var dataImg = {"data": [{"src": "3.jpg"},{"src": "2.jpg"},{"src": "7.jpg"},{"src": "4.jpg"},{"src": "5.jpg"}]};

    window.onscroll = function(){
        // 创建div、加载img
        var wrap = document.getElementById("wrap");
        if(scrollSide()){
            for(var i=0; i<dataImg.data.length; i++){
                var box = document.createElement("div");
                box.className = "box";
                wrap.appendChild(box);
                var content = document.createElement("div");
                content.className = "content";
                box.appendChild(content);
                var img = document.createElement("img");
                img.src = "images/" + dataImg.data[i].src;
                content.appendChild(img);
            }
            imgLocation();
        }
    };
}

function imgLocation(){
    var wrap = document.getElementById("wrap");
    var boxs = document.querySelectorAll(".box");
    var boxWidth = boxs[0].offsetWidth;
    // 获取屏幕一行可以摆放的图片张数
    var num = Math.floor(document.documentElement.clientWidth / boxWidth);
    // 居中显示图片
    wrap.style.cssText = "width:" +boxWidth*num+ "px; margin: 0 auto;";

    var boxArr = [];
    for(var i=0; i<boxs.length; i++){
        var boxHeight = boxs[i].offsetHeight;
        if(i < num){
            boxArr[i] = boxHeight;
        }else{
            // 获取一行中高度最小的图片
            var minBoxHeight = Math.min.apply(null, boxArr);
            var minBoxIndex = getMinIndex(boxArr, minBoxHeight);
            boxs[i].style.position = "absolute";
            boxs[i].style.top = minBoxHeight + "px";
            boxs[i].style.left = boxs[minBoxIndex].offsetLeft + "px";
            //最小高度下方已摆放了图片，更新此处的高度
            boxArr[minBoxIndex] += boxs[i].offsetHeight;
        }
    }
}

// 获取高度最小的图片的索引
function getMinIndex(arr, minH){
    for(var i in arr){
        if(arr[i] == minH){
            return i;
        }
    }
}

function scrollSide(){
    var boxs = document.querySelectorAll(".box");
    // 倒数第二张图片到窗口最顶部的高度
    var lastBoxHeight = boxs[boxs.length-1].offsetTop;
    // 浏览器显示区域的高度
    var documentHeight = document.documentElement.clientHeight;
    // 滚动条到顶部的高度
    var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    return (lastBoxHeight < scrollHeight + documentHeight ? true: false);
}
