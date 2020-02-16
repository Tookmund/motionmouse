#!/usr/bin/env python3
import pyautogui
import ifaddr
import random_word

import flask
from flask import request
from flask import render_template, send_from_directory

# Disable flask production warning
import sys
cli = sys.modules['flask.cli']
cli.show_server_banner = lambda *x: None

app = flask.Flask(__name__, static_folder = 'static')
app.config["DEBUG"] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

#pyautogui.PAUSE = 1
pyautogui.FAILSAFE = False

IP = ""
PORT = "8080"

adapters = ifaddr.get_adapters()

for adapter in adapters:
    for ip in adapter.ips:
        if isinstance(ip.ip, str):
            if not ip.ip.startswith("127."):
                IP = ip.ip

securewords = " ".join(random_word.RandomWords().get_random_words(hasDictionaryDef="true", minCorpusCount=10, minDictionaryCount=10, maxLength=10, limit=3))
securewords = securewords.lower()
print(securewords)

@app.route('/', methods=['GET', 'POST'])
def home():
	if request.method == 'GET':
            return app.send_static_file('index.html')
	else:
            x = int(float(request.form['x']))
            y = -int(float(request.form['y']))
            x *= 10
            y *= 10
            print(x, y)
            reqcode = request.form['reqcode'].strip().lower()
            if reqcode == securewords:
                pyautogui.moveRel(x, y, duration = 0.01)
            else:
                print("Incorrect Request Code!")
	return ''

@app.route('/click', methods=['POST'])
def click():
    reqcode = request.form['reqcode'].strip().lower()
    if reqcode == securewords:
        pyautogui.click()

if __name__ == "__main__":
    app.run(host=IP, port=PORT, ssl_context='adhoc')
