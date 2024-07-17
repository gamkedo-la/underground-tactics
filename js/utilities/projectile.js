const SHOT_SPEED = 6.0;
const SHOT_LIFE = 60;

var arrowList = [];

function removeArrowFromList() {
	for(var i=0; i<arrowList.length; i++) {
        if(arrowList[i].readyToRemove){
            arrowList.splice(i,1);
        }
	}
}

function shotClass(whichPic){
	this.projectileX;
	this.projectileY;
	this.picture;
	this.readyToRemove = false;
	this.offSetWidth = 0; 
	this.offSetHeight = 100; 
	this.width = 50; 
	this.height = 50;
	this.ticks = 0;
	this.frame = 0;
	this.frames = 3;
	this.magicTarget = undefined;
	
	this.picture = whichPic;

	
	this.reset = function() {
		this.shotLife = 0;
		this.projectileX, this.projectileY;
		this.readyToRemove = true;
	}
		
	this.isAbleToFire = function(){
		return (this.shotLife <= 0);
	}
	
	this.shootFrom = function(character, targetWithMagic){
		this.projectileX = character.x;
		this.projectileY = character.y;
		this.magicTarget = targetWithMagic;
		console.log("Has target? " + (this.magicTarget != null) );

		this.projectileXV = 0;
		this.projectileYV = 0;

		if(character.facingDir == DIR_S){
			this.projectileYV = SHOT_SPEED;
		} else if (character.facingDir == DIR_E){
			this.projectileXV = SHOT_SPEED;
		} else if (character.facingDir == DIR_N){
			this.projectileYV = -SHOT_SPEED;
		} else if (character.facingDir == DIR_W){
			this.projectileXV = -SHOT_SPEED;
		}

		this.setFacing(character.facingDir);
		
		this.shotLife = SHOT_LIFE;
	}

	this.setFacing = function(newFacing){
		switch (newFacing){
			case DIR_S:
				this.offSetHeight = 100;
				break;
			case DIR_E:
				this.offSetHeight = 150;
				break;
			case DIR_N:
				this.offSetHeight = 50;
				break;
			case DIR_W:
				this.offSetHeight = 0;
				break;
		}
	}

	this.move = function() {
		if(this.magicTarget != undefined){
			var dX = this.magicTarget.x - this.projectileX;
			var dY = this.magicTarget.y - this.projectileY;
			var len = Math.sqrt(dX*dX + dY*dY);
			var smoothTurn = 0.98;
			var shotSpeed = 9.0;
			this.projectileXV = smoothTurn * this.projectileXV + (shotSpeed * dX / len) * (1.0 - smoothTurn);
			this.projectileYV = smoothTurn * this.projectileYV + (shotSpeed * dY / len) * (1.0 - smoothTurn);
			var moreXVThanYV = Math.abs(this.projectileXV > Math.abs(this.projectileYV));
			if(moreXVThanYV){
				if(this.projectileXV < 0){
					this.setFacing(DIR_W);
				} else {
					this.setFacing(DIR_E);
				}
			} else {
				if(this.projectileYV < 0){
					this.setFacing(DIR_N);
				} else {
					this.setFacing(DIR_S);
				}
			}
			if(len < 20){
				this.readyToRemove = true;
				console.log("Fireball hit target");
				this.magicTarget.health-=2;
			}
		}
		this.projectileX = this.projectileX + this.projectileXV;
		this.projectileY = this.projectileY + this.projectileYV;
		if(this.picture == fireBoltPic){
			addSmoke(this.projectileX-50, this.projectileY-20, 10);
		}
		if(	this.projectileX < 0 || this.projectileX > canvas.width ||
			this.projectileY < 0 || this.projectileY > canvas.height){
				this.readyToRemove = true;
			}
	}	
	
	this.hitTest = function(thisEnemy) {

		//return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		this.ticks++;
		if(this.ticks > 3){
			this.frame++;
			this.ticks = 0;
		}

		if(this.frame > this.frames){
			this.frame = 1;
		}

		this.offSetWidth = this.frame * this.width;
		
		gameCoordToIsoCoord(this.projectileX,this.projectileY);
		drawIsoCharacterByFeet(this.picture,isoDrawX, isoDrawY, this);
		colorRect(isoDrawX, isoDrawY, 3, 3, "lime");
	}
}