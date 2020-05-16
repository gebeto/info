#! /usr/bin/python3

import os
import re
import sys
from glob import glob
import yaml

class Category():
	template = re.compile(r"---([\w\W]+?)---")

	def __init__(self, path):
		index, *title = path.split("-")
		self.index = int(index)
		self.title = " ".join([n.capitalize() for n in title])
		self.path = path

	def __repr__(self):
		return f"Category({self.index}, {self.title}, {self.path})"

	def _get_readme(self):
		return open(os.path.join(self.path, "README.md"), "r").read()

	def _set_readme(self, data):
		return open(os.path.join(self.path, "README.md"), "w").write(data)

	@property
	def readme_config(self):
		readme = self._get_readme()
		readme_config = self.template.findall(readme)[0].strip()
		return yaml.safe_load(readme_config)

	@readme_config.setter
	def readme_config(self, config):
		yaml_dump = "\n" + yaml.dump(config).strip() + "\n"
		readme = self._get_readme()
		splitted = self.template.split(readme)
		splitted[1] = yaml_dump
		new_readme = "---".join(splitted)
		self._set_readme(new_readme)


categories_raw = glob(r"[1-9]-*")
categories = [Category(c) for c in categories_raw]

def update_category(category):
	config = category.readme_config
	print(config, category)
	config["nav_order"] = category.index
	config["title"] = category.title
	category.readme_config = config

def main():
	for category in categories:
		update_category(category)

if __name__ == '__main__':
	main()