var turnOrderList = [];

var turnNumber = 0;

function addCreatureTurn(whichName, initiaveScore){
    var tempCreature = new TurnOrderClass(whichName, initiaveScore);
	turnOrderList.push(tempCreature);
}

function TurnOrderClass(whichName, initiaveScore) {
    this.name = whichName;
    this.initiaveScore = initiaveScore;
    this.myTurn = false;
}


function determineSequenceOrder (){
    //determine order for active entities (player/enemies)
}

function drawInitiativeOrder (){
    colorText("INITIATIVE", canvas.width - 100, 30, "green");
    let yPos = 20;
    for(var i = 0; i < turnOrderList.length; i++){
        if(i == turnNumber){
            colorText(turnOrderList[i].name, canvas.width - 100, yPos * i + 50, "green");
        } else {
            colorText(turnOrderList[i].name, canvas.width - 100, yPos * i + 50, "red");
        }
    }
}

function checkMousePositionInBox(posX, posY, height, width){
    let boxX = posX;
    let boxY = posY;
    let boxHeight = height + boxY;
    let boxWidth = width + boxX;
    if( MousePosX > boxX && MousePosX < boxWidth &&  
        MousePosY > boxY && MousePosY < boxHeight){
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



function checkPlayerOptionBoxes(){
    for(var i = 0; i < turnOrderList.length; i++){
        if(turnOrderList[i].name == "Wizard"){
            moveBoxHovering = checkMousePositionInBox(moveOptionX, moveOptionY, 50, 50);
            spellBoxHovering = checkMousePositionInBox(spellBoxOptionX, spellBoxOptionY, 50, 50);
            endTurnBoxHovering = checkMousePositionInBox(endTurnBoxOptionX, endTurnBoxOptionY, 50, 50);
        }
    }
}

function drawPlayerOptions () {
    colorText("Turn Options", canvas.width-200, canvas.height-90, "red", "14px Arial Black" );
    canvasContext.drawImage(useItemPic, useItemX, useItemY);
    if(useItemBoxHovering){
        colorText("Items", useItemX+5, useItemY+65, "green", "14px Arial Black" );    
    } else {
        colorText("Items", useItemX+5, useItemY+65, "red", "14px Arial Black" );
    }
    canvasContext.drawImage(wizardMovementPic, moveOptionX, moveOptionY);
    if(moveBoxHovering){
        colorText("Move", moveOptionX+5, moveOptionY+65, "green", "14px Arial Black" );    
    } else {
        colorText("Move", moveOptionX+5, moveOptionY+65, "red", "14px Arial Black" );
    }
    canvasContext.drawImage(wizardSpellPic, spellBoxOptionX, spellBoxOptionY);
    if(spellBoxHovering){
        colorText("Spell", spellBoxOptionX+5, spellBoxOptionY+65, "green", "14px Arial Black" );
    } else {
        colorText("Spell", spellBoxOptionX+5, spellBoxOptionY+65, "red", "14px Arial Black" );
    }
    canvasContext.drawImage(endTurnPic, endTurnBoxOptionX, endTurnBoxOptionY);
   if(endTurnBoxHovering){
        colorText("End Turn", endTurnBoxOptionX-10, endTurnBoxOptionY+65, "green", "14px Arial Black" );
   } else {
        colorText("End Turn", endTurnBoxOptionX-10, endTurnBoxOptionY+65, "red", "14px Arial Black" );
   }
}
