function MeleeOptionMenu(x, y, width, height) {
	UIView.call(this, x, y, width, height);

	// TODO: create actual UILabel class
	const exampleLabel = new UIView(15, 5, 150, 30);
	exampleLabel.drawCustomContent = function() {
		colorText("Turn Options", 0, 20, "white", "14px Arial Black");
	}
	this.addSubView(exampleLabel);

	//need to change this to sword attack
	const fireBoltButton = new UIComboButton(15, 40, 50, 75);
	fireBoltButton.image = meleeIconPic;
	fireBoltButton.title = "Sword";
	this.addSubView(fireBoltButton);
	fireBoltButton.onPress = () => {
		swordBoxHovering = true;
		useSword(turnNumber);
		swordBoxHovering = false;
	};
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
MeleeOptionMenu.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: MeleeOptionMenu,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});
