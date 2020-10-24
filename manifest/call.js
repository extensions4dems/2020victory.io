'use strict';

document.addEventListener("click",
    function() {
    	setTimeout( function() {
    		var kbdEls = document.getElementsByTagName("kbd");
    		if (kbdEls.length > 0) { 
    			var termcodes = [];
    			for (var i = 0; i < kbdEls.length; i++) {
    				termcodes.push( kbdEls[i].innerText );
    			}
				chrome.runtime.sendMessage( {action: "SET_TERMCODE", termcodes: termcodes}, function(response) {} );
    		}
		}, 200 );
	}, false
);