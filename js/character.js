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
	this.defense = 10;
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
	this.combatEngaged = false;
    this.attackTurn = true;

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

    this.init = function(whichGraphic, whichName, tileTypeMatch) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset(tileTypeMatch);
    }

	this.popToGrid = function(){
		var currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
		var col = currentIndex%ROOM_COLS;
		var row = Math.floor(currentIndex/ROOM_COLS);
		this.x = col * ROOM_W + ROOM_W * 0.5; 
		this.y = row * ROOM_H + ROOM_H * 0.5;
	}

	this.processTileAtIndex = function(currentIndex) {
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
			if(this.findPlayer){
				if(this.movementArray.length == 1){
					this.keyHeld_North = true;
				}
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

			if(this.movementArray[lastNode] == currentIndex){
				this.popToGrid();
				this.movementArray.pop();
				if(this.movementArray.length == 0){
					this.usingPath = false;
					this.movementArray[0] = currentIndex; // setting the head of the next array movement
				}
			} else if (this.movementArray[lastNode] == tileN) {
				this.y -= this.movementSpeed;
				if(this.levitating){
					this.offSetHeight = 6 * this.height;
				} else {
					this.offSetHeight = 2 * this.height
				}
			} else if (this.movementArray[lastNode] == tileS) {
				this.y += this.movementSpeed;
				if(this.levitating){
					this.offSetHeight = 4 * this.height;
				} else {
					this.offSetHeight = 0 * this.height;
				}
			} else if (this.movementArray[lastNode] == tileW) {
				this.x -= this.movementSpeed;
				if(this.levitating){
					this.offSetHeight = 7 * this.height;
				} else {
					this.offSetHeight = 3 * this.height;
				}
			} else if (this.movementArray[lastNode] == tileE) {
				this.x += this.movementSpeed;
				if(this.levitating){
					this.offSetHeight = 5 * this.height;
				} else {
					this.offSetHeight = 1 * this.height;
				}
			}
		}
	}	// END OF THIS.MOVEMENT
	 

}