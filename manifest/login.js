'use strict';

var pEls = document.getElementsByTagName("p");
var loginPattern = "Login ID: (.+)\n";
var passwordPattern = "Password: (.+)\n";
var cred = {
	login : null,
	password : null,
	action : "LOGIN_CRED_FOUND"
}
var loginString, passwordString;
for (var i = 0; i < pEls.length; i++) {
	var innerText = pEls[i].innerText;
	var loginMatches = innerText.match(loginPattern);
	if (loginMatches != null) {
		cred.login = loginMatches[1];
	}
	var passwordMatches = innerText.match(passwordPattern);
	if (passwordMatches != null) {
		cred.password = passwordMatches[1];
	}
}
if (cred.login != null && cred.password != null) {
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		if (request.action == "REQUEST_LOGIN") {
			sendResponse( cred );
		}
		return true;
	} );
}