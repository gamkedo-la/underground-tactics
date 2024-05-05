const SHOT_SPEED = 1.0;
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
		
		this.xv = 0;
		this.yv = SHOT_SPEED;
		
		this.shotLife = SHOT_LIFE;
	}

	this.movement = function() {
		this.X = this.x + this.xv;
		this.y = this.y + this.yv;
		console.log("move")
	}	
	
	this.hitTest = function(thisEnemy) {

		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		if(this.shotLife > 0){
			gameCoordToIsoCoord(this.x,this.y);
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white')
		}
	}
}