const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

function shotClass(){
	this.x;
	this.y;
	this.readyToRemove = false;
	
	this.picture = document.createElement("img");
	
	this.reset = function() {
		this.shotLife = 0;
		this.x, this.y;
		this.readyToRemove = true;
	}
		
	this.isAbleToFire = function(){
		return (this.shotLife <= 0);
	}
	
	this.shootFrom = function(character){
		this.x = character.x;
		this.y = character.y;
		
		this.xv = SHOT_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.yv;
		
		this.shotLife = SHOT_LIFE;
	}

	this.movement = function() {
 
		if(this.shotLife > 0){
			this.shotLife--;
			this.superclassMove();
		}
	}	
	
	this.hitTest = function(thisEnemy) {

		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		if(this.shotLife > 0){
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white')
		}
	}
}