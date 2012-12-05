$(function(){
	var bg = chrome.extension.getBackgroundPage();
	var _ls = JSON.parse(localStorage.scripts);
	var cms = [];

	var renderList = '';
	for(var i = 0, l = _ls.length; i < l; i++){
		renderList += 	' <li data-id="'+i+'" data-domain="'+_ls[i].domain+'"> ' +
						'	<span class="domain">Domain: <span class="name">'+_ls[i].domain+'</span></span>' +
						'	<textarea class="script">'+_ls[i].script+'</textarea>'+
						'	<div class="actions">'+
							'	<a href="#" class="delete">Delete</a>'+
							'	<a href="#" class="save">Save</a>'+
						'	</div>'+
						' </li>';
	}

	$(".content #scripts").append(renderList);
	$(document).on("click",".delete",function(){
		var parent = $(this).parents("li");
		bg.setScriptForDomain(parent.data().domain, "");
		window.location.reload();
		return false;
	})
	$(document).on("click",".save",function(){
		var parent = $(this).parents("li");
		var id = parent.data().id;
		var domain = parent.data().domain;
		var script = cms[id].getValue();
		bg.setScriptForDomain(domain, script);
	})
	$("textarea").each(function(){
		cms.push(CodeMirror.fromTextArea(this));
	});

	console.log(cms);

	//addCodeMirror();
})