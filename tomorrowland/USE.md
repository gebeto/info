## How to use

 - Open your [WORLD WIDE PRESALE](https://my.tomorrowland.com/shop/worldwidepresale) page
 - Open developer console (<kbd>ctrl</kbd><kbd>i</kbd>) (<kbd>⌘</kbd><kbd>i</kbd>)



## Links
 - https://worldwide-presale.tomorrowland.com/js/fallback.js
 - https://my.tomorrowland.com/shop/worldwidepresale





## V
```javascript
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
```