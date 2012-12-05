if(typeof localStorage.scripts == 'undefined'){
	localStorage.scripts = '[]';
	console.log("no such thing");
}
else{
	console.log(localStorage.scripts);
}

//_ls = JSON.parse(localStorage.scripts);

function getScriptForDomain(domain){
	_ls = JSON.parse(localStorage.scripts);
	for(var i = 0, l = _ls.length; i < l; i++){
		if(_ls[i].domain == domain){
			return _ls[i].script;
		}
	}
	return false;
}

function setScriptForDomain(domain,script){
	_ls = JSON.parse(localStorage.scripts);
	for(var i = 0, l = _ls.length; i < l; i++){
		if(_ls[i].domain == domain){
			if(script == ""){
				console.log("Empty");
				_ls.splice(i,1);
				localStorage.scripts = JSON.stringify(_ls);
				return true;
			}
			_ls[i].script = script;
			console.log(script);
			localStorage.scripts = JSON.stringify(_ls);

			return true;
		}
	}
	_ls.push({domain:domain,script:script});
	localStorage.scripts = JSON.stringify(_ls);
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if(request.method == "checkCurrentDomain"){
		console.log("request",request);
		console.log("ls",localStorage);

		script = getScriptForDomain(request.domain);
		if(script){
			//chrome.browserAction.setIcon({path:"icon_active.png"});
			sendResponse(script);
		}
	}
});
