const ISO_CHAR_FOOT_Y = 8;
const COLLIDE_BUMP_MULT = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)

warriorClass.prototype = new CharacterBase();

function warriorClass() {
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

	this.warriorPic = document.createElement("img");
	
	this.setupControls = function(northKey,eastKey,southKey,westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.superInit = this.init;
	this.init = function (whichGraphic, whichName){
		this.superInit(whichGraphic, whichName, TILE_PLAYER);
	}


	this.levitate = function(){
		if(spellBoxHovering){
			this.levitating = true;
			mainOptions = true;
			spellOptions = false;
			potionOptions = false;
		}
	}



	this.fireBolt = function(){

	}
		
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
