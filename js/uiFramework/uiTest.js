let textBoxUI;

function testUISetup() {
	textBoxUI = new UITextBox(10, 440, 400, 150);
	textBoxUI.text = "TEST TEXT";
	addView(textBoxUI);
}