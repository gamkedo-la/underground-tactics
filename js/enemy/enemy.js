
var charList = [];

function addEnemy(enemyTileType){
    var tempEnemy = new enemyClass();
	tempEnemy.init(enemyTileType);
    charList.push(tempEnemy);
}

enemyClass.prototype = new CharacterBase();

function enemyClass() {
    this.findPlayer = true;
    this.meleeCombatTactics;
    this.archerCombatTactics;
    this.takeShot = false;
    this.moveAwayFromPlayer = false;

	this.superInit = this.init;
	this.init = function (whichTile){
        var whichGraphic; 
        if(whichTile == TILE_KOBALD){
            whichGraphic = kobaldPic;
            this.maxMovement = 8;
            this.meleeCombatTactics = true;
            this.archerCombatTactics = false;
            this.myName = "Kobald";
        } else if (whichTile == TILE_KOA_TOA){
            whichGraphic = koaToaPic;
            this.maxMovement = 6;
            this.meleeCombatTactics = true;
            this.archerCombatTactics = false;
            this.myName = "Koa Toa";
        } else if (whichTile == TILE_KOBALD_ARCHER){
            whichGraphic = kobaldArcherPic;
            this.maxMovement = 8;
            this.meleeCombatTactics = false;
            this.archerCombatTactics = true;
            this.myName = "Kobald Archer";
        }
		this.superInit(whichGraphic,this.myName, whichTile);
    //    console.log(whichTile)
        
	}

    this.meleeCombat = function(target){
       // console.log("Enemy Melee")

        var myIndex = getTileIndexAtPixelCoord(this.x,this.y);
        var targetIndex = getTileIndexAtPixelCoord(target.x,target.y);
        var inRange = false;

        if(indexN(myIndex) == myIndex ||
           indexE(myIndex) == myIndex ||
           indexS(myIndex) == myIndex ||
           indexW(myIndex) == myIndex){
            inRange = true;
        }

        if(inRange == false){
            console.log("Not in range for Melee")
            return;
        }
        
        this.combatEngaged = true;
        if(this.attackTurn){
            //kobald will attack with a dagger
            //1d20 + 4 to hit to beat opponents AC (10)

            let attackRoll = getRndInteger(1, 20) + 4;
            let damageRoll = getRndInteger(1,4) + 4
            
            //1d4 + 2 for damage

            if(attackRoll >= target.defense){
                target.health -= damageRoll;
            }

            this.attackTurn = false;
        }
    }

    this.checkPlayerLocationForNextMove = function(currentIndex){
        if(this.takeShot){
            return;
        }
        var enemyRow = whichRow(currentIndex);
        var playerOne = null; // Scan for nearest is human
     
        for(var i = 0; i < charList.length; i++){
            if(charList[i].isHuman){
                playerOne = charList[i];
                break;
            }
        } 
        if(playerOne == null){
            console.log("AI can't find player");
            return;
        } 
        
        var playerIndex = getTileIndexAtPixelCoord(playerOne.x,playerOne.y);
        var enemyCol = currentIndex%ROOM_COLS;
        var playerCol = Math.floor(playerOne.x/ROOM_W);
        var playerRow = whichRow(playerIndex);
        var enemyDestinationIndex = playerIndex;   
        var destinationRow = whichRow(enemyDestinationIndex);
        var destinationCol = whichCol(enemyDestinationIndex);
        
        if(this.meleeCombatTactics){
            enemyDestinationIndex = indexS(playerIndex);   
            destinationRow = whichRow(enemyDestinationIndex);
            destinationCol = whichCol(enemyDestinationIndex);
            var myIndex = getTileIndexAtPixelCoord(this.x,this.y);
            if(enemyDestinationIndex == myIndex){
                this.meleeCombat(playerOne);
            }
        } else if (this.archerCombatTactics){
            enemyDestinationIndex = playerIndex;   
            destinationRow = whichRow(enemyDestinationIndex);
            destinationCol = whichCol(enemyDestinationIndex);
            if( enemyCol == playerCol || 
                enemyRow == playerRow){
                console.log("Firing Arrow",enemyCol,playerCol,enemyRow,playerRow);
                this.takeShot = true;
                this.usingPath = true;
                this.keyHeld_North = false;
                this.keyHeld_South = false;
                this.keyHeld_West = false;
                this.keyHeld_East = false;
                if(enemyCol == playerCol){
                    if(enemyRow < playerRow){
                        this.fireProjectileDir = DIR_S;
                    } else {
                        this.fireProjectileDir = DIR_N;                        
                    }
                } else {
                    if(enemyCol < playerCol){
                        this.fireProjectileDir = DIR_E;
                    } else {
                        this.fireProjectileDir = DIR_W;                        
                    }
                } 

                if(this.isHuman == false){
                    console.log("AI finished aiming")
                }
                return;

            }
        } else if (this.moveAwayFromPlayer){
            enemyDestinationIndex = playerIndex;   
            destinationRow = whichRow(enemyDestinationIndex);
            destinationCol = whichCol(enemyDestinationIndex);
            if( enemyCol == playerCol){
                if (enemyRow < playerRow){
                    destinationRow = currentIndex - (ROOM_COLS * 5);
                } else {
                    destinationRow = currentIndex + (ROOM_COLS * 5);
                }
            }

        }

        if(enemyDestinationIndex == currentIndex){
            this.meleeCombat(playerOne);
        }

       // console.log("Player Row: " + playerRow + " Enemy Row: " + enemyRow);

        this.keyHeld_North = false;
        this.keyHeld_South = false;
        this.keyHeld_West = false;
        this.keyHeld_East = false;

        if(this.takeShot){
            console.log("Skipping walk to aim arrow");
        } else if(Math.abs(destinationRow - enemyRow) < Math.abs(destinationCol-enemyCol)) {
            if (destinationRow < enemyRow ){
                this.keyHeld_North = true;
            } else if (destinationRow > enemyRow){
                this.keyHeld_South = true;
            } else if (destinationCol < enemyCol){
                this.keyHeld_West = true;
            } else if (destinationCol > enemyCol){
                this.keyHeld_East = true;
            }
        } else {
            if (destinationCol < enemyCol){
                this.keyHeld_West = true;
            } else if (destinationCol > enemyCol){
                this.keyHeld_East = true;
            } else if (destinationRow < enemyRow ){
                this.keyHeld_North = true;
            } else if (destinationRow > enemyRow){
                this.keyHeld_South = true;
            } 
        }
        
         
    }

    this.checkCollisionsAgainst = function(otherHumanoid) {
        if (this.collisionTest(otherHumanoid)) {
            if (this.keyHeld_North) {
                this.canMoveNorth = false;
                this.y += this.movementSpeed * COLLIDE_BUMP_MULT;
            } else if (this.keyHeld_East) {
                this.canMoveEast = false;
                this.x -= this.movementSpeed * COLLIDE_BUMP_MULT;
            } else if (this.keyHeld_South) {
                this.canMoveSouth = false;
                this.y -= this.movementSpeed * COLLIDE_BUMP_MULT;
            } else if (this.keyHeld_West) {
                this.canMoveWest = false;
                this.x += this.movementSpeed * COLLIDE_BUMP_MULT;
            }
        } else {
            this.canMoveNorth = true;
            this.canMoveEast = true;
            this.canMoveSouth = true;
            this.canMoveWest = true;
        }
    }

    this.collisionTest = function(otherHumanoid) {
        if (this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
            this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20) {
            return true;
        }
        return false;
    }

    this.draw = function() {
        
        if(this.movementArray.length < 2){
			this.animateWalk = false;
		}

        gameCoordToIsoCoord(this.x, this.y);
        drawIsoCharacterByFeet(playerPositionPic,isoDrawX, isoDrawY, this);
        if (this.animateWalk) {
            this.ticks++;
            if (this.ticks > 3) {
                this.frame++;
                this.ticks = 0;
            }
            if (this.frame > this.frames) {
                this.frame = 0;
            }
            this.offSetWidth = this.frame * this.width;
        }

        drawIsoCharacterByFeet(this.myBitmap, isoDrawX, isoDrawY, this);
        

        //drawIsoCharacterByFeet(this.myBitmap, isoDrawX, isoDrawY, this);
        // drawIsoCharacterByFeet(playerPositionPic, isoDrawX, isoDrawY, this);
    }
}