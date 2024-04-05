var smokeList = [];

function particleClass(xPos, yPos, amountOfParticles, duration) {
	this.x = xPos;
	this.y = yPos;
	this.velX = 5;
	this.velY = -7;
	this.amountOfSmoke = amountOfParticles;
	this.readyToRemove = false;
	this.cyclesLeft = duration * 100;
	this.myColor;
    this.height = 2;
    this.width = 2;

	this.move = function() {
		this.cyclesLeft--;

		if(this.cyclesLeft < 0) {
			this.readyToRemove = true;
		}

		this.x += this.velX;
		this.y += this.velY;
	}

	this.draw = function() {
        if(this.cyclesLeft){
            gameCoordToIsoCoord(this.x, this.y);
		    colorCircle(isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.myColor);//(this.cyclesLeft), this.myColor);
        }
    }
}

function addSmoke(smokeX, smokeY, amount) {
	var tempSmoke;

	tempSmoke = new particleClass();
	tempSmoke.x = smokeX;
	tempSmoke.y = smokeY;
	tempSmoke.velX = getRndInteger(-1, 1);
	tempSmoke.velY = getRndInteger(-3, -1);
	tempSmoke.cyclesLeft = 5 + Math.floor( Math.random() * 100 );
	tempSmoke.amountOfSmoke = amount;

	var colorOptions = Math.random();
	if(colorOptions < 0.25) {
		tempSmoke.myColor = "darkGray";
	} else if (colorOptions >= 0.25 && colorOptions <= 0.5) {
		tempSmoke.myColor = "rgba(100,149,237,.2)";
	} else if (colorOptions > 0.5 && colorOptions <= 0.6) {
		tempSmoke.myColor = "rgba(100,149,237,.4)";
	} else {
		tempSmoke.myColor = "lightGray";
	}
	smokeList.push(tempSmoke);
}

function removeSmokeFromList() {
	for(var i=0; i<smokeList.length; i++) {
        if(smokeList[i].readyToRemove){
            smokeList.splice(i,1);
        }
	}
}



