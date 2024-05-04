var turnOrderList = [];
var turnNumber = 0;

var mainOptions = false;
var spellOptions = false;
var potionOptions = false;

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
    if (turnNumber > 0){
        turnTicks++;
        if (turnNumber == 1){
            moveBoxHovering = true;
            if(turnTicks == 2){
                for(i = 0; i < kobaldList[0].maxMovement; i++){
                    kobaldList[0].usingPath = false;
                    kobaldList[0].move();
                    turnTicks++;
                }
                //console.log("Kobald List: " + kobaldList[0].movementArray.length)
            } else if (turnTicks > 2) {
                kobaldWalk(0);
            }
            if(turnTicks == 60){
                turnTicks = 0;
                kobaldList[0].attackTurn = true;
                turnNumber++;
            }
        } else if(turnNumber == 2){
            moveBoxHovering = true;
            if(turnTicks == 2){
                for(i = 0; i < kobaldList[1].maxMovement; i++){
                    kobaldList[1].usingPath = false;
                    kobaldList[1].move();
                    turnTicks++;
                }
                //console.log("Kobald List: " + kobaldList[1].movementArray.length)
            } else if (turnTicks > 2) {
                kobaldWalk(1);
            }
            if(turnTicks == 60){
                turnTicks = 0;
                kobaldList[1].attackTurn = true;
                turnNumber++;
            }
        } else {
            if (turnTicks > 30){
                turnNumber++;
                turnTicks = 0;
                if (turnNumber == 4){
                    turnNumber = 0;
                }        
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
        if(playerOne.levitating){
            playerOne.levitationTurn++;
        }
    }
}

function wizardWalk() {
    if (moveBoxHovering) {
        playerOne.usingPath = !playerOne.usingPath;
        playerOne.animateWalk = true;
    }
}

function kobaldWalk(whichKobald){
    kobaldList[whichKobald].usingPath = true;
    kobaldList[whichKobald].movement();
    kobaldList[whichKobald].animateWalk = true;
}

function displaySpells(){
    console.log("spellBoxHovering:" + spellBoxHovering)
    if (spellBoxHovering) {
        mainOptions = false;
        spellOptions = true;
        potionOptions = false;
        console.log(mainOptions, spellOptions, potionOptions)    
    }
}
 
function displayItems(){
    if (useItemBoxHovering) {
        mainOptions = false;
        spellOptions = false;
        potionOptions = true;
    }
}

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
            } else if (potionOptions){
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
            console.log(mainOptions, spellOptions, potionOptions)
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
                    colorText("Fire Bolt", moveOptionX + 5, moveOptionY + 65, "lime", "14px Arial Black");
                } else {
                    colorText("Fire Bolt", moveOptionX + 5, moveOptionY + 65, "red", "14px Arial Black");
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
            } else if (potionOptions)  {              
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