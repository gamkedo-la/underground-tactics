var turnOrderList = [];
var turnNumber = 0;

var mainOptions = false;
var spellOptions = false;
var potionOptions = false;

function addCreatureTurn(whichName, isHuman) {
    var tempCreature = new TurnOrderClass(whichName, isHuman);
    turnOrderList.push(tempCreature);
}

function TurnOrderClass(whichName, isHuman) {
    this.name = whichName;
    this.isHuman = isHuman;
    this.myTurn = false;
}

function determineSequenceOrder() {
    //determine order for active entities (player/enemies)
}

var turnTicks = 0;

// Called by drawInitiativeOrder and turnAdvance, but fallible, ought to be
// called when turn number changes.
function resetCharacterWithTurnNumber(turnNumber) {
	if (charList[turnNumber] != undefined) {
	    charList[turnNumber].resetTurn();
	}
}

function drawInitiativeOrder() {
    colorText("INITIATIVE", canvas.width - 100, 30, "WHITE");
    let yPos = 20;
    for (var i = 0; i < turnOrderList.length; i++) {
        if (i == turnNumber) {
            colorText("-" + turnOrderList[i].name, canvas.width - 100, yPos * i + 50, "lime");
            turnOrderList[i].myTurn = true;
        } else {
            colorText(" " + turnOrderList[i].name, canvas.width - 100, yPos * i + 50, "red");
            turnOrderList[i].myTurn = false;
        }
    }
    //temporary code to advance enemies until Enemy AI implemented
    if (charList[turnNumber].isHuman == false){
        turnTicks++;

        if(turnNumber >= charList.length){ // only wraps if Enemy is last in charList
            if (turnTicks > 120){
                turnTicks = 0;
		turnNumber = 0;
		resetCharacterWithTurnNumber(turnNumber);
            } 
        } else {
            moveBoxHovering = true;
            if(turnTicks == 2){
                for(i = 0; i < charList[turnNumber].maxMovement; i++){
                    charList[turnNumber].usingPath = false;
                    charList[turnNumber].movement();
                    turnTicks++;
                }
            } else if (turnTicks > 2) {
                charWalk(turnNumber);
            }
            if(turnTicks == 60){
                turnTicks = 0;
                charList[turnNumber].attackTurn = true;
		turnNumber++;
        if (turnNumber >= turnOrderList.length) {
            turnNumber = 0;
            for(var i = 0; i < charList.length; i++){
                charList[i].remainingStamina = charList[i].maxStamina;
            }
        }
		resetCharacterWithTurnNumber(turnNumber);
            }
        }
    }
}

function checkMousePositionInBox(posX, posY, height, width) {
    let boxX = posX;
    let boxY = posY;
    let boxHeight = height + boxY;
    let boxWidth = width + boxX;
    if (MousePosX > boxX && MousePosX < boxWidth &&
        MousePosY > boxY && MousePosY < boxHeight) {
        return true;
    } else {
        return false;
    }
}

var useItemX = 535;
var useItemY = 525;
var useItemBoxHovering = false;
var moveOptionX = 600;
var moveOptionY = 525;
var fireBoltBoxX = 600;
var fireBoltBoxY = 525;
var fireBoltBoxHovering = false;
var moveBoxHovering = false;
var spellBoxOptionX = 665;
var spellBoxOptionY = 525;
var spellBoxHovering = false;
var endTurnBoxOptionX = 730;
var endTurnBoxOptionY = 525;
var endTurnBoxHovering = false;

function turnAdvance() {
    if (endTurnBoxHovering) {
        if(charList[turnNumber].levitating){
            charList[turnNumber].levitationTurn++;
        }
        turnNumber++;
        if (turnNumber >= turnOrderList.length) {
            turnNumber = 0;
        }
        mainOptions = true;
        mainOptionsMenu.hidden = false;
        spellOptions = false;
        spellOptionsMenu.hidden = true;
        potionOptions = false;
        potionOptionsMenu.hidden = true;

	resetCharacterWithTurnNumber(turnNumber);
    }
}

function charWalk(whichChar){ //To Do:  These should probably use the same code?
    if(charList[whichChar].isHuman){
        if (moveBoxHovering || spacebarMoveWasRequested) {
            charList[whichChar].usingPath = !charList[whichChar].usingPath;
            charList[whichChar].animateWalk = true;
            spacebarMoveWasRequested = false;
        }
    } else {
        charList[whichChar].usingPath = true;
        charList[whichChar].movement();
        charList[whichChar].animateWalk = true;
    }
}

function displaySpells(){
    if (spellBoxHovering) {
        mainOptions = false;
        mainOptionsMenu.hidden = true;
        spellOptions = true;
        spellOptionsMenu.hidden = false;
        potionOptions = false;
        potionOptionsMenu.hidden = true;    
    }
}
 
function displayItems(){
    if (useItemBoxHovering) {
        mainOptions = false;
        mainOptionsMenu.hidden = true;
        spellOptions = false;
        spellOptionsMenu.hidden = true;
        potionOptions = true;
        potionOptionsMenu.hidden = false;
    }
}

function useFireBolt(){
    if (fireBoltBoxHovering) {
        mainOptions = true;
        mainOptionsMenu.hidden = false;
        spellOptions = false;
        spellOptionsMenu.hidden = true;
        potionOptions = false;
        potionOptionsMenu.hidden = true;
        charList[turnNumber].fireBolt();
    }
}

function checkPlayerOptionBoxes() { 
    for(var i = 0; i < turnOrderList.length; i++){
        if (    (turnOrderList[i].myTurn == true && turnOrderList[i].isHuman)  
        ) {
            if(mainOptions){
                useItemBoxHovering = checkMousePositionInBox(useItemX, useItemY, 50, 50);
                if (charList[turnNumber].movementArray.length > 0) {
                    moveBoxHovering = checkMousePositionInBox(moveOptionX, moveOptionY, 50, 50);
                }
                spellBoxHovering = checkMousePositionInBox(spellBoxOptionX, spellBoxOptionY, 50, 50);
                endTurnBoxHovering = checkMousePositionInBox(endTurnBoxOptionX, endTurnBoxOptionY, 50, 50);
            } else if (spellOptions){
                fireBoltBoxHovering = checkMousePositionInBox(fireBoltBoxX, fireBoltBoxY, 50, 50);
                spellBoxHovering = checkMousePositionInBox(spellBoxOptionX, spellBoxOptionY, 50, 50);
                endTurnBoxHovering = checkMousePositionInBox(endTurnBoxOptionX, endTurnBoxOptionY, 50, 50);
            } else if (potionOptions){
                moveBoxHovering = checkMousePositionInBox(moveOptionX, moveOptionY, 50, 50);
                spellBoxHovering = checkMousePositionInBox(spellBoxOptionX, spellBoxOptionY, 50, 50);
                endTurnBoxHovering = checkMousePositionInBox(endTurnBoxOptionX, endTurnBoxOptionY, 50, 50);
            }
        }
    }
}

function drawHealth() {
    for(var i = 0; i < turnOrderList.length; i++) {
        let character = charList[turnNumber];
        gameCoordToIsoCoord(character.x, character.y);
        // draw correct green/red ratio based on current health vs. max health
		let healthPercent = character.health / character.maxHealth;
		if (healthPercent > 1) healthPercent = 1;
		if (healthPercent < 0) healthPercent = 0;
		let barX = Math.round(isoDrawX - 38);
		let barY = Math.round(isoDrawY - 80);
		let barH = 6;
		let barW = 75;
		let border = 1;
		let greenW = Math.round(barW * healthPercent);
		let redW = barW - greenW;
        colorRect(barX-border, barY-border, barW+(border*2), barH+(border*2), 'black');
		colorRect(barX, barY, greenW, barH, 'lime');
        colorRect(barY + greenW, barY, redW, barH, 'red');
    }
}

function drawPlayerOptions() {
    colorText("Turn Options", canvas.width - 200, canvas.height - 90, "red", "14px Arial Black");
    for (var i = 0; i < turnOrderList.length; i++) {
        if (charList[turnNumber].isHuman) {
            if (mainOptions) {
                mainOptionsMenu.hidden = false;
                canvasContext.drawImage(useItemPic, useItemX, useItemY);
                if (useItemBoxHovering) {
                    colorText("Items", useItemX + 5, useItemY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Items", useItemX + 5, useItemY + 65, "red", "14px Arial Black");
                }

                if (charList[turnNumber].remainingStamina <= 0) {
                    canvasContext.drawImage(wizardMovementPic, moveOptionX, moveOptionY);
                    if (moveBoxHovering) {
                        colorText("Move", moveOptionX + 5, moveOptionY + 65, "lime", "14px Arial Black");
                    } else {
                        colorText("Move", moveOptionX + 5, moveOptionY + 65, "red", "14px Arial Black");
                    }
                }

                canvasContext.drawImage(wizardSpellPic, spellBoxOptionX, spellBoxOptionY);
                if (spellBoxHovering) {
                    colorText("Spell", spellBoxOptionX + 5, spellBoxOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Spell", spellBoxOptionX + 5, spellBoxOptionY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(endTurnPic, endTurnBoxOptionX, endTurnBoxOptionY);
                if (endTurnBoxHovering) {
                    colorText("End Turn", endTurnBoxOptionX - 10, endTurnBoxOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("End Turn", endTurnBoxOptionX - 10, endTurnBoxOptionY + 65, "red", "14px Arial Black");
                }
            } else if (spellOptions) {
                canvasContext.drawImage(spellFirePic, moveOptionX, moveOptionY);
                if (fireBoltBoxHovering) {
                    colorText("Fire Bolt", fireBoltBoxX + 5, fireBoltBoxY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Fire Bolt", fireBoltBoxY + 5, fireBoltBoxY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(magicMissilePic, spellBoxOptionX, spellBoxOptionY);
                if (spellBoxHovering) {
                    colorText("Spell", spellBoxOptionX + 5, spellBoxOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Spell", spellBoxOptionX + 5, spellBoxOptionY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(endTurnPic, endTurnBoxOptionX, endTurnBoxOptionY);
                if (endTurnBoxHovering) {
                    colorText("End Turn", endTurnBoxOptionX - 10, endTurnBoxOptionY + 65, "lime", "15px Arial Black");
                } else {
                    colorText("End Turn", endTurnBoxOptionX - 10, endTurnBoxOptionY + 65, "red", "14px Arial Black");
                }
            } else if (potionOptions) {
                canvasContext.drawImage(manaPotionPic, moveOptionX, moveOptionY);
                if (moveBoxHovering) {
                    colorText("Mana", moveOptionX + 5, moveOptionY + 65, "lime", "15px Arial Black");
                } else {
                    colorText("Mana", moveOptionX + 5, moveOptionY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(healthPotionPic, spellBoxOptionX, spellBoxOptionY);
                if (spellBoxHovering) {
                    colorText("Levitation", spellBoxOptionX, spellBoxOptionY + 65, "lime", "15px Arial Black");
                } else {
                    colorText("Levitation", spellBoxOptionX, spellBoxOptionY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(endTurnPic, endTurnBoxOptionX, endTurnBoxOptionY);
                if (endTurnBoxHovering) {
                    colorText("End Turn", endTurnBoxOptionX - 10, endTurnBoxOptionY + 65, "lime", "15px Arial Black");
                } else {
                    colorText("End Turn", endTurnBoxOptionX - 10, endTurnBoxOptionY + 65, "red", "14px Arial Black");
                }
            }
        }
    }
}
