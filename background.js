"use strict";

chrome.runtime.onMessage.addListener(checktimestamp);

function checktimestamp(msg){
    if(msg.method =="gettimestampforcurrentpoint"){
        console.log("get timestamp method called");
        chrome.tabs.executeScript(null,{
            file:"./gettimestamp.js"
        },()=>{
            console.log("injected file into YT window dom");
        })
    }
}

chrome.tabs.onActivated.addListener((tab)=>{
    console.log(tab);
    chrome.tabs.get(tab.tabId,(c)=>{
        if(/^https:\/\/www\.youtube\.com/.test(c.url)){
            chrome.tabs.executeScript(null, { file: "./foreground.js" }, () => { 
                console.log("i injected fg using bg script in youtube webpages"); 
              }); 
        }
    });
});

chrome.runtime.onMessage.addListener(getcurrenttimestamp);

function getcurrenttimestamp(msg){
    if(msg.method=="sendtimestamptobg"){
        var temp1=msg.tsvalue;
        var temp2=msg.finallink;
        console.log("msg.tsvalue value: " + msg.tsval); 
    console.log("msg.finallink " + msg.finallink); 
    chrome.runtime.sendMessage({method:"tsfind",
        tsvaltopopup:temp1,
        fl:temp2

    });

    }

}

chrome.runtime.onMessage.addListener(localstorageset);

function localstorageset(msg){
    if(msg.method=="setlocalstorage"){
        console.log('setlocalstorage backgroundjs');
    }
}