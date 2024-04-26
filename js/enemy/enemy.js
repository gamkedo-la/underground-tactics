
var kobaldList = [];

function addKobald(){
    var tempEnemy = new enemyClass("Kobald");
	kobaldList.push(tempEnemy);
}

function enemyClass(enemyType) {
    this.x = 600;
    this.y = 800;
    this.width = 50;
    this.height = 75;
    this.offSetWidth = 0;
    this.offSetHeight = 0;
    this.movementSpeed = 3.0;
    this.maxMovement = 3;
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
    this.frames = 4;
    this.healingPotion = 0;
    this.manaPotion = 0;
    this.staminaPotion = 0;
    this.levitatePotion = 0;
    this.enemy = enemyType;
    this.movementArray = [293];
    this.usingPath = false;

    this.reset = function() {
        this.speed = 0;
        this.keysHeld = 0;

        for (var i = 0; i < roomGrid.length; i++) {
            if (roomGrid[i] == TILE_KOBALD) {
                console.log("Found Kobald")
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
    }

    this.init = function(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset();
    }

    this.move = function() {
        var currentIndex;
     //   console.log("Kobald move")
        var playerIndex = getTileIndexAtPixelCoord(playerOne.x,playerOne.y);
        var enemyIndex = getTileIndexAtPixelCoord(this.x, this.y);
        console.log("player Index: " + playerIndex + " Enemy Index: " + enemyIndex);

        if (this.usingPath == false) {
            currentIndex = this.movementArray[0];
            if (this.keyHeld_North) {
                currentIndex = indexN(currentIndex);
                if (this.movementArray.length > 1 && this.movementArray[1] == currentIndex) {
                    this.movementArray.shift();
                } else {
                    this.movementArray.unshift(currentIndex);
                }
                this.keyHeld_North = false;
            }
            if (this.keyHeld_South) {
                currentIndex = indexS(currentIndex);
                if (this.movementArray.length > 1 && this.movementArray[1] == currentIndex) {
                    this.movementArray.shift();
                } else {
                    this.movementArray.unshift(currentIndex);
                }
                this.keyHeld_South = false;
            }
            if (this.keyHeld_West) {
                currentIndex = indexW(currentIndex);
                if (this.movementArray.length > 1 && this.movementArray[1] == currentIndex) {
                    this.movementArray.shift();
                } else {
                    this.movementArray.unshift(currentIndex);
                }
                this.keyHeld_West = false;
                console.log("Array: " + this.movementArray.length)
            }
            if (this.keyHeld_East) {
                currentIndex = indexE(currentIndex);
                if (this.movementArray.length > 1 && this.movementArray[1] == currentIndex) {
                    this.movementArray.shift();
                } else {
                    this.movementArray.unshift(currentIndex);
                }
                this.keyHeld_East = false;
            }

            if (this.movementArray.length > this.maxMovement) {
                this.movementArray.shift();
            }
           // console.log("Movement Array: " + this.movementArray.length)
        } else {
            currentIndex = getTileIndexAtPixelCoord(this.x, this.y);
            var tileN = indexN(currentIndex);
            var tileS = indexS(currentIndex);
            var tileW = indexW(currentIndex);
            var tileE = indexE(currentIndex);
            var lastNode = this.movementArray.length - 1;
            console.log(this.movementArray[lastNode], currentIndex);
            if (this.movementArray[lastNode] == currentIndex) {
                var col = currentIndex % ROOM_COLS;
                var row = Math.floor(currentIndex / ROOM_COLS);
                this.x = col * ROOM_W + ROOM_W * 0.5;
                this.y = row * ROOM_H + ROOM_H * 0.5;
                this.movementArray.pop();
                if (this.movementArray.length == 1) {
                    this.usingPath = false;
                }
            } else if (this.movementArray[lastNode] == tileN) {
                this.y -= this.movementSpeed;
                this.offSetHeight = 2 * this.height;
            } else if (this.movementArray[lastNode] == tileS) {
                this.y += this.movementSpeed;
                this.offSetHeight = 0 * this.height;
            } else if (this.movementArray[lastNode] == tileW) {
                this.x -= this.movementSpeed;
                this.offSetHeight = 3 * this.height;
            } else if (this.movementArray[lastNode] == tileE) {
                this.x += this.movementSpeed;
                this.offSetHeight = 1 * this.height;
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
        gameCoordToIsoCoord(this.x, this.y);
        if (this.animateWalk) {
            this.ticks++;
            if (this.ticks > 3) {
                this.frame++;
                this.ticks = 0;
            }
            if (this.frame > this.frames) {
                this.frame = 1;
            }
            this.offSetWidth = this.frame * this.width;
        }

        drawIsoCharacterByFeet(kobaldPic, isoDrawX, isoDrawY, this);
        //drawIsoCharacterByFeet(this.myBitmap, isoDrawX, isoDrawY, this);
         drawIsoCharacterByFeet(playerPositionPic, isoDrawX, isoDrawY, this);
    }
}