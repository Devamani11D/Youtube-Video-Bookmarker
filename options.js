"use strict";

let page=document.getElementById('buttonDiv');

const kButtonColors=['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors){
    for(let color of kButtonColors){
        let button=document.createElement('button');
        button.style.backgroundColor=color;
        button.addEventListener('click',function(){
            chrome.storage.sync.set({color:color},function(){
                console.log("color : "+color);
            })
        });
        page.appendChild(button);
    }
}
constructOptions(kButtonColors);