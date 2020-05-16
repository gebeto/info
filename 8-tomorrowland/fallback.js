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