
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

	this.superInit = this.init;
	this.init = function (whichTile){
        var whichGraphic; 
        if(whichTile == TILE_KOBALD){
            whichGraphic = kobaldPic;
            this.maxMovement = 8;
            this.meleeCombatTactics = true;
            this.archerCombatTactics = false;
        } else if (whichTile == TILE_KOA_TOA){
            whichGraphic = koaToaPic;
            this.maxMovement = 6;
            this.meleeCombatTactics = true;
            this.archerCombatTactics = false;
        } else if (whichTile == TILE_KOBALD_ARCHER){
            whichGraphic = kobaldArcherPic;
            this.maxMovement = 8;
            this.meleeCombatTactics = false;
            this.archerCombatTactics = true;
        }
		this.superInit(whichGraphic,'enemy', whichTile);
        console.log(whichTile)
        
	}

    this.meleeCombat = function(){
        this.combatEngaged = true;
        if(this.attackTurn){
            //kobald will attack with a dagger
            //1d20 + 4 to hit to beat opponents AC (10)

            let attackRoll = getRndInteger(1, 20) + 4;
            let damageRoll = getRndInteger(1,4) + 4
            
            //1d4 + 2 for damage

            if(attackRoll >= charList[turnNumber].defense){
                charList[turnNumber].health = charList[turnNumber].health - damageRoll;
            }

            this.attackTurn = false;
        }
    }

    this.checkPlayerLocationForNextMove = function(currentIndex){
        var enemyRow = whichRow(currentIndex);
        var playerOne = charList[0]; // To do:  Scan for nearest is human
        var playerIndex = getTileIndexAtPixelCoord(playerOne.x,playerOne.y);
        if(this.meleeCombatTactics){
            var enemyDestinationIndex = indexS(playerIndex);   
            var destinationRow = whichRow(enemyDestinationIndex);
        } else if (this.archerCombatTactics){
            var enemyDestinationIndex = indexS(playerIndex);   
            var destinationRow = whichRow(enemyDestinationIndex);
        }
        var enemyCol = currentIndex%ROOM_COLS;
        var playerCol = Math.floor(playerOne.x/ROOM_W);

        if(enemyDestinationIndex == currentIndex){
            this.meleeCombat();
        }

       // console.log("Player Row: " + playerRow + " Enemy Row: " + enemyRow);

        this.keyHeld_North = false;
        this.keyHeld_South = false;
        this.keyHeld_West = false;
        this.keyHeld_East = false;

        if (destinationRow < enemyRow ){
            this.keyHeld_North = true;
        } else if (destinationRow > enemyRow){
            this.keyHeld_South = true;
        } else if (playerCol < enemyCol){
            this.keyHeld_West = true;
        } else if (playerCol > enemyCol){
            this.keyHeld_East = true;
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