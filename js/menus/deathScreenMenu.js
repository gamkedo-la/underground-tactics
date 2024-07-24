// comment this out in release: (this is a DEBUG KEY)
// press [N] to force instant death on the player to test the game over screen
window.addEventListener("keydown",function(e) { 
	if (e.key=="n") {
		console.log("insta-kill!");
		deathScreenMenu.hidden = !deathScreenMenu.hidden;
	}
});

function DeathScreenMenu(x, y, width, height) {
	UIView.call(this, x, y, width, height);

	const exampleLabel = new UIView(15, 5, 150, 30);
	exampleLabel.drawCustomContent = function() {
		canvasContext.globalAlpha = 0.85;
		canvasContext.drawImage(gameOverPic,0,0);
		canvasContext.globalAlpha = 1;
		colorText("GAME OVER", 155, 32, "white", "14px Arial Black");
		colorText("Another adventurer lost to the underground. You died", 32, 64, "white", "12px Arial Black");
		colorText("after "+turnNumber+" turns and reached as far as level XX.", 32, 80, "white", "12px Arial Black");
	}
	this.addSubView(exampleLabel);

	const exitButton = new UIComboButton(32, 122, 50, 75);
	exitButton.image = wizardMovementPic; // FIXME: add a new icon?
	exitButton.title = "Return to Main Menu";
	this.addSubView(exitButton);
	exitButton.onPress = () => {
		console.log("game over exit button pressed. restarting!");
		mainMenu = true;
		liveGame = false;
		location.reload();
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
