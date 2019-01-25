from flask import Flask
from flask import jsonify
from flask import url_for
from flask import render_template

import json


app = Flask(__name__)


@app.route('/')
def index():
	url_for('static', filename='main.js')
	return render_template('index.html')
	

app.run()
