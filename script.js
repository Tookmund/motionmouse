function onAccel(event) {
	document.getElementById("x").innerHTML = event.accleration.x;
	document.getElementById("y").innerHTML = event.accleration.y;
	document.getElementById("z").innerHTML = event.accleration.z;
	document.getElementById("interval").innerHTML = event.interval;
}


function startAccel() {
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
