# How to use

1. Open [https://my.tomorrowland.com/shop/worldwidepresale](https://my.tomorrowland.com/shop/worldwidepresale) page
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



