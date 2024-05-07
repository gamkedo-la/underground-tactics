function SpellOptionsMenu(x, y, width, height) {
	UIView.call(this, x, y, width, height);

	// TODO: create actual UILabel class
	const exampleLabel = new UIView(15, 5, 150, 30);
	exampleLabel.drawCustomContent = function() {
		colorText("Turn Options", 0, 20, "white", "14px Arial Black");
	}
	this.addSubView(exampleLabel);

	const fireBoltButton = new UIComboButton(15, 40, 50, 75);
	fireBoltButton.image = spellFirePic;
	fireBoltButton.title = "Fire Bolt";
	this.addSubView(fireBoltButton);

	const magicMissileButton = new UIComboButton(80, 40, 50, 75);
	magicMissileButton.image = magicMissilePic;
	magicMissileButton.title = "Spell";
	this.addSubView(magicMissileButton);

	const endTurnButton = new UIComboButton(145, 40, 50, 75);
	endTurnButton.image = endTurnPic;
	endTurnButton.title = "End Turn";
	endTurnButton.textOffsetX = -10;
	this.addSubView(endTurnButton);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
SpellOptionsMenu.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: SpellOptionsMenu,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});
