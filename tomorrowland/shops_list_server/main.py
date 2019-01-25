from flask import Flask
from flask import jsonify
from flask import url_for
from flask import render_template


app = Flask(__name__)


@app.route('/')
def index():
	url_for('static', filename='main.js')
	return render_template('index.html')

@app.route('/stop')
def stop():
	tomorrowland.stop()
	return render_template('action.html')

@app.route('/data')
def data():
	return jsonify(tomorrowland.data)


@app.route('/shops')
def shops():
	return jsonify({
		"last_update": tomorrowland.last_update_time,
		"delta": tomorrowland.delta_update_time,
		"shops": tomorrowland.data.get('shops', [])
	})


app.run()
