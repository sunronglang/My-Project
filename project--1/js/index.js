window.onload = function() {
    sidebar();
    home();
    accordion("accordion");
    content();
}

// 侧边栏
function sidebar() {
    // 获取head_nav下的所有span标签
    var spans = document.querySelectorAll(".head_nav li span");

    for (var i = 0; i < spans.length; i++) {
        spans[i].flag = i;

        spans[i].onclick = function() {
            // 未点击时i已经为循环结束了，所以需要再加一个for循环来逐个清除样式
            for (var j = 0; j < spans.length; j++) {
                // 修改的是内联样式
                spans[j].style.background = "";
                spans[j].style.marginTop = "";
            }

            // 点击span添加样式
            this.style.background = "#FFD204";
            this.style.marginTop = "0px";

            //切换显示页面
            $(".BOX").addClass("box");
            $(".BOX").removeClass("selectAll");
            switch (this.flag) {
                case 0:
                    $(".home").removeClass("box");
                    document.body.style.overflow = "hidden";
                    var currentWidth = $(window).width() - 290;
                    $(".home_div").width(currentWidth);
                    break;
                case 1:
                    $(".msg").removeClass("box");
                    document.body.style.overflow = "auto";
                    var currentWidth = $(window).width() - 290;
                    $(".msg_div").width(currentWidth);
                    break;
                case 2:
                    $(".project").removeClass("box");
                    document.body.style.overflow = "auto";
                    var currentWidth = $(window).width() - 290;
                    $(".project_div").width(currentWidth);
                    break;
                case 3:
                    $(".photo").removeClass("box");
                    document.body.style.overflowY = "auto";
                    var currentWidth = $(window).width() - 290;
                    $(".photo_div").width(currentWidth);
                    var num = parseInt(currentWidth / 206);
                    $("#container").BlocksIt({
                        numOfCol: num,
                        offsetX: 8,
                        offsetY: 8
                    });
                    break;
                case 4:
                    $(".contact").removeClass("box");
                    document.body.style.overflow = "hidden";
                    var currentWidth = $(window).width() - 290;
                    $(".contact_div").width(currentWidth);
                    var page = document.querySelector(".page_wrapper");
                    autoResize(page, 700);
                    break;
                default:
                    break;
            }
        };
    }
}




//home
function home() {
    var clock = document.querySelector("#digital_clock");
    digitalClock(clock);

    if (clock.parentNode.classList.contains("fill")) {
        autoResize(clock, 350);
    }

    function digitalClock(container) {
        var dynamic = container.querySelector(".dynamic");
        var hourElement = container.querySelector(".hour");
        var minuteElement = container.querySelector(".minute");
        var secondElement = container.querySelector(".second");

        for (var i = 1; i <= 60; i++) {
            minute(i);
        }

        for (var j = 1; j <= 12; j++) {
            hour(j);
        }

        function minute(n) {
            return n % 5 == 0 ? minuteText(n) : minuteLine(n);
        }

        function minuteText(n) {
            var element = document.createElement("div");
            element.className = "minute_text";
            element.innerHTML = (n < 10 ? "0" : "") + n;
            position(element, n / 60, 135);
            dynamic.appendChild(element);
        }

        function minuteLine(n) {
            var anchor = document.createElement("div");
            anchor.className = "anchor";
            var element = document.createElement("div");
            element.className = "element minute_line";
            rotate(anchor, n);
            anchor.appendChild(element);
            dynamic.appendChild(anchor);
        }

        function hour(n) {
            var element = document.createElement("div");
            element.className = "hour_text hour_" + n;
            element.innerHTML = n;
            position(element, n / 12, 105);
            dynamic.appendChild(element);
        }

        function position(element, phase, r) {
            var theta = phase * 2 * Math.PI;
            element.style.top = (-r * Math.cos(theta)).toFixed(1) + "px";
            element.style.left = (r * Math.sin(theta)).toFixed(1) + "px";
        }

        function rotate(element, second) {
            element.style.transform = 'rotate(' + (second * 6) + 'deg)';
        }

        function animate() {
            var now = new Date();
            var time = now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds() * 1 +
                now.getMilliseconds() / 1000;
            rotate(secondElement, time);
            rotate(minuteElement, time / 60);
            rotate(hourElement, time / 60 / 12);
            requestAnimationFrame(animate);
        }
        animate();
    }


}

function autoResize(element, size) {
    function update() {
        var scale = Math.min(document.body.clientWidth - 290, document.body.clientHeight) / size;
        element.style.transform = 'scale(' + scale.toFixed(3) + ')';
    }
    update();
    window.addEventListener("resize", update);
}


//project
function accordion(object) {
    this.element = document.getElementById(object);
    this.tar = getElementsByClass(this.element, "div", "slider");
    this.lh = this.tar.length;
    this.wh = this.element.clientWidth;
    this.whI = this.tar[0].clientWidth;
    this.mx = this.wh / this.lh;
    this.mn = (this.wh - this.whI) / (this.lh - 1);
    this.slides = [];
    for (var i = 0; i < this.lh; i++) {
        this.slides[i] = new slider(this, i);
    }
}

function slider(parent, N) {
    this.parent = parent;
    this.N = N;
    this.obj = parent.tar[N];
    this.img = getElementsByClass(this.obj, "img", "slide");
    this.obj.style.left = N * parent.mx + "px";

    this.txt = getElementsByClass(this.obj, "div", "text");
    this.bkg = document.createElement("div");
    this.bkg.className = "backgroundText";
    this.obj.insertBefore(this.bkg, this.txt);

    // 鼠标指针移动到元素内
    this.obj.parent = this;
    this.obj.onmouseover = function() {
        this.parent.over();
        return false;
    }

    // 鼠标指针移动到元素外
    this.parent.element.parent = this;
    this.parent.element.onmouseout = function() {
        this.parent.out();
        return false;
    }
}

// slider的原型
slider.prototype = {
    over: function() {
        var that = this.parent;
        for (var i = 0; i <= this.N; i++) {
            that.slides[i].obj.style.left = i * that.mn + "px";
        }
        for (var i = this.N + 1; i < that.lh; i++) {
            that.slides[i].obj.style.left = that.whI + (i - 1) * that.mn + "px";
        }
        for (var i = 0; i < that.lh; i++) {
            if (i == this.N) {
                setOpacity(that.slides[i].img, 100);
                that.slides[i].bkg.style.top = "90%";
                that.slides[i].txt.style.top = "90%";
            } else {
                that.slides[i].bkg.style.top = "";
                that.slides[i].txt.style.top = "";
            }
        }
    },

    out: function() {
        var that = this.parent;
        for (var i = 0; i < that.lh; i++) {
            that.slides[i].obj.style.left = i * that.mx + "px";
            setOpacity(that.slides[i].img, 50);
            that.slides[i].bkg.style.top = "";
            that.slides[i].txt.style.top = "";
        }
    }
}

// 通过类获取元素
function getElementsByClass(object, tag, className) {
    var o = object.getElementsByTagName(tag);
    var ret = [];
    for (var i = 0; i < o.length; i++) {
        if (o[i].className == className) {
            ret.push(o[i]);
        }
    }
    if (ret.length == 1) {
        ret = ret[0];
    }
    return ret;
}

// 透明度
function setOpacity(obj, o) {
    if (obj.filhers) {
        obj.filher.alpha.opacity = o;
    } else {
        obj.style.opacity = o / 100;
    }
}


//msg && photo && contact
function content() {
    var currentWidth = $(window).width() - 290;
    $(".boxWidth").width(currentWidth);

    // photo
    var num = parseInt(currentWidth / 206);
    $(window).on('load', function() {
        $("#container").BlocksIt({
            numOfCol: num,
            offsetX: 8,
            offsetY: 8
        });
    });

    // photo模块的nav置顶
    $(".photo_nav").sticky({
        topSpacing: 0
    });

    // msg
    $(".msg_div .list").each(function(e, target) {
        var $ul = $(target).find("ul");
        $(target).height($ul.outerHeight());
        // $ul.css("position", "absolute");
    });

    $(".year>h2>a").click(function(e) {
        e.preventDefault();
        $(this).parents(".year").toggleClass("close");
    });

    // contact
    $("#tab_design").tabs({
        start_index: 1,
        // true随机显示
        random: false,
        transition_time: 200
    });

    // jQuery事件 - resize()方法:当调整浏览器窗口的大小时，发生 resize 事件。
    $(window).resize(function() {
        var winWidth = $(window).width();
        var conWidth = winWidth - 290;
        if (winWidth < 700) {
            col = 1;
        } else if (winWidth < 900) {
            col = 2;
        } else if (winWidth < 1100) {
            col = 3;
        } else if (winWidth < 1300) {
            col = 4;
        } else {
            col = 5;
        }

        $(".boxWidth").width(conWidth);
        $("#container").BlocksIt({
            numOfCol: col,
            offsetX: 8,
            offsetY: 8
        });
    });
}
