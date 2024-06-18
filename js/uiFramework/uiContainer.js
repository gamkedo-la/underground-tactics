let views = [];

function resetViewStates() {
	for (const view of views) {
		view.resetState();
	}
}

function handleMousePosition() {
	for (const view of views) {
		view.handleMousePosition(MousePosX, MousePosY);
	}
}

var awaiting_first_click = true; // to avoid browser errors about sounds

function handleMouseClick() {
	if (awaiting_first_click) {
		console.log("first click! sound is now allowed.");
		// caveAmbienceSound.stop(); // no stop function?!
		caveAmbienceSound.play(); // already playing see main.js
		awaiting_first_click = false;
	}
	
	for (const view of views) {
		if (view.handleMouseClick(MousePosX, MousePosY)) {
			return true;
		}
	}
	return false;
}

function drawUiElements() {
	for (const view of views) {
		view.draw();
	}
}

function addView(view) {
	views.push(view);
}
