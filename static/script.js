var interval = 0;
function onAccel(event) {
	interval += event.interval;
	if (interval < 0.1) return;
	interval = 0;
	let x = event.acceleration.x*10;
	let y = event.acceleration.y*10;
	document.getElementById("x").innerHTML = x;
	document.getElementById("y").innerHTML = y;
	document.getElementById("interval").innerHTML = event.interval;

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
