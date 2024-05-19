function UITextBox(x, y, width, height) {
  UIView.call(this, x, y, width, height);
  this.text = null;
  this.textOffsetX = 5;
  this.textOffsetY = 25;
  this.imageOffsetX = 15;
  this.imageOffsetY = 15;
  this.backgroundColor = "white";

  this.drawCustomContent = function () {
    if (this.image) {
      canvasContext.drawImage(this.image, this.imageOffsetX, this.imageOffsetY);
    }

    if (this.text) {
      const textColor = "black";
      colorText(
        this.text,
        this.image.width + this.imageOffsetX + this.textOffsetX,
        this.textOffsetY,
        textColor,
        "14px Arial Black"
      );
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
