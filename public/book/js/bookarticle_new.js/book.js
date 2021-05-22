var Book = {};
Book.dorHeight = $.getInner().height;
Book.dorWidth = $.getInner().width;
Book.useragent = navigator.userAgent;
Book.baifenbi = 0;
Book.px = function(width, height) {
    var min1200 = function() {
        $.id("breadnav").style.display = "none"
    };
    var max1200 = function() {
        $.id("breadnav").style.display = "inline-block"
    };
    if (width) {
        if (width >= 1200) {
            max1200()
        } else {
            if (width < 1200) {
                min1200()
            }
        }
    }
};
Book.makeRank = function(vertical) {
    var con = $.id("rank"),
    box = $.id("con"),
    html = $.id("vcon");
    if (Book.pai) {
        change();
        return
    }
    Book.pai = new Q.typeSeting({
        obj: box,
        html: html,
        classname: "content",
        fn: function(line) {}
    });
    function rankcooke(a) {
        if (Book.cookie.data) {
            a = a - 0.05 <= 0 ? 0 : a - 0.03;
            Book.cookie.data[1] = a;
            $.setCookie("redconfig", Book.cookie.data.join("|"))
        }
    }
    function next() {
        Book.pai.nextPage(function(a, b) {
            rankcooke(a / b);
            Book.gopage(a, b,
            function(i) {
                Book.pai.gotopage(i + 1);
                Book.gopagehover(i)
            })
        })
    }
    function prev() {
        Book.pai.prevPage(function(a, b) {
            rankcooke(a / b);
            Book.gopage(a, b,
            function(i) {
                Book.gopage(a, b,
                function(i) {
                    Book.pai.gotopage(i + 1);
                    Book.gopagehover(i)
                })
            })
        })
    }
    var boxtouch = new $.Touch(box);
    boxtouch.swipeleft = function() {
        next()
    };
    boxtouch.swiperight = function() {
        prev()
    };
    Z(box).mousewheel(function() {
        next()
    },
    function() {
        prev()
    });
    function change() {
        var height = $.getInner().height,
        width = $.getInner().width;
        con.style.height = box.style.height = ~~ ((parseInt(height - 160)) / 36) * 36 + "px";
        if (width < 800) {
            con.style.width = "95%";
            box.style.width = con.offsetWidth * 5 + "px";
            Book.pai.lineL = 1
        } else {
            if (width < 1400) {
                con.style.width = "90%";
                box.style.width = con.offsetWidth * 5 / 2 + "px";
                Book.pai.lineL = 2
            } else {
                box.style.width = con.offsetWidth * 5 / 3 + "px";
                Book.pai.lineL = 3
            }
        }
        Book.pai.go(function(a, b) {
            rankcooke(a / b);
            Book.gopage(a, b,
            function(i) {
                Book.pai.gotopage(i + 1);
                Book.gopagehover(i)
            })
        },
        vertical);
        Book.makestates = "makeRank"
    }
    change()
};
Book.makeVertical = function() {
    var con = $.id("con"),
    top = $.getInner().height - 121,
    box = $.id("box"),
    vocn = $.id("vcon"),
    timedaly;
    if (this.makeVerticalstate) {
        change();
        return
    }
    function gotopage(i) {
        box.scrollTop = i * top
    }
    function change() {
        var a = parseInt((box.scrollTop + top) / top),
        b = parseInt((box.scrollHeight - 40) / top);
        if (Book.cookie.data) {
            Book.cookie.data[1] = box.scrollTop / vocn.scrollHeight;
            $.setCookie("redconfig", Book.cookie.data.join("|"))
        }
        top = $.getInner().height - 121;
        box.style.height = top + "px";
        Book.gopage(a, b,
        function(i) {
            gotopage(i)
        });
        Book.makestates = "makeVertical"
    }
    change();
    box.onscroll = function() {
        if (timedaly) {
            return
        }
        timedaly = 1;
        setTimeout(function() {
            change();
            timedaly = 0
        },
        200)
    };
    this.makeVerticalstate = 1
};
Book.addJs = function() {
    var loadScript = function(url) {
        var script = document.createElement("script");
        script.async = false;
        script.setAttribute("src", url);
        return script
    };
    return {
        baiduMobil: function() {
            window.cpro_id = "u2648829";
            var js = loadScript("http://cpro.baidustatic.com/cpro/ui/cm.js");
            document.body.appendChild(js)
        },
        baiduPc: function() {
            window.cpro_id = "u2656099";
            var js = loadScript("http://cpro.baidustatic.com/cpro/ui/c.js");
            document.body.appendChild(js)
        }
    }
} ();
window.onresize = function resize() {
    if (resize.state) {
        return
    }
    resize.state = 1;
    setTimeout(function() {
        var get = $.getInner(),
        height = get.height,
        width = get.width;
        Book.px(width);
        if (Book.makestates === "makeVertical") {
            Book.makeVertical()
        } else {
            if (Book.makestates === "makeRank") {
                Book.makeRank()
            }
        }
        resize.state = 0
    },
    200)
};
Book.gopage = function(a, b, fn) {
    if (gotopage.state) {
        return
    }
    gotopage.state = 1;
    var page = $.id("pages").getElementsByTagName("font"),
    span = [],
    c = "",
    box = $.id("gotopage");
    page[0].innerHTML = a;
    page[1].innerHTML = b;
    for (var i = 0; i < b; i++) {
        if (i + 1 === a) {
            c += "<span class='hover'>" + (i + 1) + "</span>"
        } else {
            c += "<span>" + (i + 1) + "</span>"
        }
    }
    box.innerHTML = c;
    span = box.getElementsByTagName("span");
    for (var i = 0; i < span.length; i++) {
        span[i].onclick = (function(i) {
            return function() {
                fn ? fn(i) : 1
            }
        })(i)
    }
    gotopage.state = 0;
    Book.gopagehover = function(a) {
        page[0].innerHTML = a + 1;
        page[1].innerHTML = b;
        for (var i = 0; i < span.length; i++) {
            span[i].className = ""
        }
        span[a].className = "hover"
    }
};
Book.nav = function() {
    var nav = $.id("nav"),
    navshow = $.id("navshow"),
    navhide = $.id("navback"),
    navul = $.id("navul"),
    bg = $.id("bg");
    function show() {
        Book.navstate = 1;
        bg.style.display = nav.style.display = "block";
        Q.animate({
            obj: nav,
            time: 200,
            attr: ["opacity:1"]
        });
        setTimeout(function() {
            Q.animate({
                obj: navul,
                time: 300,
                attr: ["left:0px", "opacity:1"],
                mattr: ["x:20px", "opacity:1"]
            })
        },
        100)
    }
    function hide() {
        Book.navstate = 0;
        Q.animate({
            obj: navul,
            time: 200,
            attr: ["left:-20px", "opacity:0"],
            mattr: ["x:0px", "opacity:0"]
        });
        Q.animate({
            obj: nav,
            time: 200,
            attr: ["opacity:0"],
            fn: function() {
                bg.style.display = nav.style.display = "none"
            }
        })
    }
    $.addEvent(navshow, "click", show);
    $.addEvent(navhide, "click", hide);
    $.addEvent(bg, "click",
    function() {
        if (Book.navstate) {
            this.style.display = "none";
            hide()
        }
    })
};
Book.coumn = function(title) {
    Book.coumnscroll = new Q.Scroll({
        dir: "y",
        box: $.id("coumnbox"),
        content: $.id("coumncon"),
        className: "coumnscroll"
    }).go(function(zz) {
        $.id("coumn").style.display = "none";
        var a = $.tag($.id("coumncon"), "a");
        for (var i = 0; i < a.length; i++) {
            if (a[i].innerHTML == title) {
                a[i].style.color = "#fff";
                a[i].style.background = "#00acff";
                zz.i = i
            }
        }
    });
    if (!Book.coumnscroll) {
        var leg = $.tag($.id("coumncon"), "li").length * 40 + 20;
        $.id("coumn").style.height = leg + "px";
        $.id("coumn").style.display = "none"
    }
    var box = $.id("coumncon"),
    top;
    var boxtouch = new $.Touch(box, {
        PREDEF: [1, 1]
    });
    boxtouch.swipestart = function(e) {
        top = -parseInt(box.style.marginTop)
    };
    boxtouch.holdtop = boxtouch.holddown = function(e) {
        box.style.marginTop = -(top - (e.y - e.cachedY)) + "px"
    };
    boxtouch.swipeend = function(e) {
        Book.coumnscroll.crun(top - (e.y - e.cachedY), 1)
    }
};
Book.bottomon = function(on, box, state, showattr, hideattr, showmattr, hidemattr) {
    var bg = $.id("bg");
    function show() {
        if (Book[state]) {
            return
        }
        bg.style.display = box.style.display = "block";
        state === "coumnstate" && Book.coumnscroll ? Book.coumnscroll.crun((Book.coumnscroll.i - 3) * 40) : 0;
        Book[state] = 1;
        Z(on).addclass("hover");
        Q.animate({
            obj: box,
            time: 400,
            attr: showattr,
            mattr: showmattr
        })
    }
    function hide() {
        Z(on).removeclass("hover");
        Q.animate({
            obj: box,
            time: 400,
            attr: hideattr,
            mattr: hidemattr,
            fn: function() {
                box.style.display = nav.style.display = "none";
                Book[state] = 0
            }
        })
    }
    $.addEvent(on, "click", show);
    $.addEvent(bg, "click",
    function() {
        if (Book[state]) {
            this.style.display = "none";
            hide()
        }
    });
    if (state === "commentstate") {
        function cohide() {
            bg.style.display = "none";
            hide()
        }
        $.addEvent($.id("co_close"), "click", cohide);
        var boxtouch = new $.Touch($.id("com_box"));
        boxtouch.swipeleft = cohide
    }
};
Book.settype = function() {
    var set = $.id("settype_on").getElementsByTagName("i"),
    rank = $.id("rank"),
    box = $.id("box"),
    page = $.id("pages").getElementsByTagName("font"),
    fontsize = $.id("fontsize");
    Z(set[0]).click(function() {
        if (set[0].className === "on") {
            return
        }
        for (var i = 0; i < set.length; i++) {
            set[i].className = ""
        }
        set[0].className = "on";
        Book.cookie.data[0] = 0;
        $.setCookie("redconfig", Book.cookie.data.join("|"));
        fontsize.className = "fontsize";
        rank.style.display = "block";
        Book.makeRank(Book.pai === undefined ? Book.settype.rankpage: (box.scrollTop === 0 ? 1 : box.scrollTop) / (box.scrollHeight));
        box.style.display = "none"
    });
    Z(set[1]).click(function() {
        if (set[1].className === "on") {
            return
        }
        for (var i = 0; i < set.length; i++) {
            set[i].className = ""
        }
        set[1].className = "on";
        Book.cookie.data[0] = 1;
        $.setCookie("redconfig", Book.cookie.data.join("|"));
        fontsize.className = "";
        box.style.display = "block";
        box.scrollTop = (Book.pai.index - 1) / Book.pai.pageL * box.scrollHeight;
        rank.style.display = "none";
        Book.makeVertical()
    })
};
Book.comment = function() {
    $.id("com_box").style.display = "none"
};
Book.mbPage = function mbPage() {
    var top = $.getInner().height,
    box = document.body;
    mbPage.gotopage = function(i) {
        box.scrollTop = i * top;
        Book.gopagehover(i)
    };
    function change() {
        top = $.getInner().height;
        Book.gopage(parseInt((box.scrollTop + top) / top), parseInt((box.scrollHeight) / top),
        function(i) {
            mbPage.gotopage(i)
        })
    }
    change();
    Book.makestates = "mbPage"
};
Book.mbFn = function() {
    var box = $.id("box"),
    body = document.body,
    top = $.id("top"),
    tool = $.id("tool"),
    _this = this,
    makepage,
    tb,
    isShow = true,
    pice = Book.dorHeight / 7;
    makepage = function() {
        _this.mbPage()
    };
    function show() {
        Z(top).removeclass("tophover");
        Z(tool).removeclass("toolhover");
        Z(document.body).addclass("toolshow");
        isShow = true
    }
    function hide() {
        Z(top).addclass("tophover");
        Z(tool).addclass("toolhover");
        Z(document.body).removeclass("toolshow");
        isShow = false
    }
    var boxtouch = new $.Touch(box);
    boxtouch.tap = function(e) {
        if (isShow) {
            hide()
        } else {
            makepage();
            show()
        }
    };
    boxtouch.holdtop = boxtouch.holddown = function() {
        if (isShow) {
            hide()
        }
    };
    boxtouch.swiperight = function(e) {
        $.id("navshow").click()
    };
    boxtouch.swipeleft = function(e) {
        $.id("navback").click()
    }
};
Book.readSet = function() {
    var li = $.id("ba_box").getElementsByTagName("li"),
    bg = li[0].getElementsByTagName("span"),
    fz = li[1].getElementsByTagName("span"),
    ff = li[2].getElementsByTagName("span"),
    box = document.body,
    classname = ["bg", "fz", "ff"],
    arr = [];
    for (var i = 0; i < li.length; i++) {
        var span = li[i].getElementsByTagName("span");
        arr.push(span);
        for (var a = 0; a < span.length; a++) {
            span[a].onclick = function(a, i) {
                return function() {
                    if (Z(this.parentNode).hasclass("fontsize") !== false) {
                        return
                    }
                    if (Z(this).hasclass("hover")) {
                        return
                    }
                    for (var b = 0; b < arr[i].length; b++) {
                        Z(arr[i][b]).removeclass("hover")
                    }
                    Z(this).addclass("hover");
                    var cln = box.className.match(/\w+/g);
                    cln[i] = classname[i] + a;
                    box.className = cln.join(" ");
                    Book.cookie.data[i + 2] = a;
                    $.setCookie("redconfig", Book.cookie.data.join("|"));
                    if (Book.cookie.on) {
                        return
                    }
                    i === 1 ? Book[Book.makestates]() : 0
                }
            } (a, i)
        }
    }
};
Book.cookie = function(name) {
    Book.cookie.on = 1;
    Book.cookie.data = [0, 0, 0, 1, 0];
    var name = name || "redconfig",
    redsetbox = $.id("ba_box").getElementsByTagName("li"),
    setobj = [$.id("settype_on").getElementsByTagName("i"), $.id("gotopage").getElementsByTagName("span"), redsetbox[0].getElementsByTagName("span"), redsetbox[1].getElementsByTagName("span"), redsetbox[2].getElementsByTagName("span")],
    data,
    lastbook;
    $.getCookie(name) !== null ? data = Book.cookie.data = $.getCookie(name).split("|") : data = Book.cookie.data;
    lastbook = $.getCookie("lastbook");
    if (lastbook) {
        lastbook = $.getCookie("lastbook").split("|");
        if (lastbook[1] === window.location.href) {
            this.settype.rankpage = data[1];
            if (data[0] == 1) {
                var box = $.id("box"),
                vcon = $.id("vcon");
                box.scrollTop = data[1] * (vcon.scrollHeight)
            }
        } else {}
    }
    $.setCookie("lastbook", $.id("title").innerHTML + "|" + window.location.href + "|" + $.tag($.id("breadnav"), "a")[1].href + "|" + $.tag($.id("breadnav"), "a")[1].innerHTML);
    for (var i = 0; i < setobj.length; i++) {
        if (i === 1) {
            continue
        }
        setobj[i][data[i]].click()
    }
    Book.cookie.on = 0
};
if (Book.dorWidth <= 480) {
    Book.nav();
    Book.coumn($.id("title").innerHTML);
    Book.mbPage();
    Book.bottomon($.id("coumn_on"), $.id("coumn"), "coumnstate", ["bottom:60px", "opacity:1"], ["bottom:50px", "opacity:0"], ["y:-30px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.bottomon($.id("readset_on"), $.id("ba_box"), "readsetstate", ["bottom:60px", "opacity:1"], ["bottom:50px", "opacity:0"], ["y:-30px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.bottomon($.id("pages"), $.id("gopage"), "pagesstate", ["bottom:60px", "opacity:1"], ["bottom:50px", "opacity:0"], ["y:-30px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.mbFn();
    Book.readSet();
    Book.cookie()
} else {
    Book.makeVertical();
    Book.nav();
    Book.settype();
    Book.coumn($.id("title").innerHTML);
    Book.px(Book.dorWidth);
    Book.bottomon($.id("coumn_on"), $.id("coumn"), "coumnstate", ["bottom:40px", "opacity:1"], ["bottom:20px", "opacity:0"], ["y:-20px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.bottomon($.id("readset_on"), $.id("ba_box"), "readsetstate", ["bottom:40px", "opacity:1"], ["bottom:20px", "opacity:0"], ["y:-20px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.bottomon($.id("phonewatch_on"), $.id("phonewatch"), "phonewacthstate", ["bottom:40px", "opacity:1"], ["bottom:20px", "opacity:0"], ["y:-20px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.bottomon($.id("pages"), $.id("gopage"), "pagesstate", ["bottom:40px", "opacity:1"], ["bottom:20px", "opacity:0"], ["y:-20px", "opacity:1"], ["y:0px", "opacity:0"]);
    Book.readSet();
    Book.cookie();
    setTimeout(function() {
        $.id("phonewatchimg").src = "https://s.jiathis.com/qrcode.php?url=" + window.location.href
    },
    1000)
};
