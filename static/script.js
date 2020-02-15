var x = 0;
var y = 0;
var z = 0;
var interval = 0;

function onAccel(event) {
	document.getElementById("x").innerHTML = event.acceleration.x;
	document.getElementById("y").innerHTML = event.acceleration.y;
	document.getElementById("z").innerHTML = event.acceleration.z;
	document.getElementById("interval").innerHTML = event.interval;

	x += event.acceleration.x*100;
	y += event.acceleration.y*100;
	z += event.acceleration.z*100;
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
