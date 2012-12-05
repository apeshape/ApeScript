$(function(){
	var bg = chrome.extension.getBackgroundPage();

	var cm = CodeMirror.fromTextArea($("textarea")[0]);

	chrome.tabs.query({'windowId':chrome.windows.WINDOW_ID_CURRENT,"active":true},function(tabs){
		var tabId = tabs[0].id;
		var currentUrl = tabs[0].url;
		var currentDomain = currentUrl.split("/")[2];
		var script = bg.getScriptForDomain(currentDomain);

		if(script){
			$('textarea').val(script);
		}

		$('#saveScript').on('click',function(){
			script = cm.getValue();
			bg.setScriptForDomain(currentDomain, script);
			chrome.tabs.sendMessage(tabId,{action:"reload"},function(d){console.log(d);});
		});
	});

})