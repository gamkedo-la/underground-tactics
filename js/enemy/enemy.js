
var kobaldList = [];
var kaoToaList = [];

function addKobald(){
    var tempEnemy = new enemyClass("Kobald");
	kobaldList.push(tempEnemy);
}

function addKoaToa(){
    var tempEnemy = new enemyClass("Kao Toa");
    kaoToaList.push(tempEnemy);
}

enemyClass.prototype = new CharacterBase();

function enemyClass(enemyType) {
    this.findPlayer = true;
    this.myPic = koaToaPic;

	this.superInit = this.init;
	this.init = function (whichGraphic, whichName, whichTile){
		this.superInit(whichGraphic, whichName, whichTile);
        console.log(whichGraphic, whichName, whichTile)
        if(whichName == "Kobald"){
            this.myPic = kobaldPic;
            this.maxMovement = 8;
        } else if (whichName == "Kao Toa"){
            this.myPic = koaToaPic;
            this.maxMovement = 6;
        }
	}

    this.meleeCombat = function(){
        console.log("Initiate Melee Combat");
        this.combatEngaged = true;
        if(this.attackTurn){
            //kobald will attack with a dagger
            //1d20 + 4 to hit to beat opponents AC (10)

            let attackRoll = getRndInteger(1, 20) + 4;
            let damageRoll = getRndInteger(1,4) + 4
            console.log("Attack Roll: " + attackRoll)
            
            //1d4 + 2 for damage

            if(attackRoll >= playerOne.defense){
                playerOne.health = playerOne.health - damageRoll;
                console.log("Health: " + playerOne.health)
            }

            this.attackTurn = false;
        }
    }

    this.checkPlayerLocationForNextMove = function(currentIndex){
        var enemyRow = whichRow(currentIndex);
        var playerIndex = getTileIndexAtPixelCoord(playerOne.x,playerOne.y);
        var enemyDestinationIndex = indexS(playerIndex);
        var destinationRow = whichRow(enemyDestinationIndex);
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

        drawIsoCharacterByFeet(this.myPic, isoDrawX, isoDrawY, this);
        //drawIsoCharacterByFeet(this.myBitmap, isoDrawX, isoDrawY, this);
        // drawIsoCharacterByFeet(playerPositionPic, isoDrawX, isoDrawY, this);
    }
}