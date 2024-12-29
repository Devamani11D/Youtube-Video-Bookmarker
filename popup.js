'use strict';

// $(function(){

// })

$('#bookmarkdesc').focus(function(){
    console.log('focus bookmark description input field')

    chrome.runtime.sendMessage({method:"gettimestampforcurrentpoint"});

    chrome.runtime.onMessage.addListener(tsvalue);


    var ts,tslink;

    function tsvalue(msg){
        if(msg.method == "tsfind"){
            ts=msg.tsvaltopopup;
            tslink=msg.fl;

            $('#submitbookmark').on('click',function(){
                var bookmarkinput=$('#bookmarkdesc').val();
                const bookmark={timestamp:ts,description:bookmarkinput,link:tslink};

                chrome.storage.local.get({bookmarks:[]},(data)=>{
                    const bookmarks= data.bookmarks;
                    bookmarks.push(bookmark);
                    chrome.storage.local.set({bookmarks},()=>{
                        console.log("Bookmark saved");
                        displayBookmark(bookmark)
                    })
                })
            });

            $('#currts').text(msg.tsvaltopopup)
            $('#receiptts').text('got timestamp')

            
        }
    }
});

function displayBookmark(bookmark){
    $('#bookmark_ulist').append(
        `<li><span>${bookmark.timestamp} - <a href="${bookmark.link}" target="_blank">${bookmark.description}</a></span></li>`
    );
}
$(document).ready(()=>{
    chrome.storage.local.get({bookmarks:[]},(data)=>{
        data.bookmarks.forEach(displayBookmark);
    });
})