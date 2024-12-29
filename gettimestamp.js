var result1=document.querySelector("#movie_player > div.ytp-chrome-bottom >div.ytp-progress-bar-container >div.ytp-progress-bar").getAttribute("aria-valuetext");

var temparr=result1.split(" ");

var tshhmmss_string;
for(let time of temparr)
{
    console.log(time);
    // console.log("\n")
}

if(temparr[6] == "Hours"){
    tshhmmss_string = "00:"+ temparr[0] +":"+temparr[2];

}else if(temparr[1]=="Hours"){
    tshhmmss_string = temparr[0] + ":" + temparr[2] + ":" + temparr[4]; 
}
else if(temparr[6]=="Minutes"){
    tshhmmss_string ="00:"+temparr[0]+":"+temparr[2];

}
console.log("gettimestamp.js "+result1);

var windowlink=window.location.href;

console.log("gettimestampjs window link is "+windowlink);

var idx=windowlink.indexOf("v=");

console.log("gettimestampjs window link index is "+idx);

function getseconds(timestamphhmmss){
    var x=timestamphhmmss.split(":");
    var seconds=parseInt(x[0])*60*60 +parseInt(x[1])*60 +parseInt(x[2]);
    console.log("seconds calculated in gettimestampjs is "+seconds);

    return seconds;
}

var timeinseconds= getseconds(tshhmmss_string);

var windowlinkfinal;

if(idx==-1){
    console.log("It is likely not a video hosted on Youtube!");
    windowlink="https://youtube.com";

}else{
    windowlinkfinal="https://youtube.com/watch?v="+windowlink.substr(idx+2,11)+"&t="+timeinseconds;
    console.log("gettimestamp windowlinkfinal "+windowlinkfinal);
}

chrome.runtime.sendMessage({
    method:"sendtimestamptobg",
    tsvalue:tshhmmss_string,
    finallink:windowlinkfinal
});