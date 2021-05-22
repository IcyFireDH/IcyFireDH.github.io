(function(){
	if(!$.id("qnav")) return;
	var on = $.id("qnav"),main = $.id("main"),ontop = on.offsetTop,li = on.getElementsByTagName('li'),h2 = $.cl($.tag(document,"h2"),"bookname"),cha = 0,top=[];
	for (var i = 0; i < h2.length; i++)  top.push(h2[i].offsetTop) ;
	window.onscroll = function(){
		var t = document.documentElement.scrollTop || document.body.scrollTop,s;  
		if (t > ontop) {
			on.className = "qnav qnva-fixed";
		}else if(t <= ontop){
			on.className = "qnav";
		};
		for (var i = 0; i < top.length; i++) {
			if( t > top[i] ) {
				s = i;
			}
		};
		hover(s);
	};
	for (var i = 0; i < li.length; i++) {
		li[i].onclick = function(i){
			return function(){
				document.documentElement.scrollTop = document.body.scrollTop = h2[i].offsetTop + 80;
				hover(i);
			}
		}(i);
	};
	function hover(s){
		if (cha || s===undefined) { return};
		cha = 1;
		for (var i = 0; i < li.length; i++) {
				li[i].className = "";
			};
		li[s].className = "hover";
		setTimeout(function(){
			cha = 0;
		},50)
	}
}());
