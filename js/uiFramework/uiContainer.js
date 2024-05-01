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

// TODO: put UIView class in its own file
function UIView(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.backgroundColor = null;
	this.isHighlighted = null;
	this.subviews = [];

	this.addSubView = function(view) {
		this.subviews.push(view);
	}

	this.resetState = function() {
		this.isHighlighted = false;

		for (const view of this.subviews) {
			view.resetState();
		}
	}

	this.handleMousePosition = function(mouseX, mouseY) {
		if (mouseX >= this.x && mouseX < this.x + this.width && mouseY >= this.y && mouseY < this.y + this.height) {
			for (const subview of this.subviews) {
				const mouseXInSub = mouseX - this.x;
				const mouseYInSub = mouseY - this.y;
				if (subview.handleMousePosition(mouseXInSub, mouseYInSub)) {
					return false;
				}
			}
			this.isHighlighted = true;
			return true;
		}
		return false;
	}

	this.draw = function() {
		canvasContext.save();
	  canvasContext.translate(this.x, this.y);

		if (this.isHighlighted) {
			colorRect(0, 0, this.width, this.height, 'yellow');
		} else if (this.backgroundColor) {
			colorRect(0, 0, this.width, this.height, this.backgroundColor);
		}

		this.drawCustomContent();

		for (const subview of this.subviews) {
			subview.draw();
		}

		canvasContext.restore();
	}

	this.drawCustomContent = function() {}
}

const exampleMenuThing = new UIView(10, 10, 300, 100);
exampleMenuThing.backgroundColor = 'purple';
addView(exampleMenuThing);

// TODO: create actual UILabel class
const exampleLabel = new UIView(5, 5, 150, 30);
exampleLabel.drawCustomContent = function() {
	colorText("New UI Thingy", 15, 20, "white", "14px Arial Black");
}
exampleLabel.backgroundColor = 'green';
exampleMenuThing.addSubView(exampleLabel);
