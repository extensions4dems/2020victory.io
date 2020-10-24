'use strict';

// look for a term code.
// needs to run after native code executes so just keep checking after each click
//TODO: ends up firing twice per click, probably need to filter on source to just run once
document.addEventListener("click",
    function() {
        // wait a bit after the click so the native code has a change to run
    	setTimeout( function() {
            // term codes are in the unique tag, "kbd"
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