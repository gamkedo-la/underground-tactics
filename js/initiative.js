var turnOrderList = [];
var turnNumber = 0;

function addCreatureTurn(whichName, initiaveScore) {
    var tempCreature = new TurnOrderClass(whichName, initiaveScore);
    turnOrderList.push(tempCreature);
}

function TurnOrderClass(whichName, initiaveScore) {
    this.name = whichName;
    this.initiaveScore = initiaveScore;
    this.myTurn = false;
}


function determineSequenceOrder() {
    //determine order for active entities (player/enemies)
}

var turnTicks = 0;

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
    if (turnNumber > 0) {
        turnTicks++;
        if (turnTicks > 30) {
            turnNumber++;
            turnTicks = 0;
        }
        if (turnNumber == 4) {
            turnNumber = 0;
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
var moveBoxHovering = false;
var spellBoxOptionX = 665;
var spellBoxOptionY = 525;
var spellBoxHovering = false;
var endTurnBoxOptionX = 730;
var endTurnBoxOptionY = 525;
var endTurnBoxHovering = false;

function turnAdvance() {
    if (endTurnBoxHovering) {
        turnNumber++;
        if (turnNumber >= turnOrderList.length) {
            turnNumber = 0;
        }
        mainOptions = true;
        spellOptions = false;
        potionOptions = false;
    }
}

function wizardWalk() {
    if (moveBoxHovering) {
        playerOne.usingPath = !playerOne.usingPath;
        playerOne.animateWalk = true;
    }
}

function displaySpells(){
    if (spellBoxHovering) {
        mainOptions = false;
        spellOptions = true;
        potionOptions = false;
    }
}

function displayItems(){
    if (useItemBoxHovering) {
        mainOptions = false;
        spellOptions = false;
        potionOptions = true;
    }
}

var mainOptions = true;
var spellOptions = false;
var potionOptions = false;

function checkPlayerOptionBoxes() { 
    for(var i = 0; i < turnOrderList.length; i++){
        if (turnOrderList[i].myTurn == true && turnOrderList[i].name == "Wizard") {
            if(mainOptions){
                useItemBoxHovering = checkMousePositionInBox(useItemX, useItemY, 50, 50);
                if (playerOne.movementArray.length > 0) {
                    moveBoxHovering = checkMousePositionInBox(moveOptionX, moveOptionY, 50, 50);
                }
                spellBoxHovering = checkMousePositionInBox(spellBoxOptionX, spellBoxOptionY, 50, 50);
                endTurnBoxHovering = checkMousePositionInBox(endTurnBoxOptionX, endTurnBoxOptionY, 50, 50);
            } else if (spellOptions){
                moveBoxHovering = checkMousePositionInBox(moveOptionX, moveOptionY, 50, 50);
                spellBoxHovering = checkMousePositionInBox(spellBoxOptionX, spellBoxOptionY, 50, 50);
                endTurnBoxHovering = checkMousePositionInBox(endTurnBoxOptionX, endTurnBoxOptionY, 50, 50);
            }
        }
    }
}

function drawPlayerOptions() {
    colorText("Turn Options", canvas.width - 200, canvas.height - 90, "red", "14px Arial Black");
    for(var i = 0; i < turnOrderList.length; i++){
        if (turnOrderList[i].myTurn == true && turnOrderList[i].name == "Wizard") {
            if(mainOptions){
                canvasContext.drawImage(useItemPic, useItemX, useItemY);
                if (useItemBoxHovering) {
                    colorText("Items", useItemX + 5, useItemY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Items", useItemX + 5, useItemY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(wizardMovementPic, moveOptionX, moveOptionY);
                if (moveBoxHovering) {
                    colorText("Move", moveOptionX + 5, moveOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Move", moveOptionX + 5, moveOptionY + 65, "red", "14px Arial Black");
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
            } else if (spellOptions){
                canvasContext.drawImage(spellFirePic, moveOptionX, moveOptionY);
                if (moveBoxHovering) {
                    colorText("Fire", moveOptionX + 5, moveOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Fire", moveOptionX + 5, moveOptionY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(magicMissilePic, spellBoxOptionX, spellBoxOptionY);
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
            } else if (potionOptions)                
                canvasContext.drawImage(potionManaPic, moveOptionX, moveOptionY);
                if (moveBoxHovering) {
                    colorText("Fire", moveOptionX + 5, moveOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Fire", moveOptionX + 5, moveOptionY + 65, "red", "14px Arial Black");
                }
                canvasContext.drawImage(magicMissilePic, spellBoxOptionX, spellBoxOptionY);
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
            }
    }       
}