# How to use

 - Open [https://my.tomorrowland.com/shop/worldwidepresale](https://my.tomorrowland.com/shop/worldwidepresale) page
 - Open developer console:
  1. **Right click on page -> Inspect -> Console**
  2. Shortcut
   - MacOS <kbd>Cmd + Option + J</kbd>
   - Windows <kbd>Cmd + Shift + J</kbd>
 - Paste these **{code}** and press <kbd>Enter</kbd>
```javascript
window.open('your link', document.querySelector('iframe').src);
```
 - Open developer console on that new window
 - Paste these **{code}** and press <kbd>Enter</kbd>
```javascript
var INJECT_SCRIPT = document.createElement('script');
INJECT_SCRIPT.src = 'https://gebeto.github.io/info/tomorrowland/checker.js';
document.body.appendChild(INJECT_SCRIPT);
```





## Get your own direct link
 1. Open your [WORLD WIDE PRESALE](https://my.tomorrowland.com/shop/worldwidepresale) page
 2. Open developer console (<kbd>ctrl + i</kbd>) (<kbd>⌘ + i</kbd>)
 3. Paste these *{data}* and press <kbd>Enter</kbd>
<details><summary><strong>{{ data }}</strong></summary>
<p>

```javascript
prompt('your link', document.querySelector('iframe').src);
```

</p>
</details>

## Links
 - https://queue.paylogic.com/127968/2993/?

 - iframe - https://queue.paylogic.com/127968/2993/?#pld=eJxFj8sOgjAQRX-FdKuQAkHAlX6A7lzohgxtpQ19mLaYEOO_OzUmLu-5Z24yL3JXPsTBghFkT67gXdDwJFui4Y_PK5MzaIdYGFAaUbLUXNhfc5gSL5gz6EzCcuFRKjGMykc5cIhpqOz7Nqd9XlbYPKSzYrCLGb_ypu5o31K6a6u6wxo49yIEbE7gDQQJWVk3WTp0IYIemONps6Nt3SBlKq4Yb2jOKn3A3GKjT-xyJO8P7wFJbQ%253D%253D

 - https://queue.paylogic.com/127968/2993/?#pld=eJxFj8sOgjAQRX-FdKuQAkHAlX6A7lzohgxtpQ19mLaYEOO_OzUmLu-5Z24yL3JXPsTBghFkT67gXdDwJFui4Y_PK5MzaIdYGFAaUbLUXNhfc5gSL5gz6EzCcuFRKjGMykc5cIhpqOz7Nqd9XlbYPKSzYrCLGb_ypu5o31K6a6u6wxo49yIEbE7gDQQJWVk3WTp0IYIemONps6Nt3SBlKq4Yb2jOKn3A3GKjT-xyJO8P7wFJbQ%3D%3D

 - https://queue.paylogic.com/127968/2993/?#pld=eJxFj8sOgjAQRX-FdKuQAkHAlX6A7lzohgxtpQ19mLaYEOO_OzUmLu-5Z24yL3JXPsTBghFkT67gXdDwJFui4Y_PK5MzaIdYGFAaUbLUXNhfc5gSL5gz6EzCcuFRKjGMykc5cIhpqOz7Nqd9XlbYPKSzYrCLGb_ypu5o31K6a6u6wxo49yIEbE7gDQQJWVk3WTp0IYIemONps6Nt3SBlKq4Yb2jOKn3A3GKjT-xyJO8P7wFJbQ%3D%3D


 - https://worldwide-presale.tomorrowland.com/js/fallback.js
 - https://queue.paylogic.com/application.js?v=430126

 - https://my.tomorrowland.com/shop/worldwidepresale



## IFRAME
```javascript
console.log('https://queue.paylogic.com/127968/2993/?' + encodeURI(decodeURI(location.search.replace('?', '&'))) + encodeURI(decodeURI(location.hash)) + ');
```



## Get json function
<details>
<summary>Fallback.js</summary>
<p>

 - Original: [https://worldwide-presale.tomorrowland.com/js/fallback.js](https://worldwide-presale.tomorrowland.com/js/fallback.js)

```javascript
var HeaderMsg = document.getElementById("HeaderMsg");
var PopMsg = document.getElementById("PopUp");
var MsgUrl = "https://scale.fallback.tomorrowland.com/wwpresale.json";
var originalBodyClass = document.body.className;

getJSON = function(url, successhandler)
{
    var version = Math.floor(new Date().getTime() / 5000);
    var request = new XMLHttpRequest();
    request.open('GET', url + "?" + version, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            successhandler(JSON.parse(request.responseText));
        }
    };
    request.send();
};

fn60sec = function()
{
    getJSON(MsgUrl, function(data) {
        if (typeof data.REDIRECT !== "undefined") {
            window.location.href = data.REDIRECT;
        }

        var ObjectToChange = data.OVERRIDE.toString();

        if (ObjectToChange === "HeaderMsg") {
            HeaderMsg.innerHTML = data.HTML.toString();
            HeaderMsg.style.visibility = "visible";
        }

        if (ObjectToChange === "PopUp") {
            PopMsg.innerHTML = data.HTML.toString();
            PopMsg.style.visibility = "visible";
            document.body.className = originalBodyClass + ' popup-active';
        }

        if (ObjectToChange === "NO") {
            HeaderMsg.style.visibility = "hidden";
            PopMsg.style.visibility = "hidden";
            document.body.className = originalBodyClass;
        }
    });
};

fn60sec();
setInterval(fn60sec, 30000);
```

</p>
</details>
