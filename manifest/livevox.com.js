'use strict';

if (document.getElementById( "agentAuth" )) {
	chrome.runtime.sendMessage({action: "REQUEST_LOGIN"}, function(response) {
		if (response == null) {
			return;
		}
		if (response.action == "LOGIN_CRED_FOUND") {
			var usernameEl = document.getElementById( "username" );
			usernameEl.value = response.login;
			var passwordEl = document.getElementById( "password" );
			passwordEl.value = response.password;
			var submitBtnEl = document.getElementById( "agentAuthButtonId" );
			submitBtnEl.click();
			var browserAudioCheckEl = document.getElementById( "browserAudioCheck" );
			setTimeout( function() {
				if (browserAudioCheckEl.checked == true) {
				    browserAudioCheckEl.click();
				}
				//var signInEl = document.getElementById( "signIn" );
				//signInEl.click();
			}, 200 );
		}
	});
} else {
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		var optionsDivEl = document.getElementById( "termCodesLine1Term_Codes" );
		if (optionsDivEl && request.action == "SET_TERMCODE") {
			var termcodesFoundTotal = 0;
			var optionAEl;
			for (var tcIdx = 0; tcIdx < request.termcodes.length; tcIdx++) {
				var termcode = request.termcodes[tcIdx];
				var optionAEls = optionsDivEl.getElementsByTagName("a");
				if (!optionAEls || !(optionAEls.length > 0) ) {console.error( "no optionAEls: " + optionAEls )}
				for (var i = 0; i < optionAEls.length; i++) {
					optionAEl = optionAEls[i];
					var innerText = optionAEl.innerText;
					if (innerText.includes( termcode )) {
						termcodesFoundTotal++;
						optionAEl.style.backgroundColor = "lime";
						if (!optionsDivEl.classList.contains( "in" )) {
							var collapsedAccordianEls = optionsDivEl.parentElement.getElementsByClassName( "accordion-toggle" );
							for (var caIdx = 0; caIdx < collapsedAccordianEls.length; caIdx++) {
								collapsedAccordianEls[caIdx].click();
							}
						}
					}
				}
			}
			if (termcodesFoundTotal == 1) {
//				optionAEl.click();
			}
		}
		return true;
	} );
}
