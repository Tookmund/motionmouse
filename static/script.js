var interval = 0;
function onAccel(event) {
	interval += event.interval;
	if (interval < 0.05) return;
	interval = 0;
	let x = event.acceleration.x*10;
	let y = event.acceleration.y*10;
	let z = event.acceleration.z*10;
	document.getElementById("x").innerHTML = x;
	document.getElementById("y").innerHTML = y;
	document.getElementById("z").innerHTML = z;
	document.getElementById("interval").innerHTML = event.interval;

	if (z >= 30) click("left");
	else if (z < 0 && Math.abs(z) >= 30) click("right");

	if (Math.abs(x) >= 10 || Math.abs(y) >= 10) {
		sendMotion(x, y);
	}
}

function sendMotion(x, y) {
    let xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("x="+x+"&y="+y+"&reqcode="+reqcode);
}

function click(dir) {
    let xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/click", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("button="+dir+"&reqcode="+reqcode);
}


var accelOn = false;
var reqcode = "";
function startAccel(event) {
	event.preventDefault();
	reqcode = document.getElementById("reqcode").value;
	if (accelOn) {
		window.removeEventListener("devicemotion", onAccel);
		document.getElementById("submit").innerHTML = "Start";
		accelOn = !accelOn;
		return;
	}
	accelOn = !accelOn;
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
	document.getElementById("submit").innerHTML = "Pause";
}

window.onload = function() {
	document.getElementById("accelform").addEventListener("submit", startAccel);
}
