var rockBulletList = [];
var wallTrapList = [];

function removeBulletFromList(){
	for(var i = 0; i < rockBulletList.length; i++){
	  if(rockBulletList[i].dead){
		rockBulletList.splice(i,1);
	  }
	}
}

function wallTrap(){

}

function addRockBullet(xPos, yPos){
	var tempBullet = new rockBulletClass(xPos, yPos);
	rockBulletList.push(tempBullet);
}

function rockBulletClass(xPos, yPos){
	this.x = xPos || 370;
	this.y = yPos || 0;
	this.width = 10;	
    this.height = 10;
	this.isoEnemyFootY = 30;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	
	this.maxHealth = 1;
	this.speed = 10;
	this.health = this.maxHealth;
	
	this.movementTimer = 0;
	this.moveNorth = false;
	this.moveEast = false;
	this.moveSouth = true;
	this.moveWest = false;
	this.moveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;
	this.wallImmuninity = 0;
	this.dead = false;

    this.movement = function() {
		var nextX = this.x; 
		var nextY = this.y; 
	
        if(this.moveSouth){
            nextY += this.speed;
        }

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		if(this.wallImmuninity < 6){
			this.wallImmuninity++;
		}
		switch(walkIntoTileType) {
			case TILE_WALL:
				if(this.wallImmuninity < 5){
					break;
				}
			case TILE_ROAD:
			case TILE_SPIKES_UNARMED:
			case TILE_PITTRAP_UNARMED:
			case TILE_WALL_TRAP:
			case TILE_WALL_TRAP2:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:	
			case TILE_TREASURE:	
			case TILE_YELLOW_KEY:				
			case TILE_FINISH:
			case TILE_STAIRS_DOWN:
			case TILE_STAIRS:
			case TILE_PITTRAP_ARMED:
			case TILE_SPIKES_ARMED:
			case TILE_WALL:
			case TILE_WALL_WITH_TORCH:
			case TILE_TABLE:
			case TILE_BOOKSHELF:
			default:
				this.collision();
				break;
		} // END OF SWITCH CASE	
	}	// END OF THIS.MOVEMENT

		
	this.checkCollisionsAgainst = function(otherHumanoid){
		if(this.collisionTest(otherHumanoid)){
			console.log("collision");
			if(this.keyHeld_North){
				this.canMoveNorth = false;
				this.y += this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_East){
				this.canMoveEast = false;
				this.x -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_South){
				this.canMoveSouth = false;
				this.y -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_West){
				this.canMoveWest = false;
				this.x += this.playerMovementSpeed * COLLIDE_BUMP_MULT;				
			}
			this.collision();
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	}
	
	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}

	this.collision = function(){
		this.dead = true;
		crashIntoConeSound.play();
		
		addSmoke(this.x, this.y, 600);
		addSmoke(this.x, this.y, 600);
		addSmoke(this.x, this.y, 600);
		addSmoke(this.x, this.y, 600);
		addSmoke(this.x, this.y, 600);
	}

    this.draw = function(){
        gameCoordToIsoCoord(this.x,this.y);
       // colorRect(isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, 200, 200, 'red');
        canvasContext.drawImage(rockBulletPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
    }
}