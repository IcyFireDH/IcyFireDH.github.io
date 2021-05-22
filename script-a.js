function is_mobile() {  
	var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;  
	var u = navigator.userAgent;  
	if (null == u) {  
		return true;  
	}  
	var result = regex_match.exec(u);  
	if (null == result) {  
		return false  
	} else {  
		return true  
	} 
} 

function google_t1() {
	// baidutongji
	document.write("<script src='https://cdn0.weinin99.cn/mhw0/duniao/1161.js'></script>");
	// tianchen 20200421
	document.write('<script src="https://m.s.tpcdn.top/hm/cdn/static/jq_768221.js"></script>');
}

function google_t2() {
	// document.writeln("<p style=\"text-align:center;\"><a target=\"_blank\" href=/index.html"http://www.quzhishi.com/dujitang/\"><img src=/index.html"/source/1557328275-375.gif\" style=\"max-width:96%;\" border=\"0\" /></a></p>");
	// 360图书�?
	document.writeln("<div style=\"text-align:center\"><a href=/index.html"http://www.zhangzaixi.com/shuku/wodexiaoquexing/\" target=\"_blank\"><img style=\"max-width:100%\" src=/index.html"/source/360.jpg\" border=\"0\" /></a></div>"); 
}
