(function(){var cookie=$.getCookie("lastbook"),coumn=window.location.href,lasturl=$.id("lasturl"),lastread=$.id("lastread");if(cookie){cookie=cookie.split("|");lastread.style.display="block";lastread.innerHTML+='<a href="'+cookie[2]+'">《'+cookie[3]+'》</a> <a class="scale095" href="'+cookie[1]+'">'+cookie[0]+"</a>"}})();(function(){if(!$.id("allversion")){return}var on=$.id("allversionon"),down=$.id("allversiondown");on.show=function(on,down){down.style.display="block";setTimeout(function(){Z(down).addclass("hover")},1)};on.hide=function(on,down){down.style.display="none";Z(down).removeclass("hover")};PU.clickDown(on,down)}());
