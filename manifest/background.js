'use strict';

// repeats runtime messages so that the iframes can communicate with each other
//TODO: throws an error when the page closes, that probably shouldn't happen
chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            reply( response );
        });  
    });
    return true;
});