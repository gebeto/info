#! python3

from urllib import request
import json
import ssl

import argparse


def load_local():
    return json.load(open("settings-production.json", "r"))


def save_local(settings):
    json.dump(settings, open("settings-production.json", "w"), indent=4)


def load_network():
    url = "https://static-feed.tomorrowland.com/settings-production.json"
    req = request.urlopen(url, context=ssl.SSLContext())
    res = req.read()
    return json.loads(res)


def as_string(d):
    return json.dumps(d, indent=4)


def refetch():
	save_local(load_network())
	print("Successfully refetched!")


def check():
	local = as_string(load_local())
	net = as_string(load_network())
	print("IDENTICAL" if local == net else "NOT INDENTICAL")



parser = argparse.ArgumentParser(description='Check tomorrowland settings.')
parser.add_argument('--refetch', dest='refetch', action='store_const', const=refetch, help='replace local settings with fetched')
parser.add_argument('--check', dest='check', action='store_const', const=check, help='check local settings with fetched')

args = parser.parse_args()

args.refetch and args.refetch()
args.check and args.check()

