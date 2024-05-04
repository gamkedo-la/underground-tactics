function UIView(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.backgroundColor = null;
	this.isHighlighted = null;
	this.highlightColor = null;
	this.userInteractionEnabled = true;
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

		if (this.isHighlighted && this.highlightColor) {
			colorRect(0, 0, this.width, this.height, this.highlightColor);
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
