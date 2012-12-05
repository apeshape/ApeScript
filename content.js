/*
* Javascript injected to the current page we are viewing. This is where we run our custom scripts if there are any.
* Send a message to background.js to check the domain of the current tab agains our saved ones, and get the script
* back if there is a match, then we just eval() that shit.
*
*/

var domain = window.location.href.split("/")[2];

chrome.extension.sendRequest({method:"checkCurrentDomain",domain:domain},function(d){
	eval(d); //..sorry
	return false;
});

chrome.extension.onMessage.addListener(function(request,sender,response){
	console.log("request",request);
	if(request.action == "reload"){
		window.location.reload();
	}
})
