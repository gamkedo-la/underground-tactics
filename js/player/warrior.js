const ISO_CHAR_FOOT_Y = 8;
const COLLIDE_BUMP_MULT = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)

function warriorClass() {
	this.x = 600;
	this.y = 800;
	this.width = 50;
	this.height = 75;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.playerMovementSpeed = 3.0;
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;	
	this.health = 4;
	this.maxHealth = 4;
	this.trapCoolDownTimer = 0;
	this.trapCoolDownCounter = 0;
	this.movementArray = [67];
	this.usingPath = false;
	this.animateWalk = false;
	this.ticks = 0;
	this.frame = 0;
	this.frames = 4;
	this.healingPotion = 0;
	this.manaPotion = 0;
	this.staminaPotion = 0;
	this.levitatePotion = 0;
	this.levitating = false;
	this.levitationTurn = 0;

	this.warriorPic = document.createElement("img");
	
	this.setupControls = function(northKey,eastKey,southKey,westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.warriorReset = function() {
		this.speed = 0;
		this.keysHeld = 1;
					
		for(var i=0; i<roomGrid.length; i++){
			if( roomGrid[i] == TILE_PLAYER) {
				console.log("Found Player")
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol	= i%ROOM_COLS;
				var tileLeftEdgeX = 700
				var tileTopEdgeY = 0;

				this.homeX = tileCol * ROOM_W; 
				this.homeY = tileRow * ROOM_H; 

				this.movementArray = [i];

				roomGrid[i] = TILE_FLOOR_STONE_1;
				break;
			}
		}
	
		this.x = this.homeX;
		this.y = this.homeY;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.warriorReset();
	}	

	this.levitate = function(){
		if(spellBoxHovering){
			this.levitating = true;
			mainOptions = true;
			spellOptions = false;
			potionOptions = false;
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
	 
	this.movement = function() {
		
		var currentIndex;

		if(this.levitationTurn > 6){
			this.levitating = false;
			this.levitationTurn = 0;
		}

		if(this.movementArray.length < 2){
			this.animateWalk = false;
		}

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

		/*var nextX = this.x; 
		var nextY = this.y; 
		var collisionX = nextX;
		var collisionY = nextY;
		
		if(this.keyHeld_North && this.keyHeld_West){
			nextY -= this.playerMovementSpeed;
			collisionY = nextY 
		} else if(this.keyHeld_North && this.keyHeld_East){
			nextX += this.playerMovementSpeed;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextX -= this.playerMovementSpeed;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextY += this.playerMovementSpeed; 
		} else if(this.keyHeld_North && this.canMoveNorth){
			nextY -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 4;
		} else if(this.keyHeld_East && this.canMoveEast){
			nextX += this.playerMovementSpeed;
			this.offSetHeight = this.height * 1;
		} else if(this.keyHeld_South && this.canMoveSouth){
			nextY += this.playerMovementSpeed;
			this.offSetHeight = this.height * 2;
		} else if(this.keyHeld_West && this.canMoveWest){
			nextX -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 3;
		} else {
			this.offSetHeight = 0;
		}
		this.miniMapX = nextX;
		this.miniMapY = nextY;
		
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_FLOOR_STONE_1;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_FLOOR_STONE_1:
			case TILE_FLOOR_STONE_2:
			case TILE_FLOOR_STONE_3:
			case TILE_FLOOR_STONE_4:
			case TILE_FLOOR_SEWER_1:
			case TILE_FLOOR_SEWER_2:
			case TILE_FLOOR_SEWER_3:
			case TILE_FLOOR_SEWER_4:
			case TILE_FLOOR_SEWER_5:
			case TILE_FLOOR_SEWER_6:
			case TILE_FLOOR_SEWER_7:

				this.x = nextX;
				this.y = nextY;
				break;
			default:
				break;
		} // END OF SWITCH CASE		
		this.trapCoolDown();
		*/
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
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	}

	this.checkCollisionsAgainstItem = function(item){
		if(this.collisionTest(item)){
			console.log("Picked up " + item.myName);
			if(item.healingPotion){
				this.healingPotion++;
				itemPickUpSound.play();
			} else if(item.staminaPotion){
				this.staminaPotion++;
				itemPickUpSound.play();
			} else if(item.manaPotion){
				this.manaPotion++;
				itemPickUpSound.play();
			} else if(item.levitatePotion){
				this.levitatePotion++;
				itemPickUpSound.play();
			}

			return true;
		}
	}

	
	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}

	var footStepSoundTurn = 0;
		
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		if(this.animateWalk){
			this.ticks++;
			if(this.ticks > 3){
				this.frame++;
				this.ticks = 0;
				footStepSoundTurn++
				if(footStepSoundTurn > 2 && !this.levitating){
					footstepsSound.play();
					console.log("Play")
					footStepSoundTurn = 0;
				}
			}
			if(this.frame > this.frames){
				this.frame = 1;
			}
			this.offSetWidth = this.frame * this.width;
		}
		drawIsoCharacterByFeet(this.myBitmap,isoDrawX, isoDrawY, this);
		drawIsoCharacterByFeet(playerPositionPic,isoDrawX, isoDrawY, this);

		//colorCircle(isoDrawX, isoDrawY, 3, "lime")
	
		//add logic for what options are available
	}
		
	//this delivers damage to the player when setting off a trap
	this.takeDamageFromTrap = function(howMuchDamage){
		if(this.trapCoolDownCounter == 0){
			this.health = this.health - howMuchDamage;
		}
		trapCoolDownTimer = true;
	}
	
	//this is used to keep traps from constantly causing damage to the player
	this.trapCoolDown = function(){
		if(this.trapCoolDownTimer == true){
			this.trapCoolDownCounter++
		}
		if(this.trapCoolDownCounter == 120){
			this.trapCoolDownCounter = 0;
			this.trapCoolDownTimer = false;
		}
	}
}
