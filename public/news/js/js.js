(function(){if($.id("con")&&$.getInner().width<680){var box=$.id("con"),img=box.getElementsByTagName("img");for(var i=0;i<img.length;i++){img[i].style.height="auto";img[i].style.width="100%";img[i].onclick=(function(i){return function(){if(img[i].style.width==="auto"){img[i].parentNode.style.overflow="visible";img[i].style.width="100%"}else{img[i].parentNode.style.overflow="auto";img[i].style.width="auto"}}}(i))}}}());if($.id("awaysTop")){pu_awaysTop($.id("awaysTop"))};

