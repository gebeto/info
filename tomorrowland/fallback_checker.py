import requests
import time
import os

ignores = []
msg_url = "https://scale.fallback.tomorrowland.com/wwpresale.json";

while 1:
	v = int(time.time())
	response = requests.get("{}?{}".format(msg_url, v)).json()
	print v, response
	redirect = response.get('REDIRECT', 'https://google.com')
	if redirect and not redirect in ignores:
		os.system("open {}".format(redirect))
		ignores.append(redirect)

# getJSON = function(url, successhandler)
# {
#     var version = Math.floor(new Date().getTime() / 5000);
#     var request = new XMLHttpRequest();
#     request.open('GET', url + "?" + version, true);
#     request.onload = function() {
#         if (request.status >= 200 && request.status < 400) {
#             successhandler(JSON.parse(request.responseText));
#         }
#     };
#     request.send();
# };

# fn60sec = function()
# {
#     getJSON(MsgUrl, function(data) {
#         if (typeof data.REDIRECT !== "undefined") {
#             window.location.href = data.REDIRECT;
#         }

#         var ObjectToChange = data.OVERRIDE.toString();

#         if (ObjectToChange === "HeaderMsg") {
#             HeaderMsg.innerHTML = data.HTML.toString();
#             HeaderMsg.style.visibility = "visible";
#         }

#         if (ObjectToChange === "PopUp") {
#             PopMsg.innerHTML = data.HTML.toString();
#             PopMsg.style.visibility = "visible";
#             document.body.className = originalBodyClass + ' popup-active';
#         }

#         if (ObjectToChange === "NO") {
#             HeaderMsg.style.visibility = "hidden";
#             PopMsg.style.visibility = "hidden";
#             document.body.className = originalBodyClass;
#         }
#     });
# };

# fn60sec();
# setInterval(fn60sec, 30000);