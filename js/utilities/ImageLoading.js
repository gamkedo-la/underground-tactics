var wizardPic = document.createElement("img");
var titleScreenPic = document.createElement("img");
var titleScreenWizardPic = document.createElement("img");
var titleScreenFireBAllPic = document.createElement("img");
var tileIndicatorPic = document.createElement("img");
var tileIndicatorWhitePic = document.createElement("img");
var tileIndicatorCyanPic = document.createElement("img");
var potionManaPic = document.createElement("img");
var potionHealthPic = document.createElement("img");
var potionStaminaPic = document.createElement("img");
var potionLevitationPic = document.createElement("img");
var spellFirePic = document.createElement('img');
var playerPositionPic = document.createElement("img");
var wizardMovementPic = document.createElement("img");
var wizardSpellPic = document.createElement("img");
var endTurnPic = document.createElement("img");
var useItemPic = document.createElement("img");
var magicMissilePic = document.createElement("img");
var manaPotionPic = document.createElement("img");
var healthPotionPic = document.createElement("img");
var spellBookPic = document.createElement("img");
var spellBook2Pic = document.createElement("img");
var spellBookIconPic = document.createElement("img");
var kobaldPic = document.createElement("img");
var kobaldArcherPic = document.createElement("img");
var koaToaPic = document.createElement("img");
var fireBoltPic = document.createElement("img");



var trackPics = [];

var picsToLoad = 0;

//All pictures prior to launching the game.  If a picture doesn't load, the game doesn't launch.
function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		//console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForRoomCode(trackCode, fileName)  {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);	
}

//All images are loaded here.  varNames are for any pictures that are not tiles.
function loadImages() {
	
		var imageList = [
			//menuScreens
			{varName: titleScreenPic, theFile: "titleScreen.png", sx: 0, sy: 0},
			{varName: titleScreenWizardPic, theFile: "titleScreenWizard.png",sx: 0, sy: 0},
			{varName: titleScreenFireBAllPic, theFile: "titleScreenFireBall.png",sx: 0, sy: 0},
			{varName: tileIndicatorPic, theFile: "tileIndicator.png",sx: 0, sy: 0},
			{varName: tileIndicatorWhitePic, theFile: "tileIndicatorWhite.png",sx: 0, sy: 0},
			{varName: tileIndicatorCyanPic, theFile: "tileIndicatorCyan.png",sx: 0, sy: 0},
			//pick up items
			{varName: potionManaPic, theFile: "potionTiles.png",sx: 0, sy: 0},
			{varName: potionHealthPic, theFile: "potionTiles.png",sx: 0, sy: 0},
			{varName: potionStaminaPic, theFile: "potionTiles.png",sx: 0, sy: 0},
			{varName: potionLevitationPic, theFile: "potionTiles.png",sx: 0, sy: 0},
			{varName: spellBookPic, theFile:  "potionTiles.png", sx: 0, sy: 0},
			{varName: spellBook2Pic, theFile:  "potionTiles.png", sx: 0, sy: 0},
			{varName: spellFirePic, theFile: "spellFire.png",sx: 0, sy: 0},
			//spells and attacks
			{varName: fireBoltPic, theFile: "fireBolt.png",sx: 0, sy: 0},

			{varName: playerPositionPic, theFile: "playerPosition.png",sx: 0, sy: 0},
			{varName: wizardMovementPic, theFile:  "wizardWalk.png", sx: 0, sy: 0},
			{varName: wizardSpellPic, theFile:  "spellbookIcon.png", sx: 0, sy: 0},
			{varName: endTurnPic, theFile:  "endTurn.png", sx: 0, sy: 0},
			{varName: useItemPic, theFile:  "useItem.png", sx: 0, sy: 0},
			{varName: magicMissilePic, theFile:  "spellMagicMissle.png", sx: 0, sy: 0},
			{varName: manaPotionPic, theFile:  "manaPotion.png", sx: 0, sy: 0},
			{varName: healthPotionPic, theFile:  "healthPotion.png", sx: 0, sy: 0},
			
			//characters
			{varName: wizardPic, theFile: "wizard.png"},
			{varName: kobaldPic, theFile:  "kobald.png"},
			{varName: kobaldArcherPic, theFile:  "kobaldArcher.png"},
			{varName: koaToaPic, theFile:  "kuo Toa.png"},
			//tiles (Will eventually move to one sprite sheet)
			{trackType: TILE_FLOOR_STONE_1, theFile: "floor.png", sx: 0, sy: 0},
			{trackType: TILE_FLOOR_STONE_2, theFile: "floor_stone_2.png", sx: 0, sy: 0},
			{trackType: TILE_FLOOR_STONE_3, theFile: "floor_stone_3.png", sx: 50, sy: 0},
			{trackType: TILE_FLOOR_STONE_4, theFile: "floor_stone_4.png", sx: 100, sy: 0},
			{trackType: TILE_FLOOR_SEWER_1, theFile: "floor_sewer_1.png", sx: 150, sy: 0},
			{trackType: TILE_FLOOR_SEWER_2, theFile: "floor_sewer_2.png", sx: 200, sy: 0},
			{trackType: TILE_FLOOR_SEWER_3, theFile: "floor_sewer_3.png", sx: 250, sy: 0},
			{trackType: TILE_FLOOR_SEWER_4, theFile: "floor_sewer_4.png", sx: 300, sy: 0},
			{trackType: TILE_FLOOR_SEWER_5, theFile: "floor_sewer_5.png", sx: 350, sy: 0},
			{trackType: TILE_FLOOR_SEWER_6, theFile: "floor_sewer_6.png", sx: 400, sy: 0},
			{trackType: TILE_FLOOR_SEWER_7, theFile: "floor_sewer_7.png", sx: 0, sy: 75},
			{trackType: TILE_FLOOR_SEWER_8, theFile: "floor_sewer_8.png", sx: 50, sy: 75},
			{trackType: TILE_FLOOR_SEWER_9, theFile: "floor_sewer_9.png", sx: 100, sy: 75},
			{trackType: TILE_WALL_STONE_1, theFile: "wall_stone_1.png", sx: 0, sy: 0},
			{trackType: TILE_WALL_STONE_2, theFile: "wall_stone_2.png", sx: 50, sy: 0},
			{trackType: TILE_WALL_STONE_3, theFile: "wall_stone_3.png", sx: 100, sy: 0},
			{trackType: TILE_WALL_STONE_4, theFile: "wall_stone_4.png", sx: 150, sy: 0},
			{trackType: TILE_WALL_STONE_5, theFile: "wall_stone_5.png", sx: 200, sy: 0},
			{trackType: TILE_COLUMN_STONE_1, theFile: "column_stone_1.png", sx: 250, sy: 0},
			{trackType: TILE_WATER, theFile: "water.png", sx: 0, sy: 0},
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForRoomCode(imageList[i].trackType, imageList[i].theFile, imageList[i].sx, imageList[i].sy);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile, imageList[i].sx, imageList[i].sy);
		}
	}
}