var x = 0;
var y = 0;
var z = 0;
var interval = 0;
function getDist(a, t) {
	return 0.5*a*(t*t);
}

const MULTFACTOR = 10000;
function onAccel(event) {
	let distx = getDist(event.acceleration.x, event.interval)*MULTFACTOR;
	let disty = getDist(event.acceleration.y, event.interval)*MULTFACTOR;
	let distz = getDist(event.acceleration.z, event.interval)*MULTFACTOR;
	document.getElementById("x").innerHTML = distx;
	document.getElementById("y").innerHTML = disty;
	document.getElementById("z").innerHTML = distz
	document.getElementById("interval").innerHTML = event.interval;

	x += distx;
	y += disty;
	z += distz;
	interval += event.interval;

	if (interval >= 0.1) {
		sendMotion(x, y);
		x = 0;
		y = 0;
		z = 0;
		interval = 0;
	}
}

function sendMotion(x, y) {
    let xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("x="+x+"&y="+y+"&reqcode="+reqcode);
}


var reqcode = "";
function startAccel(event) {
	event.preventDefault();
	reqcode = document.getElementById("reqcode").value;
	try {
		DeviceMotionEvent.requestPermission().then(state => {
			if (state == "granted") {
				window.addEventListener("devicemotion", onAccel);
			} else {
				alert("Require Device Motion!");
			}
		}).catch(alert);
	} catch(error) {
		try {
			window.ondevicemotion = onAccel;
		} catch(error) {
			alert(error);
		}
	}
}

window.onload = function() {
	document.getElementById("accelform").addEventListener("submit", startAccel);
}
