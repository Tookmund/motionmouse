import pyautogui
import ifaddr

import flask
from flask import request
from flask import render_template, send_from_directory

app = flask.Flask(__name__, static_folder = 'static')
app.config["DEBUG"] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

pyautogui.PAUSE = 1
pyautogui.FAILSAFE = False

IP = ""
PORT = "8080"

adapters = ifaddr.get_adapters()

for adapter in adapters:
    for ip in adapter.ips:
        if isinstance(ip.ip, str):
            if not ip.ip.startswith("127."):
                IP = ip.ip

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

app.run(host=IP, port=PORT, ssl_context='adhoc')
