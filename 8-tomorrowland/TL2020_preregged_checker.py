from urllib import urlopen
import json
import uuid
import time
import os

url = "https://static-feed.tomorrowland.com/settings-production.json?t=26311464"


class Checker():
	value = "#"

	def _check(self):
		j = json.loads(urlopen(url).read())
		infoBoxes = j["infoBoxes"]
		TL2020 = filter(lambda x: x["id"] in ["tomorrowland2020-preregged", "tomorrowland2020-prereg"], infoBoxes)[0]
		buttons = TL2020["buttons"]
		button = buttons[0]
		button_url = button["url"]
		# _url = button_url if self.value == "#" else self.value
		_url = button_url
		if _url != "#":
			os.system("open {}".format(_url))
			print(_url)
			exit(0)
		return _url

	def check_loop(self):
		while True:
			val = self._check()
			print("CHECKing... {}".format(val))
			time.sleep(1)


from threading import Thread

checker = Checker()

thread = Thread(target=checker.check_loop)
thread.start()
thread._Thread__stop()

while True:
	checker.value = raw_input()
	if value == "e": exit(0)
	if value == "u": checker.value = "https://google.com"
