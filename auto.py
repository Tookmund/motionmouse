import pyautogui
import flask
from flask import request
from flask import render_template, send_from_directory

#width 3840, height 2160

app = flask.Flask(__name__, static_folder = 'static')
app.config["DEBUG"] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

pyautogui.PAUSE = 1
pyautogui.FAILSAFE = True

@app.route('/', methods=['GET', 'POST'])
def home():
	if request.method == 'GET':
		return app.send_static_file('index.html')
	else:
		x = int(float(request.form['x']))
		y = int(float(request.form['y']))
		print(x, y)
		pyautogui.moveRel(x, y, duration = 0.25)
	return ''

app.run(host="0.0.0.0", port="8080")
