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
    colorText("Turn Options", canvas.width-155, canvas.height-100, "red", "14px Arial Black" );
    canvasContext.drawImage(wizardMovementPic, canvas.width-200, canvas.height - 75);
    colorText("Move", canvas.width-195, canvas.height-10, "red", "14px Arial Black" );
    canvasContext.drawImage(wizardSpellPic, canvas.width-100, canvas.height - 75);
    colorText("Spell", canvas.width-95, canvas.height-10, "red", "14px Arial Black" );

}
