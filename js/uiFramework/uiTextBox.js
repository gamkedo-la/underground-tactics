function UITextBox(x, y, width, height) {
  UIView.call(this, x, y, width, height);
  this.text = null;
  this.textOffsetX = 5;
  this.textOffsetY = 25;
  this.imageOffsetX = 15;
  this.imageOffsetY = 15;
  this.backgroundColor = "white";

  this.drawCustomContent = function () {

    if (this.backgroundImage) {
	  canvasContext.drawImage(this.backgroundImage, 0, 0);
	}
	
	// we can use this image for things like character portraits or icons, depdending on we want to use the textbox
    if (this.image) {
      canvasContext.drawImage(this.image, this.imageOffsetX, this.imageOffsetY);
    }

    if (this.text) {
      const textColor = "black";
	  // multiple lines suported: use the \n character in the string
	  let splitLines = this.text.split("\n");
	  for (let lineNum=0; lineNum<splitLines.length; lineNum++) {
		colorText(
			splitLines[lineNum],
			this.image.width + this.imageOffsetX + this.textOffsetX,
			this.textOffsetY + (lineNum*16),
			textColor,
			"14px Arial Black"
		);
		}
	}
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
UITextBox.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: UITextBox,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
