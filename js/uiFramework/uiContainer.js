let views = [];

function drawUiElements() {
	for (const view of views) {
		view.draw();
	}
}

function addView(view) {
	views.push(view);
}

// TODO: put UIView class in its own file
function UIView(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function() {
		canvasContext.save();
	  canvasContext.translate(this.x, this.y);

		// TODO: UIView class should have customizable content
		colorRect(0, 0, 300, 100, 'purple');
		colorText("New UI Thingy", 15, 20, "white", "14px Arial Black");

		canvasContext.restore();
	}
}

const exampleMenuThing = new UIView(10, 10, 400, 400);
addView(exampleMenuThing);
