from urllib import request
import json
import ssl


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


local = as_string(load_local())
net = as_string(load_network())
print("IDENTICAL" if local == net else "NOT INDENTICAL")
