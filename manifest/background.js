'use strict';

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            reply( response );
        });  
    });
    return true;
});