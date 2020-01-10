import requests
import time
import os

ignores = []
msg_url = "https://scale.fallback.tomorrowland.com/wwpresale.json";

while 1:
	v = int(time.time())
	response = requests.get("{}?{}".format(msg_url, v)).json()
	print v, response
	redirect = response.get('REDIRECT')
	if redirect and not redirect in ignores:
		os.system("open {}".format(redirect))
		ignores.append(redirect)


# https://static-feed.tomorrowland.com/settings-production.json?t=26311464