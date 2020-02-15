import pyautogui
import flask
from flask import request
from flask import render_template, send_from_directory

#width 3840, height 2160

app = flask.Flask(__name__, static_folder = 'static')
app.config["DEBUG"] = True 
pyautogui.PAUSE = 1
pyautogui.FAILSAFE = True

# #for i in range(1):
# 	pyautogui.moveTo(100, 100, duration=0.25)
# 	pyautogui.moveTo(500, 100, duration=0.25)
# 	pyautogui.moveTo(500, 500, duration=0.25)
# 	pyautogui.moveTo(100, 500, duration=0.25)

@app.route('/', methods=['GET', 'POST'])
def home():
	if request.method == 'GET':
		return app.send_static_file('index.html')
	else:
		x = int(request.form['x'])
		y = int(request.form['y'])
		print(x, y)
		pyautogui.moveRel(x, y, duration = 0.25)
	return ''

app.run()