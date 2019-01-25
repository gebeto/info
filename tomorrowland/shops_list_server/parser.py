import time
import json
import requests
from threading import Thread

url = "https://static-feed.tomorrowland.com/settings-production.json"


class Tomorrowland(object):
	"""docstring for Tomorrowland"""
	def __init__(self, url, timeout):
		super(Tomorrowland, self).__init__()
		self._timeout = timeout
		self._url = url
		self.last_update_time = time.time()
		self.delta_update_time = 0
		self.data = {}

	def _loop(self):
		response = requests.get(self._url)
		response_data = response.json()
		self.data = response_data
		current_time = time.time()
		self.delta_update_time = current_time - self.last_update_time
		self.last_update_time = current_time
		time.sleep(self._timeout)
		json.dump({
			"last_update": tomorrowland.last_update_time,
			"delta": tomorrowland.delta_update_time,
			"shops": self.data.get('shops', []),
		}, open("static/shops.json", "w"), indent=4)


	def loop(self):
		while 1:
			self._loop()


tomorrowland = Tomorrowland(url, 1)
tomorrowland.loop()

