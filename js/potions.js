var potionList = [];

function addPotion(whichPotion){
    var tempEnemy = new potionClass(whichPotion);
	potionList.push(tempEnemy);
}

function potionClass(potionType) {
	this.x = 600;
	this.y = 800;
	this.width = 50; //30
	this.height = 75; //30
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
    this.manaRestore = 10;
    this.myName = potionType;
		
	this.reset = function() {
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == this.myTile) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol	= i%ROOM_COLS;
					
					this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
					this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

					roomGrid[i] = TILE_FLOOR_STONE_1;
					break;
				} 
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}
					
	this.init = function(whichGraphic, whichName, whichTile) {
		this.myBitmap = whichGraphic;
        this.myName = whichName;
		this.myTile = whichTile;
        console.log("graphic: " + this.myBitmap + " Name: " +  this.myName + " Tile: " + this.myTile);
		this.reset();
	}	

	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}
		
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
	//	canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
	}
}