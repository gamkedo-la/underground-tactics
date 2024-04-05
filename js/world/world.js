const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 85;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 20;
const ROOM_ROWS = 20;


var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var levelList = [levelOne, levelTwo];
var levelNow = 0;
var roomGrid = [];

var levelOne = [
					 50, 52, 52, 53, 52, 52, 54, 50, 52, 52, 50, 52, 52, 53, 52, 52, 54, 50, 52, 52,
					 51, 11, 10, 10, 10, 10, 13, 10, 16,  1,  1,  1,  1,  1,  1, 17, 13, 10, 10, 10,
					 52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 53, 12,  1,  2,  2,  1,100,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 52, 12,  3,  1,  1,  1,  2,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 54, 14,  3,  3,  2,  1,  1,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 50, 12,  1,  4,  2,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 50, 12,  1,  3,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 51, 15,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,
					 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 53,  1,  1,  1,  1,  1, 55,  1,  1,  1,  1,  3,  1,  1,  1, 55,  1,  1,  1,  1,
					 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  3,  1,  3,  1,  1,  1,  1,  1,
					 52, 18,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,
					 54, 14,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,
					 52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
					 52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				];
					
var levelTwo =[
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
				];
					
	const TILE_FLOOR_STONE_1 = 1;
	const TILE_FLOOR_STONE_2 = 2;
	const TILE_FLOOR_STONE_3 = 3;
	const TILE_FLOOR_STONE_4 = 4;
	const TILE_FLOOR_SEWER_1 = 10;
	const TILE_FLOOR_SEWER_2 = 11;
	const TILE_FLOOR_SEWER_3 = 12;
	const TILE_FLOOR_SEWER_4 = 13;
	const TILE_FLOOR_SEWER_5 = 14;
	const TILE_FLOOR_SEWER_6 = 15;
	const TILE_FLOOR_SEWER_7 = 16;
	const TILE_FLOOR_SEWER_8 = 17;
	const TILE_FLOOR_SEWER_9 = 18;
	const TILE_WALL_STONE_1 = 50;
	const TILE_WALL_STONE_2 = 51;
	const TILE_WALL_STONE_3 = 52;
	const TILE_WALL_STONE_4 = 53;
	const TILE_WALL_STONE_5 = 54;
	const TILE_COLUMN_STONE_1 = 55;
	const TILE_PLAYER = 100;

	
function gameCoordToIsoCoord (pixelX, pixelY){
	var camPanX = -350;
	var camPanY = 0;
	var tileCFraction = pixelX / ROOM_W;
	var tileRFraction = pixelY / ROOM_H;
	
	isoDrawX = -camPanX + tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = -camPanY + tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}	

function tileCoordToIsoCoord(tileC, tileR ){
	gameCoordToIsoCoord(tileC * ROOM_W, tileR * ROOM_H);
}
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 700
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeY = 0;
	var miniMapX = 750;
	var miniMapY = 2;
	var drawTileIndicators = true
	var showTileNumber = true;
	sharedAnimCycle++;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 7;
		miniMapX = 730;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			miniMapX += 4;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			tileCoordToIsoCoord(eachCol, eachRow);		
			canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
			if(drawTileIndicators){
				canvasContext.drawImage(tileIndicatorPic, isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				if(showTileNumber){
					var textColor;
					if(playerOne.movementArray[0]==tileIndex){
						textColor = "white";
					} else if(playerOne.movementArray.includes(tileIndex)){
						textColor = "cyan";
					}else {
						textColor = "orange"
					}
					colorText(tileIndex, isoDrawX-10, isoDrawY-20, textColor, "10px Arial Black" );
					//var playerTile = getTileIndexAtPixelCoord(playerOne.x,playerOne.y);
				//	console.log(playerTile)
				}
			}	 
			tileIndex++;
		} // end of each col
		tileTopEdgeY += ROOM_H;
	} // end of each row
}

function tileTypeHasRoadTransparency(checkTileType) {
/*	return (checkTileType == TILE_BOOKSHELF ||
			checkTileType == TILE_PITTRAP_UNARMED ||
				checkTileType == TILE_SPIKES_UNARMED 
			); */
}

function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			
		
function getTileIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / ROOM_W;		
	var tileRow = pixelY / ROOM_H;
					
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow); 
	//console.log("X: "+pixelX+ " Y: "+pixelY+ " col: " + tileCol + " row: " + tileRow);
				
	if(tileCol < 0 || tileCol >= ROOM_COLS || 
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		
			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}

function indexN (fromIndex){
	return fromIndex - ROOM_COLS;
}

function indexS (fromIndex){
	return fromIndex + ROOM_COLS;
}

function indexW(fromIndex){
	return fromIndex - 1;
}

function indexE(fromIndex){
	return fromIndex + 1;
}