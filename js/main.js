var canvas;
var canvasContext;

//characters (Player, NPC's, Enemies)
var playerOne = new warriorClass();

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
	
	playerOne.warriorReset();
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
		moveEverything();
		checkAllPlayerAndEnemyCollisions();
		drawEverything();
	}, 1000/framesPerSecond);
	loadLevel(levelOne)
	playerOne.init(wizardPic, "Nesquit");

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
			roomGrid[i] == TILE_POTION_STAMINA){
			
			let whichPotion = roomGrid[i];
			if(roomGrid[i] == TILE_POTION_MANA){
				whichPotion = "Mana Potion";
			} else if (roomGrid[i] == TILE_POTION_HEALTH){
				whichPotion = "Health Potion";
			} else if (roomGrid[i] == TILE_POTION_STAMINA){
				whichPotion = "Stamina Potion";
			} else if (roomGrid[i] == TILE_POTION_LEVITATION){
				whichPotion = "Levitation Potion";
			} else {
				whichPotion = "Not listed";
			}
			addPotion(whichPotion);
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
		}
	}
	playerOne.warriorReset();
	console.log("Finish Load Level");
}
		
//All movement occurs here.  This is called every frame.
function moveEverything() {
	if(liveGame){
		playerOne.movement();
		updatedCameraPosition();
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
		playerOne.draw();
		for(var i = 0; i < potionList.length; i++){
			potionList[i].draw();
		}
		finishedCameraPan();
		drawInitiativeOrder();
		drawPlayerOptions();

	}
}
