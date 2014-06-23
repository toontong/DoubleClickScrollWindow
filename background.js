/********************************
  run as background app in back.
  just run one.
  popup.js与roller.js使用同一个background页面是为什么使用同一份localStorage作配置。
********************************/



var KEY_LINE ='AUTO_SCROLL_LINE';
var KEY_TIME ='AUTO_SCROLL_TIME';
var KEY_ENABLE='AUTO_SCROLL_ENABLE';

function setItem(key, value) {
	window.localStorage.removeItem(key);
	window.localStorage.setItem(key, value);
}

function getItem(key) {
	var value;
	try {
		value = window.localStorage.getItem(key);
	}catch(e) {
		value = "null";
	}
	return value;
}
//---------------------


// Listeners
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		switch (request.name)
		{
		case "setOptions":
			setItem(KEY_LINE, request.line);
			setItem(KEY_TIME, request.time);
			if(request.enable){
				setItem(KEY_ENABLE, "null");
			}else{
				setItem(KEY_ENABLE, "true");
			}
			sendResponse(request);
			break;
		case "getOptions":
				sendResponse({
					time : getItem(KEY_TIME),
					line : getItem(KEY_LINE),
					enable:getItem(KEY_ENABLE)
				});
			break;
		default:
			sendResponse({});
		}
	}
);