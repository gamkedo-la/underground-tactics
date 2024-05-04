function UIComboButton(x, y, width, height) {
	UIView.call(this, x, y, width, height);
	this.image = null;
	this.title = null;

	this.textOffsetX = 5;

	this.drawCustomContent = function() {
		if (this.image) {
			canvasContext.drawImage(this.image, 0, 0);
		}
		
		if (this.title) {
			const textColor = this.isHighlighted ? 'lime' : 'red';
			colorText(this.title, this.textOffsetX, 65, textColor, "14px Arial Black");
		}
	}
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
UIComboButton.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: UIComboButton,
    enumerable: false,
    writable: true,
    configurable: true,
  }
});
