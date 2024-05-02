
var kobaldList = [];

function addKobald(){
    var tempEnemy = new enemyClass("Kobald");
	kobaldList.push(tempEnemy);
}

enemyClass.prototype = new CharacterBase();

function enemyClass(enemyType) {
    this.width = 50;
    this.height = 75;
    this.offSetWidth = 0;
    this.offSetHeight = 0;
    this.movementSpeed = 3.0;
    this.maxMovement = 5;
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
    this.movementArray = [67];
    this.usingPath = false;
    this.animateWalk = false;
    this.ticks = 0;
    this.frame = 0;
    this.frames = 3;
    this.healingPotion = 0;
    this.manaPotion = 0;
    this.staminaPotion = 0;
    this.levitatePotion = 0;
    this.enemy = enemyType;
    this.movementArray = [293];
    this.usingPath = false;
    this.levitating = false;
    this.combatEngaged = false;
    this.attackTurn = true;

	this.superInit = this.init;
	this.init = function (whichGraphic, whichName){
		this.superInit(whichGraphic, whichName, TILE_KOBALD);
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

        drawIsoCharacterByFeet(kobaldPic, isoDrawX, isoDrawY, this);
        //drawIsoCharacterByFeet(this.myBitmap, isoDrawX, isoDrawY, this);
         drawIsoCharacterByFeet(playerPositionPic, isoDrawX, isoDrawY, this);
    }
}