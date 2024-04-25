var enemyList = [];

function addEnemy(whichEnemy){
    var tempEnemy = new enemyClass(whichEnemy);
	enemyList.push(tempEnemy);
}  
 
 function enemyClass() {
	this.x = 600;
	this.y = 800;
	this.width = 30; //30
	this.height = 30; //30
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.maxHealth = 2;
	this.speed = 3;
	this.health = this.maxHealth;
	this.movementTimer = 0;
	this.moveNorth = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;
	this.movementArray = [];
	this.usingPath = false;
	
	this.enemyReset = function() {
		this.speed = 3;
		this.hitPoints = this.maxHitPoints;
				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == this.myTile) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol	= i%ROOM_COLS;
					
					this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
					this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

					roomGrid[i] = TILE_ROAD;
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
		this.enemyReset();
	}	
	 
	this.move = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		console.log("Step 1 Move");

		if(this.usingPath == false){
			currentIndex = this.movementArray[0];
			if(this.keyHeld_North){
				currentIndex = indexN(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_North = false;
			}
			if(this.keyHeld_South){
				currentIndex = indexS(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_South = false;
			}
			if(this.keyHeld_West){
				currentIndex = indexW(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_West = false;
				console.log("West");
			}
			if(this.keyHeld_East){
				currentIndex = indexE(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_East = false;
			}
			if(this.movementArray.length > 10){
				this.movementArray.shift();
			}
		} else {
			currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
			var tileN = indexN(currentIndex);
			var tileS = indexS(currentIndex);
			var tileW = indexW(currentIndex);
			var tileE = indexE(currentIndex);
			var lastNode = this.movementArray.length - 1;
			//console.log(this.movementArray[lastNode], currentIndex);
			if(this.movementArray[lastNode] == currentIndex){
				var col = currentIndex%ROOM_COLS;
				var row = Math.floor(currentIndex/ROOM_COLS);
				this.x = col * ROOM_W + ROOM_W * 0.5;
				this.y = row * ROOM_H + ROOM_H * 0.5;
				this.movementArray.pop();
				if(this.movementArray.length == 1){
					this.usingPath = false;
				}
			} else if (this.movementArray[lastNode] == tileN) {
				this.y -= this.playerMovementSpeed;
				if(this.levitating){
					this.offSetHeight = 6 * this.height;
				} else {
					this.offSetHeight = 2 * this.height
				}
			} else if (this.movementArray[lastNode] == tileS) {
				this.y += this.playerMovementSpeed;
				if(this.levitating){
					this.offSetHeight = 4 * this.height;
				} else {
					this.offSetHeight = 0 * this.height;
				}
			} else if (this.movementArray[lastNode] == tileW) {
				this.x -= this.playerMovementSpeed;
				if(this.levitating){
					this.offSetHeight = 7 * this.height;
				} else {
					this.offSetHeight = 3 * this.height;
				}
			} else if (this.movementArray[lastNode] == tileE) {
				this.x += this.playerMovementSpeed;
				if(this.levitating){
					this.offSetHeight = 5 * this.height;
				} else {
					this.offSetHeight = 1 * this.height;
				}
			}
		} 
	}	

	this.processTileAtIndex = function(currentIndex) {
		if(this.movementArray.length > 1 && this.movementArray[1] == currentIndex){
			this.movementArray.shift();
		} else if(tileTypeNavMode(roomGrid[currentIndex])==NAVMODE_WALKABLE){
			this.movementArray.unshift(currentIndex);
		} else if (tileTypeNavMode(roomGrid[currentIndex])==NAVMODE_FLYABLE && this.levitating){
			console.log("water");
			this.movementArray.unshift(currentIndex);
		} else {
			console.log("cannot pass");
		}
	}
	
	this.resetDirections = function(){
		this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
	}	
	
	this.checkCollisionsAgainst = function(otherHumanoid){
		
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
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
		colorText(this.myName, isoDrawX + 20, isoDrawY - 30, "black", "8px Arial Black");
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		//displays health
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		//colorRect(this.miniMapX, this.miniMapY, 10, 10, "green");	
	}
}