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

function drawUiElements() {
	for (const view of views) {
		view.draw();
	}
}

function addView(view) {
	views.push(view);
}
