//ref: https://developer.chrome.com/docs/extensions/mv3/getstarted/
let copyButton = document.getElementById("copyButton");

// When the button is clicked
copyButton.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if(!isValidHttpUrl(tab.url)){
        alert('This page\'s url is not valid!');
        return;
    }
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getCookie,
    });
});
    
 // The body of this function will be executed as a content script inside the
 // current page
function getCookie() {
   let cookie = document.cookie;
   if(!cookie){
     alert('This page don\'t have cookie.');
     return;
    }
   const input = document.createElement('input');
   document.body.appendChild(input);
   input.value = cookie;
//    input.focus();
   input.select();
   const result = document.execCommand('copy'); 
   document.body.removeChild(input);

   if(!result){
    alert('Failed to copy cookie!');
    return;
   }

   alert("Cookie was copied to clipboard!");
}

//ref: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }