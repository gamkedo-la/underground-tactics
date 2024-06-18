function PotionOptionsMenu(x, y, width, height) {
	UIView.call(this, x, y, width, height);

	// TODO: create actual UILabel class
	const exampleLabel = new UIView(15, 5, 150, 30);
	exampleLabel.drawCustomContent = function() {
		colorText("Turn Options", 0, 20, "white", "14px Arial Black");
	}
	this.addSubView(exampleLabel);

	const manaButton = new UIComboButton(15, 40, 50, 75);
	manaButton.image = manaPotionPic;
	manaButton.title = "Mana";
	this.addSubView(manaButton);
	manaButton.onPress = () => {
		console.log('"Mana" button pressed');
		textBoxUI.text = "You drink a mana potion.";
		manaPotionSound.play();

	};

	const levitationButton = new UIComboButton(80, 40, 50, 75);
	levitationButton.image = healthPotionPic;
	levitationButton.title = "Levitation";
	this.addSubView(levitationButton);
	levitationButton.onPress = () => {
		console.log('"Levitation" button pressed');
		textBoxUI.text = "You drink a levitation potion.";
		levitationPotionSound.play();

	};

	const endTurnButton = new UIComboButton(145, 40, 50, 75);
	endTurnButton.image = endTurnPic;
	endTurnButton.title = "End Turn";
	endTurnButton.textOffsetX = -10;
	this.addSubView(endTurnButton);
	endTurnButton.onPress = () => {
		console.log('"End Turn" button pressed');

		endTurnBoxHovering = true;
		turnAdvance();
		endTurnBoxHovering = false;
	};
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
PotionOptionsMenu.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: PotionOptionsMenu,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});
