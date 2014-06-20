// const

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

// document_end
$(document).ready(function() {


});

var currentpos, timer; 
function initialize() 
{ 
    timer = setInterval(function(){scrollwindow()},10); 
} 
function sc(){ 
    clearInterval(timer); 
} 
function scrollwindow() 
{ 
    currentpos=document.body.scrollTop; 
    window.scroll(0, ++currentpos); 
    if (currentpos != document.body.scrollTop) 
        sc(); 
} 
document.onmousedown=sc 
document.ondblclick=initialize 