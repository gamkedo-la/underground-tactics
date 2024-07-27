var spacebarMoveWasRequested = false; // an alternative to clicking the move button

const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_C = 67;
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

var showCredits = false;

// mouse clicks and spacebar can fire this
function executeCommand(){
		if(charList[turnNumber].isHuman){
			turnAdvance();
			charWalk(turnNumber);
			displaySpells();
			displayItems();
			useFireBolt(turnNumber);
			shootArrow(turnNumber);
			useSword(turnNumber);
			// charList[turnNumber].fireBolt();
		//	charList[turnNumber].levitate(); 
		}
}

function fromTitleScreenToGameplay() {
	mainMenu = false;
	liveGame = true;
	deathScreenMenu.hidden = true;
}

function initInput(){
	
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
	
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});

	canvas.addEventListener('mousedown', function(evt){
		if(mainMenu) {
			if(showCredits) {
				fromTitleScreenToGameplay();
			}
			return;
		}
		if (handleMouseClick()) { return }
		console.log("click")
		executeCommand();
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function keyPressed(evt) {
	if(mainMenu) {
		if(evt.keyCode == KEY_SPACEBAR) {
			fromTitleScreenToGameplay();
		} else if(evt.keyCode == KEY_C) {
			showCredits = true;
		}
		return;
	}
	if (!charList[turnNumber]) {
		console.log("ERROR: charList for turnNumber "+turnNumber+" is null.");
	}
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
	if(turnNumber >= 0 && turnNumber < charList.length && charList[turnNumber].isHuman){
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

  creditsList = [
"Vince McKeown: Project lead, core gameplay, isometric view and turn-based movement system, main environment art, potions, spells, world design, projectile functionality, player animated sprites (Warrior, Archer, Wizard), Kobald and Koa Toa enemies, sound integration, assorted bug fixing"," ",
"Michael Monty: Key sprites with variations, UI text box functionality, inventory menu, title layout, UI image selection support, title screen font selection, pause menu, pause toggle"," ",
"Dan Dela Rosa: Movement system refactor, core UI system, health bars, potion and spell menus, stamina tuning, bug fixes (turn change, fire bolt casting), mute toggle"," ",
"Chris \"BOLT\" Bolte: Main music, sounds (footsteps, water and cave ambience, health pickup, arrow shooting, player and enemy hurt sounds, healing and buff spells, sword strike)"," ",
"Christer \"McFunkypants\" Kaitila: Win screen, game over screen, tile cursors, UI background, textbox wrap, additional keyboard controls, healthbar improvement, UI layout touch up, additional sound effects integration, header drop shadow"," ",
"Rodrigo Bonzerr Lopez: Sprites (archer animation, 2 spellbooks, arrow), additional sounds (water effect)"," ",
"Gwyn Henry: Narrative and related internal artifacts"," ",
"Marvin Chong: Isometric tile spritesheet functionality, player stamina, UI fix"
  ];

function drawCredits() {
	var lineX = 85;
    var lineY = 25;
    var creditsSize = 19;
    var lineSkip = creditsSize+2;
    for(var i=0;i<creditsList.length;i++) {
      	colorText(creditsList[i], lineX, lineY, "white", "15px Arial");
		lineY+=lineSkip;
	}
}

function lineWrapCredits() {
    const newCut = [];
    var maxLineChar = 85;
    var findEnd;

    for(let i = 0; i < creditsList.length; i++) {
      const currentLine = creditsList[i];
      for(let j = 0; j < currentLine.length; j++) {
        /*const aChar = currentLine[j];
        if(aChar === ":") {
          if(i !== 0) {
            newCut.push("\n");
          }

          newCut.push(currentLine.substring(0, j + 1));
          newCut.push(currentLine.substring(j + 2, currentLine.length));
          break;
        } else*/ if(j === currentLine.length - 1) {
          if((i === 0) || (i >= creditsList.length - 2)) {
            newCut.push(currentLine);
          } else {
            newCut.push(currentLine.substring(0, currentLine.length));
          }
        }
      }
    }

    const newerCut = [];
    for(var i=0;i<newCut.length;i++) {
      while(newCut[i].length > 0) {
        findEnd = maxLineChar;
        if(newCut[i].length > maxLineChar) {
          for(var ii=findEnd;ii>0;ii--) {
            if(newCut[i].charAt(ii) == " ") {
              findEnd=ii;
              break;
            }
          }
        }
        newerCut.push(newCut[i].substring(0, findEnd));
        newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
      }
    }

    creditsList = newerCut;
  }        
lineWrapCredits();