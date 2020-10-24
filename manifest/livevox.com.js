'use strict';

// if this is the form for logging in
if (document.getElementById( "agentAuth" )) {
	// ask the outer iframe for the login
	chrome.runtime.sendMessage({action: "REQUEST_LOGIN"}, function(response) {
		if (response == null) {
			return;
		}
		// if we got the right response, fill in the form and click next
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
				// could click sign in for the user here, but chrome would throw a redirect warning
				//var signInEl = document.getElementById( "signIn" );
				//signInEl.click();
			}, 200 );
		}
	});
} else {
	// otherwise, listen for a term code being found and then look for those term codes to highlight
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
						// highlight a correct option
						optionAEl.style.backgroundColor = "lime";
						// if the term codes section is collapsed, unfurl it
						if (!optionsDivEl.classList.contains( "in" )) {
							var collapsedAccordianEls = optionsDivEl.parentElement.getElementsByClassName( "accordion-toggle" );
							for (var caIdx = 0; caIdx < collapsedAccordianEls.length; caIdx++) {
								collapsedAccordianEls[caIdx].click();
							}
						}
					}
				}
			}
			// we could click the correct option for the user if there's just one, but let's hold back on that, might be confusing.
			if (termcodesFoundTotal == 1) {
//				optionAEl.click();
			}
		}
		return true;
	} );
}
