
var currentpos, timer; 

function _scrollwindow(srcTime) 
{ 
	chrome.extension.sendMessage({name: "getOptions"}, function(resp) {
		if(!resp.enable){
			return stop();
		}
		var currentpos = document.body.scrollTop + parseInt(resp.line);
		window.scroll(0, currentpos);
		
		if (currentpos != document.body.scrollTop){
			stop(); 
		}
		if (srcTime != resp.time){
			stop();
			
			timer = setInterval(function(){
				_scrollwindow(resp.time);
			}, resp.time);
		}
	});
} 


function start() 
{
	chrome.extension.sendMessage({name: "getOptions"}, function(resp) {

		if(!resp.enable){
			console.info("auto scroll window down is disable.");
			return;
		}

		timer = setInterval(function(){
			_scrollwindow(resp.time);
		}, resp.time);
	});
}

function stop(){ 
    clearInterval(timer); 
}

document.onmousedown = stop;
document.ondblclick = start; 
