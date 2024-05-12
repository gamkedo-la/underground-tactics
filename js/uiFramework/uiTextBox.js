function UITextBox(x, y, width, height) {
  UIView.call(this, x, y, width, height);
  this.text = null;

  this.textOffsetX = 5;
  this.textOffsetY = 20;
  this.backgroundColor = "white";

  this.drawCustomContent = function () {
    if (this.image) {
      canvasContext.drawImage(this.image, 0, 0);
    }

    if (this.text) {
      const textColor = "black";
      colorText(this.text, this.textOffsetX, this.textOffsetY, textColor, "14px Arial Black");
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
