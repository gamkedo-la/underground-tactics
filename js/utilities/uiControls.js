var spacebarMoveWasRequested = false; // an alternative to clicking the move button

const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_SPACEBAR = 32; 
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_P = 80;
const KEY_1 = 49;
const KEY_M = 77;
const KEY_2 = 50;
var MousePosX;
var MousePosY;

// mouse clicks and spacebar can fire this
function executeCommand(){
		if(charList[turnNumber].isHuman){
			turnAdvance();
			charWalk(turnNumber);
			displaySpells();
			displayItems();
			useFireBolt(turnNumber);
			shootArrow(turnNumber);
			// charList[turnNumber].fireBolt();
		//	charList[turnNumber].levitate(); 
		}
}

function initInput(){
	
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
	
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});

	canvas.addEventListener('mousedown', function(evt){
		if (handleMouseClick()) { return }
		console.log("click")
		executeCommand();
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function keyPressed(evt) {
	if(charList[turnNumber].isHuman){
		setKeyHoldState(evt.keyCode, charList[turnNumber], true);
	}
	evt.preventDefault();
	
	var paused = KEY_P;
	var toggleMovement = KEY_SPACEBAR;
	var toggleDrawTileIndicators = KEY_1;
	var mute = KEY_M;
	var playBackgroundMusic = KEY_2;

	if(KEY_I == evt.keyCode){
		roomChange(0,-1);
	}
	if(KEY_J == evt.keyCode){
		roomChange(-1,0);
	}
	if(KEY_K == evt.keyCode){
		roomChange(0,1);
	}
	if(KEY_L == evt.keyCode){
		roomChange(1,0);
	}
	
	if(paused == evt.keyCode){
		changePauseState();
	}
	if(toggleDrawTileIndicators == evt.keyCode){
		drawTileIndicators = !drawTileIndicators;
		footstepsSound.play();
		console.log(drawTileIndicators)
	}
	if(mute == evt.keyCode) {
		toggleMute();
	}

	if(playBackgroundMusic == evt.keyCode){
		mainBackgroundMusic.loopSong("Mx_UGT_Theme_MainMenu"); 
	}

	if (toggleMovement == evt.keyCode) {
		// see initiative.js line 115 ish
		spacebarMoveWasRequested = true;
		executeCommand(); // don't wait for a mouse click
	}

}

function keyReleased(evt) {
	if(charList[turnNumber].isHuman){
		setKeyHoldState(evt.keyCode, charList[turnNumber], false);
	}
}


function setKeyHoldState(thisKey, thisWarrior, setTo) {
	
	if(thisKey == thisWarrior.controlKeyForNorth
		|| thisKey == thisWarrior.controlKeyForNorth2){
		thisWarrior.keyHeld_North = setTo;
	}
	if(thisKey == thisWarrior.controlKeyForEast
		|| thisKey == thisWarrior.controlKeyForEast2){
		thisWarrior.keyHeld_East = setTo;
	}
	if(thisKey == thisWarrior.controlKeyForSouth
		|| thisKey == thisWarrior.controlKeyForSouth2){
		thisWarrior.keyHeld_South = setTo;
	}
	
	if(thisKey == thisWarrior.controlKeyForWest
		|| thisKey == thisWarrior.controlKeyForWest2){
		thisWarrior.keyHeld_West = setTo;
	}
}

function changePauseState(){
	pauseScreen = !pauseScreen;
	liveGame = !pauseScreen;
}
