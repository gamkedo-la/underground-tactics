function InventoryMenu(x, y, width, height, rows, columns, items = []) {
  const gridStartX = 10;
  const gridStartY = 40;
  const itemWidth = 150;
  const itemHeight = 75;
  const itemPadding = 4;

  UIView.call(this, x, y, itemWidth * columns, itemHeight * rows);

  //   Label
  const label = new UIView(10, 10, 150, 150);
  label.drawCustomContent = function () {
    colorText("Inventory", 0, 20, "white", "14px Arial Black");
  };
  this.addSubView(label);

  // Items grid
  let renderedColumns = 0;
  let renderedRows = 0;
  items?.forEach((item) => {
    // render item buttons in a row/column format
    const useItemButton = new UIComboButton(
      gridStartX + (itemWidth + itemPadding) * renderedColumns,
      gridStartY + (itemHeight + itemPadding) * renderedRows,
      itemWidth,
      itemHeight
    );
    useItemButton.image = item.image;
    useItemButton.title = item.title;
    useItemButton.onPress = () => {
      console.log('"Items" button pressed');
    };
    this.addSubView(useItemButton);

    // increment column count, reset to zero when we hit a new row
    renderedColumns++;
    if (renderedColumns >= columns) {
      renderedColumns = 0;
      renderedRows++;
    }
  });
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
inventoryMenu.prototype = Object.create(UIView.prototype, {
  constructor: {
    value: InventoryMenu,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
