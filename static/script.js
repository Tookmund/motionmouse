function onAccel(event) {
	document.getElementById("x").innerHTML = event.acceleration.x;
	document.getElementById("y").innerHTML = event.acceleration.y;
	document.getElementById("z").innerHTML = event.acceleration.z;
	document.getElementById("interval").innerHTML = event.interval;
}


function startAccel(event) {
	event.preventDefault();
	let reqcode = document.getElementById("reqcode").value;
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
