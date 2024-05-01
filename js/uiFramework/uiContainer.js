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

// TODO: put UIComboButton class in its own file
function UIComboButton(x, y, width, height) {
	UIView.call(this, x, y, width, height);
	this.image = null;
	this.title = null;

	this.textOffsetX = 5;

	this.drawCustomContent = function() {
		if (this.image) {
			canvasContext.drawImage(this.image, 0, 0);
		}
		
		if (this.title) {
			const textColor = this.isHighlighted ? 'lime' : 'red';
			colorText(this.title, this.textOffsetX, 65, textColor, "14px Arial Black");
		}
	}
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
UIComboButton.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: UIComboButton,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});

const exampleMenuThing = new UIView(10, 10, 275, 125);
exampleMenuThing.backgroundColor = 'purple';
addView(exampleMenuThing);

// TODO: create actual UILabel class
const exampleLabel = new UIView(15, 5, 150, 30);
exampleLabel.drawCustomContent = function() {
	colorText("Turn Options", 0, 20, "white", "14px Arial Black");
}
// exampleLabel.backgroundColor = 'green';
exampleMenuThing.addSubView(exampleLabel);

const useItemButton = new UIComboButton(15, 40, 50, 75);
// useItemButton.backgroundColor = 'white';
useItemButton.image = useItemPic;
useItemButton.title = "Items";
exampleMenuThing.addSubView(useItemButton);

const moveButton = new UIComboButton(80, 40, 50, 75);
// moveButton.backgroundColor = 'cyan';
moveButton.image = wizardMovementPic;
moveButton.title = "Move";
exampleMenuThing.addSubView(moveButton);

const spellBoxButton = new UIComboButton(145, 40, 50, 75);
// spellBoxButton.backgroundColor = 'pink';
spellBoxButton.image = wizardSpellPic;
spellBoxButton.title = "Spell";
exampleMenuThing.addSubView(spellBoxButton);

const endTurnButton = new UIComboButton(210, 40, 50, 75);
// endTurnButton.backgroundColor = 'gray';
endTurnButton.image = endTurnPic;
endTurnButton.title = "End Turn";
endTurnButton.textOffsetX = -10;
exampleMenuThing.addSubView(endTurnButton);
