/********************************
  run as background app in back.
  just run one.
********************************/

// Add icon to URL bar
function checkForValidUrl(tabId, changeInfo, tab) {
	chrome.pageAction.show(tab.id);
};

// Listen for any changes to the URL of any tab
//chrome.tabs.onUpdated.addListener(checkForValidUrl);

console.info("background.js load, just load once.");

// Set the item in the localstorage
function setItem(key, value) {
	window.localStorage.removeItem(key);
	window.localStorage.setItem(key, value);
}

// Get the item from local storage with the specified key
function getItem(key) {
	var value;
	try {
		value = window.localStorage.getItem(key);
	}catch(e) {
		value = "null";
	}
	return value;
}

var openedTabs = {}
// Listeners
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse)
	{
        console.info('chrome.extension.onMessage');
		switch (request.name)
		{
		case "setOptions":
				// request from the content script to set the options.
				localStorage.setItem("websiteIP_status", request.status);
			break;
		case "getOptions":
				// request from the content script to get the options.
				sendResponse({
					enableDisableIP : localStorage["websiteIP_status"]
				});
			break;
		case "document_end": // new document load end
            //chrome.pageAction.show(sender.tab.id);
            
			var currentURL = sender.tab.url;
            openedTabs[currentURL] = sender;
			if (currentIPList[currentURL] !== undefined) {
				sendResponse({
					domainToIP: currentIPList[currentURL]
				});
			} else {
				sendResponse({
					domainToIP: null
				});
			}
			break;
        case "roller":
            //var currentURL = sender.tab.url;
            //console.info('ROLLER: %s', currentURL);
            alert('doc_end')
            chrome.tabs.getCurrent(sendResponse);
            break;
		default:
			sendResponse({url:sender.tab.url});
		}
	}
);