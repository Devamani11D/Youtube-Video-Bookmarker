console.log("foregroundjs");
let result= document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar').getAttribute("aria-valuetext");

console.log(result);

chrome.runtime.onMessage.addListener(localstorageset_req);

function localstorageset_req(msg){
    if(msg.method=="localstoragesetrequest"){
        console.log('localstorageset req forgroundjs');
    }
}