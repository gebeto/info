import time
import json
import requests
from threading import Thread
from datetime import datetime

url = "https://static-feed.tomorrowland.com/settings-production.json"

class Tomorrowland(object):
	"""docstring for Tomorrowland"""
	def __init__(self, url, timeout):
		super(Tomorrowland, self).__init__()
		self._timeout = timeout
		self._url = url
		self.update_time = datetime.now().ctime()
		self.data = {}

	def _loop(self):
		response = requests.get(self._url)
		response_data = response.json()
		self.data = response_data
		self.update_time = datetime.now().ctime()
		time.sleep(self._timeout)
		open("static/update.txt", "w").write(self.update_time)
		json.dump(self.data.get('shops', []), open("static/shops.json", "w"), indent=4)
		json.dump(self.data.get('infoBoxes', []), open("static/infoBoxes.json", "w"), indent=4)
		json.dump(self.data, open("static/all.json", "w"), indent=4)


	def loop(self):
		while 1:
			self._loop()


tomorrowland = Tomorrowland(url, 1)
tomorrowland.loop()

