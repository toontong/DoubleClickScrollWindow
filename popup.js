
var TIME_STPE = 1000; // 1 sec
var LINE_ROLL = 5;
var AUTO_ROLL = false;
var TIMER_STOP=true;

function onClicked() {
    console.info("onClicked function called.")
    //TIME_STPE = document.getElementsByName("timer")[0].value;

    LINE_ROLL = document.getElementById("line").value;

    AUTO_ROLL =! AUTO_ROLL;
    if(!AUTO_ROLL){
        document.getElementById('btSubmit').value="now is Disabled";
    }
    else{
        document.getElementById('btSubmit').value="now is Enabled";
        setTimeout(timerUpdateUI, TIME_STPE);
    }
    return true;
}
function updateUiState(){
  document.getElementById("timer").value = TIME_STPE / 1000; // 1 sec
  document.getElementById("line").value = LINE_ROLL;
}

function timerUpdateUI(e){
    LINE_ROLL += 1;
    updateUiState();
    if(AUTO_ROLL){
        
        chrome.extension.sendMessage({name: "roller"}, function(response) {
            console.info('getOptions response. %s');
            console.info('getOptions response. %s', response.url);
            LINE_ROLL = response.url;
            setTimeout(timerUpdateUI, TIME_STPE);
        });
    }
    //console.info('current timer=%s, roll line=%s. auto_roll_open=%s', TIME_STPE, LINE_ROLL, AUTO_ROLL);
}

// popup button clicked
document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('btSubmit').addEventListener(
      'click', onClicked);

  updateUiState();
});

chrome.extension.sendMessage({name: "getOptions"},
	function(response) {
		document.getElementById("timer").value = response.time / 1000; // 1 sec
		document.getElementById("line").value = response.line;
});
