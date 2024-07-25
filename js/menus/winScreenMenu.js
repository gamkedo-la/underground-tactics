// comment this out in release: (this is a DEBUG KEY)
// press [N] to force instant death on the player to test the game over screen
window.addEventListener("keydown",function(e) { 
	if (e.key=="b") {
		console.log("insta-win!");
		winScreenMenu.hidden = !winScreenMenu.hidden;
	}
});

function WinScreenMenu(x, y, width, height) {
	UIView.call(this, x, y, width, height);

	const exampleLabel = new UIView(15, 5, 150, 30);
	exampleLabel.drawCustomContent = function() {
		canvasContext.globalAlpha = 0.85;
		canvasContext.drawImage(winScreenPic,0,0);
		canvasContext.globalAlpha = 1;
		colorText("CONGRATULATIONS!", 125, 32, "black", "14px Arial Black");
		colorText("You successfully explored the underground and", 32, 64, "black", "12px Arial Black");
		colorText("escaped after "+turnNumber+" turns. Nice work!", 32, 80, "black", "12px Arial Black");
	}
	this.addSubView(exampleLabel);

	const exitButton = new UIComboButton(32, 122, 50, 75);
	exitButton.image = wizardMovementPic; // FIXME: add a new icon?
	exitButton.title = "Return to Main Menu";
	this.addSubView(exitButton);
	exitButton.onPress = () => {
		console.log("win screen exit button pressed. restarting!");
		mainMenu = true;
		liveGame = false;

	};

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
DeathScreenMenu.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: DeathScreenMenu,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});
