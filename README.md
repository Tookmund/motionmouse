# Motion Mouse
Move your mouse by moving your phone

## How to Install

### Requirements
Python 3

venv module (Included in most installs by default)

### Install webserver
```
git clone https://github.com/Tookmund/motionmouse
cd motion mouse
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 auto.py
```

This will create output that looks like:
```
words are here
 * Running on https://192.0.2.2:8080/ (Press CTRL+C to quit)
```

Open the website (`https://192.0.2.2:8080/`) on your phone, clicking through any certificate warnings as the app generates
a self-signed certificate on every run.

Then type the words (`words are here`) in the request code box and press start.
Your mouse will start being controlled by your phone.

X and Y acceleration control the X and Y position of the mouse.

Z acceleration controls mouse clicking. Large positive acceleration (screen away from you) triggers a left click and
large negative acceleration (screen towards you) triggers a right click.
