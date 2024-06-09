let mainOptionsMenu;
let spellOptionsMenu;
let potionOptionsMenu;

function setupMenus() {
  mainOptionsMenu = new MainOptionsMenu(10, 10, 275, 125);
  mainOptionsMenu.backgroundColor = "purple";
  addView(mainOptionsMenu);

  spellOptionsMenu = new SpellOptionsMenu(10, 10, 275, 125);
  spellOptionsMenu.hidden = true;
  addView(spellOptionsMenu);

  potionOptionsMenu = new PotionOptionsMenu(10, 10, 275, 125);
  potionOptionsMenu.hidden = true;
  addView(potionOptionsMenu);

  // Render test of inventory menu
  //   inventoryMenu = new InventoryMenu(200, 125, 3, 3, [
  //     { image: useItemPic, title: "Test Item 1" },
  //     { image: useItemPic, title: "Test Item 2" },
  //     { image: useItemPic, title: "Test Item 3" },
  //     { image: useItemPic, title: "Test Item 4" },
  //     { image: useItemPic, title: "Test Item 5" },
  //   ]);
  //   inventoryMenu.hidden = false;
  //   inventoryMenu.backgroundColor = "purple";
  //   addView(inventoryMenu);
}
