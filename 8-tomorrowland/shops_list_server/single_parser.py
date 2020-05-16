import re
import os
import time
import json
import requests
from threading import Thread
from datetime import datetime

url = "https://static-feed.tomorrowland.com/settings-production.json"
available_re = r"available"


ignore = [
	None,
	"#",
	"/shop/erasmus",
	"/shop/first20",
	"/shop/rupelstreekshop",
	"http://waitinglist.tomorrowlandwinter.com",
	"https://friends.winterpackages.tomorrowland.com/",
	"https://globaljourney.tomorrowland.com",
	"https://queue.paylogic.com/127866/11647",
	"https://rupelverkoop.tomorrowland.com/",
	"https://sso-queue.tomorrowland.com/?eventId=102701&posId=10610",
	"https://sso-queue.tomorrowland.com/?eventId=102701&posId=522",
	"https://sso-queue.tomorrowland.com/?eventId=127801&posId=11647",
	"https://sso-queue.tomorrowland.com/?eventId=127829&posId=11647",
	"https://store.tomorrowland.com/?utm_source=my.tomorrowland.com&utm_medium=referral&utm_campaign=mytml&utm_content=bttn",
	"https://winterpackages.tomorrowland.com",
]


def open_url(title, url):
	print(title, "   -", url)
	ignore.append(url)
	# os.system("open {}".format(url))


def check_shops(data):
	for shop in data.get('shops', []):
		url = shop.get('shopUrl')
		if url in ignore: continue
		open_url(shop.get('id'), url)


def check_sale_info(data):
	for key, info in data.get('saleInfo', {}).items():
		url = info.get('shopUrl')
		if url in ignore: continue
		open_url(info.get('id'), url)
		

def check_info_boxes(data):
	for box in data.get('infoBoxes', []):
		buttons = box.get('buttons', [])
		for btn in buttons:
			# url = btn.get('url')
			url = btn['url']
			if url in ignore: continue
			open_url(box.get('title'), url)
			
			


def _loop():
	print("#")
	response = requests.get(url)
	response_data = response.json()
	check_info_boxes(response_data)
	check_shops(response_data)
	check_sale_info(response_data)


def loop():
	while 1:
		_loop()


loop()

