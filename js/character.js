const DIR_S = 0;
const DIR_E = 1;
const DIR_N = 2;
const DIR_W = 3;

function removeCharacterFromList() {
	for(var i=0; i<charList.length; i++) {
        if(charList[i].readyToRemove){
            charList.splice(i,1);
        }
	}
}

function CharacterBase (){
	this.x;
	this.y;
	this.width = 50;
	this.height = 75;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.movementSpeed = 3.0;
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;	
	this.health = 10;
	this.maxHealth = 10;
	this.defense = 10;
	this.trapCoolDownTimer = 0;
	this.trapCoolDownCounter = 0;
	this.remainingStamina = 10;
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
	this.wasLevitating = true; //stays a frame behind to detect change
	this.levitationTurn = 0;
	this.combatEngaged = false;
    this.attackTurn = true;
	this.tiedUp = false;
	this.isHuman = false;
	this.maxStamina = 10;
	this.facingDir = DIR_E;
	this.fireProjectileDir = -1;
	this.drawIndex = -1;
	this.readyToRemove = false;

	this.reset = function(tileMatch) {
        this.speed = 0;
        this.keysHeld = 0;

        for (var i = 0; i < roomGrid.length; i++) {
            if (roomGrid[i] == tileMatch) {
                var tileRow = Math.floor(i / ROOM_COLS);
                var tileCol = i % ROOM_COLS;

                this.homeX = tileCol * ROOM_W;
                this.homeY = tileRow * ROOM_H;

                this.movementArray = [i];

                roomGrid[i] = TILE_FLOOR_STONE_1;
                break;
            }
        }

        this.x = this.homeX;
        this.y = this.homeY;

		this.popToGrid();
    }

    this.init = function(whichGraphic, whichName, tileTypeMatch, tied) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
		this.tiedUp = tied;
        this.reset(tileTypeMatch);
    }

	this.resetTurn = function() {
		// Currently, this is called by drawInitiativeOrder in
		// initiative.js
		// There really ought to be logic code responsible for turn
		// order stuff.
		this.remainingStamina = 10;
	}

	this.popToGrid = function(){
		var currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
		var col = currentIndex%ROOM_COLS;
		var row = Math.floor(currentIndex/ROOM_COLS);
		this.x = col * ROOM_W + ROOM_W * 0.5; 
		this.y = row * ROOM_H + ROOM_H * 0.5;
	}

	this.processTileAtIndex = function(currentIndex) {
	//	console.log("CI: " + currentIndex)
		if(this.movementArray.length > 1 && this.movementArray[1] == currentIndex){ //backtracking
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

	this.fireBolt = function(){
		var restoreFacing = this.facingDir;
		var randFacing = [DIR_N, DIR_E, DIR_S, DIR_W];
		randFacing.sort(() => 0.5 - Math.random());
		var target = undefined;
		for(var i=0; i< charList.length; i++){
			if(charList[i].isHuman == false){
				target = charList[i];
				console.log("Found Target");
				break;
			}	
		}
		for (var i=0; i<3; i++){
			this.facingDir = randFacing[i]
			let tempShot = new shotClass(magicMissile2Pic);
			tempShot.shootFrom(this, target, "Magic Missile");
			arrowList.push(tempShot);
		}
		textBoxUI.text = this.myName + " casts a fire bolt spell.";
		fireBoltSound.play();
		this.facingDir = restoreFacing;
	}

	this.shootArrow = function(){
		if(this.fireProjectileDir != -1){
			this.updateFacing(this.fireProjectileDir);
			this.fireProjectileDir = -1;
		}
		let tempShot = new shotClass(arrowPic);
		tempShot.shootFrom(this, undefined);
		arrowList.push(tempShot);
		this.takeShot = false;
		textBoxUI.text = this.myName + " fires an arrow.";
		arrowShotSound.play();
		endTurnBoxHovering = true;
		turnAdvance();
		this.usingPath = true;
	/*	currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
		this.movementArray = [currentIndex];	*/
	}

	this.movement = function() {
		var currentIndex;

		if(this.levitationTurn > 6){
			this.levitating = false;
			this.levitationTurn = 0;
			this.updateFacing(this.facingDir);
		}

		if(this.movementArray.length < 2){
			this.animateWalk = false;
		}

		if(this.usingPath == false){
			
			if(this.movementArray.length == 0){
				currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
				this.movementArray = [currentIndex];	
			}
			
			currentIndex = this.movementArray[0]; //Probably a better fix.  Player needs a movement in the array, or the player can't move.  This fixes that.

			if(this.findPlayer){
				this.checkPlayerLocationForNextMove(currentIndex);
			}

			if(this.keyHeld_North){
				currentIndex = indexN(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_North = false;
				if(this.findPlayer){
					this.checkPlayerLocationForNextMove(currentIndex);
				}
			}
			if(this.keyHeld_South){
				currentIndex = indexS(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_South = false;
				if(this.findPlayer){
					this.checkPlayerLocationForNextMove(currentIndex);
				}
			}
			if(this.keyHeld_West){
				currentIndex = indexW(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_West = false;
				if(this.findPlayer){
					this.checkPlayerLocationForNextMove(currentIndex);
				}
			}
			if(this.keyHeld_East){
				currentIndex = indexE(currentIndex);
				this.processTileAtIndex(currentIndex);
				this.keyHeld_East = false;
				if(this.findPlayer){
					this.checkPlayerLocationForNextMove(currentIndex);
				}
			}
		
			if(this.movementArray.length > this.remainingStamina) {
				this.movementArray.shift();
			} 

		} else { //we are using the path
			currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
			var tileN = indexN(currentIndex);
			var tileS = indexS(currentIndex);
			var tileW = indexW(currentIndex);
			var tileE = indexE(currentIndex);
			var lastNode = this.movementArray.length - 1;

			if(this.movementArray[lastNode] == currentIndex){
				this.popToGrid();
				this.movementArray.pop();
				
				this.remainingStamina--;

				if(this.movementArray.length == 0){
					if(this.takeShot){
						this.shootArrow();
					}
					this.movementArray[0] = currentIndex; // setting the head of the next array movement
					if(this.isHuman){
						var myC = whichCol(currentIndex);
						var myR = whichRow(currentIndex);
						if(myC == 0){
							roomChange(-1,0);
							levelLoadingSkipOperations = true;
						}
						if(myR == 0){
							roomChange(0,-1);
							levelLoadingSkipOperations = true;
						}
						if(myC == ROOM_COLS - 1){
							roomChange(1,0);
							levelLoadingSkipOperations = true;
						}
						if(myR == ROOM_ROWS - 1){
							roomChange(0,1);
							levelLoadingSkipOperations = true;
						}
					}
					// FIXME: at game start, movement array length is zero
					// but we don't want to end the turn before letting the player move...
					// maybe we can check to see if we're in mid-move
					endTurnNow();
				}
			} else if (this.movementArray[lastNode] == tileN) {
				this.y -= this.movementSpeed;
				this.updateFacing(DIR_N);
			} else if (this.movementArray[lastNode] == tileS) {
				this.y += this.movementSpeed;
				this.updateFacing(DIR_S);
			} else if (this.movementArray[lastNode] == tileW) {
				this.x -= this.movementSpeed;
				this.updateFacing(DIR_W);
			} else if (this.movementArray[lastNode] == tileE) {
				this.x += this.movementSpeed;
				this.updateFacing(DIR_E);
			}
		}
		this.drawIndex= getTileIndexAtPixelCoord(this.x,this.y);
	}	// END OF THIS.MOVEMENT
	 
	this.updateFacing = function(toDir) {
		if(this.wasLevitating == this.levitating && this.facingDir == toDir){
			return;
		}
		this.wasLevitating = this.levitating;
		this.facingDir = toDir;
		switch(toDir){
			case DIR_S: 
				if(this.levitating){
					this.offSetHeight = 4 * this.height;
				} else {
					this.offSetHeight = 0 * this.height;
				}
				break;
			case DIR_E:
				if(this.levitating){
					this.offSetHeight = 5 * this.height;
				} else {
					this.offSetHeight = 1 * this.height;
				}
				break;
			case DIR_N:
				if(this.levitating){
					this.offSetHeight = 6 * this.height;
				} else {
					this.offSetHeight = 2 * this.height
				}
				break;
			case DIR_W:
				if(this.levitating){
					this.offSetHeight = 7 * this.height;
				} else {
					this.offSetHeight = 3 * this.height;
				}
				break;
		}

		if(this.isHuman == false){
			//console.log("AI changing direction: " + this.facingDir);
			//console.trace();
		}

	}

}
