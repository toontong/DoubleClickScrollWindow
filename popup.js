function updateUI(time, line, enable){
	
	document.getElementById("timer").value = isNaN(Number(time)) ? 1000 : Number(time)/ 1000; 
	document.getElementById("line").value =  isNaN(Number(line)) ? 100 : Number(line);
	document.getElementById('enabled').checked = enable;

}

function onClicked() {

	var enable = document.getElementById('enabled').checked;
	var time = document.getElementById("timer").value;
	var line = document.getElementById("line").value;
	
	time = isNaN(Number(time)) ? 1000 : Number(time) * 1000;
	line = isNaN(Number(line)) ? 100 : Number(line);

	chrome.extension.sendMessage({name: "setOptions",
			time:time, line:line, enable: enable
		}, function(resp) {
		updateUI(time, line, enable);
	});
}


function loadOptions() {
	chrome.extension.sendMessage({name: "getOptions"}, function(resp) {
		updateUI(Number(resp.time), resp.line, resp.enable);
	});

}

// popup.html load event.
document.addEventListener('DOMContentLoaded', function () {
	// add button clicked event
	document.getElementById('btSubmit').addEventListener(
			'click', onClicked);
	
	loadOptions();
});


