# How to use #1

1. Open <a href="https://my.tomorrowland.com/shop/worldwidepresale" target="_blank">https://my.tomorrowland.com/shop/worldwidepresale</a> page
2. Open developer console:
    - **Right click on page -> Inspect -> Console**
    - MacOS <kbd>Cmd + Option + J</kbd>
    - Windows <kbd>Alt + Shift + J</kbd>
3. Paste these **{code}** and press <kbd>Enter</kbd>

```javascript
window.open(document.querySelector('iframe').src);
```

4. Open developer console on that new window
5. Paste these **{code}** and press <kbd>Enter</kbd>

```javascript
var INJECT_SCRIPT = document.createElement('script');
INJECT_SCRIPT.src = 'https://gebeto.github.io/info/tomorrowland/checker.js';
document.body.appendChild(INJECT_SCRIPT);
```



# How to use #2
1. Open <a href="https://my.tomorrowland.com/shop/worldwidepresale" target="_blank">https://my.tomorrowland.com/shop/worldwidepresale</a> page
2. Open developer console:
    - **Right click on page -> Inspect -> Console**
    - MacOS <kbd>Cmd + Option + J</kbd>
    - Windows <kbd>Alt + Shift + J</kbd>
3. Paste these **{code}** and press <kbd>Enter</kbd>

```javascript
getJSON = function(url, successhandler)
{
    // var version = Math.floor(new Date().getTime() / 5000);
    var version = Math.floor(new Date().getTime() / 100);
    var request = new XMLHttpRequest();
    request.open('GET', url + "?" + version, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            successhandler(JSON.parse(request.responseText));
        }
    };
    request.send();
};


setInterval(fn60sec, 200);
```

