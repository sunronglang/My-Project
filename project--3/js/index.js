$(function(){
    $(window).on("load", function(){
        imgLocation();

        // 滚动加载的图片数据
        var dataImg = {"data": [{"src":"3.jpg"},{"src":"2.jpg"},{"src":"7.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
        window.onscroll = function(){
            // 创建div、加载img
            if(scrollSide()){
                $.each(dataImg.data, function(index, value){
                    var box = $("<div>").addClass("box").appendTo("#wrap");
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "images/" + $(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
    });
})

function imgLocation(){
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    // 获取屏幕一行可以摆放的图片张数
    var num = Math.floor($(window).width() / boxWidth);
    // 居中显示图片
    $("#wrap").css({
        "width": boxWidth * num + "px",
        "margin": "0 auto"
    });

    var boxArr = [];
    box.each(function(index, value){
        var boxHeight = box.eq(index).height();
        if(index < num){
            boxArr[index] = boxHeight;
        }else{
            // 获取一行中高度最小的图片
            var minBoxHeight = Math.min.apply(null, boxArr);
            var minBoxIndex = $.inArray(minBoxHeight, boxArr);

            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left
            });

            //最小高度下方已摆放了图片，更新此处的高度
            boxArr[minBoxIndex] += box.eq(index).height();
        }
    });
}

function scrollSide(){
    var box = $(".box");
    // 倒数第二张图片到窗口最顶部的高度
    var lastBoxHeight = box.last().get(0).offsetTop;
    // 浏览器显示区域的高度
    var documentHeight = $(window).height();
    // 滚动条到顶部的高度
    var scrollHeight = $(window).scrollTop();
    return (lastBoxHeight < scrollHeight + documentHeight ? true : false);
}
