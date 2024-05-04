function MainOptionsMenu(x, y, width, height) {
	UIView.call(this, x, y, width, height);

	// TODO: create actual UILabel class
	const exampleLabel = new UIView(15, 5, 150, 30);
	exampleLabel.drawCustomContent = function() {
		colorText("Turn Options", 0, 20, "white", "14px Arial Black");
	}
	// exampleLabel.backgroundColor = 'green';
	this.addSubView(exampleLabel);

	const useItemButton = new UIComboButton(15, 40, 50, 75);
	// useItemButton.backgroundColor = 'white';
	useItemButton.image = useItemPic;
	useItemButton.title = "Items";
	this.addSubView(useItemButton);

	const moveButton = new UIComboButton(80, 40, 50, 75);
	// moveButton.backgroundColor = 'cyan';
	moveButton.image = wizardMovementPic;
	moveButton.title = "Move";
	this.addSubView(moveButton);

	const spellBoxButton = new UIComboButton(145, 40, 50, 75);
	// spellBoxButton.backgroundColor = 'pink';
	spellBoxButton.image = wizardSpellPic;
	spellBoxButton.title = "Spell";
	this.addSubView(spellBoxButton);

	const endTurnButton = new UIComboButton(210, 40, 50, 75);
	// endTurnButton.backgroundColor = 'gray';
	endTurnButton.image = endTurnPic;
	endTurnButton.title = "End Turn";
	endTurnButton.textOffsetX = -10;
	this.addSubView(endTurnButton);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
MainOptionsMenu.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: MainOptionsMenu,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});