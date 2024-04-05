var wizardPic = document.createElement("img");
var titleScreenPic = document.createElement("img");
var titleScreenWizardPic = document.createElement("img");
var titleScreenFireBAllPic = document.createElement("img");
var tileIndicatorPic = document.createElement("img");

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
			{varName: titleScreenPic, theFile: "titleScreen.png"},
			{varName: titleScreenWizardPic, theFile: "titleScreenWizard.png"},
			{varName: titleScreenFireBAllPic, theFile: "titleScreenFireBall.png"},
			{varName: tileIndicatorPic, theFile: "tileIndicator.png"},

			//characters
			{varName: wizardPic, theFile: "wizard.png"},
	
			{trackType: TILE_FLOOR_STONE_1, theFile: "floor.png"},
			{trackType: TILE_FLOOR_STONE_2, theFile: "floor_stone_2.png"},
			{trackType: TILE_FLOOR_STONE_3, theFile: "floor_stone_3.png"},
			{trackType: TILE_FLOOR_STONE_4, theFile: "floor_stone_4.png"},
			{trackType: TILE_FLOOR_SEWER_1, theFile: "floor_sewer_1.png"},
			{trackType: TILE_FLOOR_SEWER_2, theFile: "floor_sewer_2.png"},
			{trackType: TILE_FLOOR_SEWER_3, theFile: "floor_sewer_3.png"},
			{trackType: TILE_FLOOR_SEWER_4, theFile: "floor_sewer_4.png"},
			{trackType: TILE_FLOOR_SEWER_5, theFile: "floor_sewer_5.png"},
			{trackType: TILE_FLOOR_SEWER_6, theFile: "floor_sewer_6.png"},
			{trackType: TILE_FLOOR_SEWER_7, theFile: "floor_sewer_7.png"},
			{trackType: TILE_FLOOR_SEWER_8, theFile: "floor_sewer_8.png"},
			{trackType: TILE_FLOOR_SEWER_9, theFile: "floor_sewer_9.png"},
			{trackType: TILE_WALL_STONE_1, theFile: "wall_stone_1.png"},
			{trackType: TILE_WALL_STONE_2, theFile: "wall_stone_2.png"},
			{trackType: TILE_WALL_STONE_3, theFile: "wall_stone_3.png"},
			{trackType: TILE_WALL_STONE_4, theFile: "wall_stone_4.png"},
			{trackType: TILE_WALL_STONE_5, theFile: "wall_stone_5.png"},
			{trackType: TILE_COLUMN_STONE_1, theFile: "column_stone_1.png"}
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForRoomCode(imageList[i].trackType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}