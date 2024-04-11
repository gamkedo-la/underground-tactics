function determineSequenceOrder (){
    //determine order for active entities (player/enemies)
}

function drawInitiativeOrder (){
    colorText("INITIATIVE", canvas.width - 100, 30, "green");
    colorText("Wizard", canvas.width - 100, 50, "red");
    colorText("Enemy 1", canvas.width - 100, 70, "white");
    colorText("Enemy 2", canvas.width - 100, 90, "white");
}

function drawPlayerOptions () {
    colorText("Turn Options", canvas.width-155, canvas.height-90, "red", "14px Arial Black" );
    canvasContext.drawImage(wizardMovementPic, canvas.width-200, canvas.height - 75);
    colorText("Move", canvas.width-195, canvas.height-10, "red", "14px Arial Black" );
    canvasContext.drawImage(wizardSpellPic, canvas.width-135, canvas.height - 75);
    colorText("Spell", canvas.width-130, canvas.height-10, "red", "14px Arial Black" );
    canvasContext.drawImage(endTurnPic, canvas.width-70, canvas.height - 75);
    colorText("End Turn", canvas.width-80, canvas.height-10, "red", "14px Arial Black" );

}
