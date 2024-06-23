let textBoxUI;

function testUISetup() {
  textBoxUI = new UITextBox(10, 440, 400, 150);
  textBoxUI.text = "Welcome to UNDERGROUND TACTICS.\n\nClick an action (such as Move), then use\nthe arrow keys and spacebar to select\na target. Click End Turn to advance.\n\nNow go explore the underground!";
  textBoxUI.image = null;
  textBoxUI.backgroundImage = messagelogBackgroundPic;
  addView(textBoxUI);
}
