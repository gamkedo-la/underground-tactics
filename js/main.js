var canvas;
var canvasContext;
//characters (Player, NPC's, Enemies)


function resetEnemyLists(){
}

//game states
var liveGame = true;

var pauseScreen = false;
var inventoryScreen = false;
var mainMenu = false;

window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
				
	loadImages();
	
	initInput();	
	
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	setupMenus();
	testUISetup(); // Just a function for testing out various UI elements. Comment it out as you please.
	mainOptions = true;
	mainOptionsMenu.hidden = false;
}

function calculateMousePos(evt) {
	
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX, 
		y: mouseY
	};
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		resetViewStates();
		handleMousePosition();
		moveEverything();
		checkAllPlayerAndEnemyCollisions();
		drawEverything();
	}, 1000/framesPerSecond);
	loadLevel(levelOne);
	//playerOne.init(wizardPic, "Nesquit", TILE_WIZARD);  //Load Level should be handling this
}

function nextLevel() {
	levelNow++;
	if(levelNow > levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
	//resetEnemyLists();
	roomGrid = whichLevel.slice();
	for(var i = 0; i < roomGrid.length; i++){
		if( roomGrid[i] == TILE_POTION_MANA ||
			roomGrid[i] == TILE_POTION_HEALTH ||
			roomGrid[i] == TILE_POTION_LEVITATION ||
			roomGrid[i] == TILE_POTION_STAMINA ||
			roomGrid[i] == TILE_SPELL_BOOK ||
			roomGrid[i] == TILE_SPELL_BOOK_2){
			
			let whichPotion = roomGrid[i];
			if(roomGrid[i] == TILE_POTION_MANA){
				whichPotion = "Mana Potion";
			} else if (roomGrid[i] == TILE_POTION_HEALTH){
				whichPotion = "Health Potion";
			} else if (roomGrid[i] == TILE_POTION_STAMINA){
				whichPotion = "Stamina Potion";
			} else if (roomGrid[i] == TILE_POTION_LEVITATION){
				whichPotion = "Levitation Potion";
			} else if (roomGrid[i] == TILE_SPELL_BOOK){
				whichPotion = "Spell Book";
			} else if (roomGrid[i] == TILE_SPELL_BOOK_2){
				whichPotion = "Spell Book 2";
			} else {
				whichPotion = "Not listed";
			}
			addPotion(whichPotion, "Kobald");
		}
		if( roomGrid[i] == TILE_KOBALD || 
			roomGrid[i] == TILE_KOBALD_ARCHER ||
			roomGrid[i] == TILE_KOA_TOA){
			    addEnemy(roomGrid[i]);
		}
		if( roomGrid[i] == TILE_WARRIOR ||
			roomGrid[i] == TILE_WIZARD){  
				addPlayer(roomGrid[i]);
		}
	}

	for(var i = 0; i < potionList.length; i++){
		if(potionList[i].myName == "Mana Potion" ){
			potionList[i].init(potionManaPic, 75, "Mana Potion", TILE_POTION_MANA);
		} else if (potionList[i].myName == "Health Potion"){
			potionList[i].init(potionHealthPic, 225, "Health Potion", TILE_POTION_HEALTH);
		} else if (potionList[i].myName == "Levitation Potion"){
			potionList[i].init(potionLevitationPic, 0, "Stamina Potion", TILE_POTION_LEVITATION);
		} else if (potionList[i].myName == "Stamina Potion"){
			potionList[i].init(potionStaminaPic, 150, "Stamina Potion", TILE_POTION_STAMINA);
		} else if (potionList[i].myName == "Spell Book"){
			potionList[i].init(spellBookPic, 300, "Spell Book", TILE_SPELL_BOOK);
		} else if (potionList[i].myName == "Spell Book 2"){
			potionList[i].init(spellBookPic, 375, "Spell Book 2", TILE_SPELL_BOOK_2);
		}
	}
	turnOrderList = [];
	charList.sort(()=>0.5-Math.random());
	for(var i = 0; i<charList.length; i++){
		charList[i].reset();
		addCreatureTurn((charList[i].isHuman ? "Player ":"Enemy ") + (i+1), charList[i].isHuman)
	}
	console.log("Finish Load Level");
}
		
//All movement occurs here.  This is called every frame.
function moveEverything() {
	if(liveGame){
		charList[turnNumber].movement();
		for(i = 0; i< fireBoltList.length; i++){
			fireBoltList[i].move();
		}
		for(i = 0; i< smokeList.length; i++){
			smokeList[i].move();
		}
		for(var i = 0; i < turnOrderList.length; i++ ){
			if(turnOrderList[i].myTurn == true && turnOrderList[i].name == "Enemy 1"){

			}
		} 
		updatedCameraPosition();
		for(i = 0; i < potionList.length; i++){
			if(charList[turnNumber].isHuman && charList[turnNumber].checkCollisionsAgainstItem(potionList[i])){
				console.log(potionList.length)
				potionList.splice(i,1);
				console.log(potionList.length)
			}
		}
		for(i = 0; i < charList.length; i++){
			charList[i].movement();
		}
		checkPlayerOptionBoxes();
	}
	
	if (pauseScreen) {
		return;
	}
}

//This checks player and enemy collisions.  This is called every frame.
//This requires refactoring.  Too many individual lines checking monsters to players
function checkAllPlayerAndEnemyCollisions(){
	 
}

//All movement occurs here.  This is called every frame.
var titleScreenWizardX = -100;
var titleScreenWizardY = 0;
var titleScreenWizardXWaitTime = 0;
var titleScreenWizardXMoveRight = true;
function drawEverything() {
	if(mainMenu){
		if(titleScreenWizardX < 0 && titleScreenWizardXMoveRight){
			titleScreenWizardX++;
		} else {
			titleScreenWizardXMoveRight = false;
			titleScreenWizardXWaitTime++;
			if(titleScreenWizardXWaitTime > 100){
				titleScreenWizardX--;

			}
		}
		canvasContext.drawImage(titleScreenPic, 0, 0); 
		if(titleScreenWizardXWaitTime > 20 && titleScreenWizardXWaitTime < 40){
			canvasContext.drawImage(titleScreenFireBAllPic, 0, 0);
		}
		canvasContext.drawImage(titleScreenWizardPic, titleScreenWizardX, titleScreenWizardY);
		if(titleScreenWizardXWaitTime > 100){
			colorRect(200, 300, 400, 100, "blue")
			colorText("Underground Tactics", 250, 370, "white", "24px Arial Black")
		}
		if(titleScreenWizardXWaitTime > 130){
			mainMenu = false;
			liveGame = true;
		}
	}
	if(liveGame){
		colorRect(0,0,canvas.width,canvas.height, 'black');
		shiftForCameraPan();
		drawTracks();
		for(i = 0; i<fireBoltList.length; i++){
			fireBoltList[i].draw();
		}
		for(var i = 0; i < potionList.length; i++){
			potionList[i].draw();
		}
		for(var i = 0; i < charList.length; i++){
			charList[i].draw();
		}
		for(i = 0; i<smokeList.length; i++){
			smokeList[i].draw();
		}
		removeSmokeFromList();
		removeFireBoltFromList();
		finishedCameraPan();
		drawInitiativeOrder();
		drawPlayerOptions();
		drawUiElements();
	}
}
