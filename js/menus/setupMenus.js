let mainOptionsMenu;
let spellOptionsMenu;
let meleeOptionMenu;
let potionOptionsMenu;
let deathScreenMenu;
let winScreenMenu;

function setupMenus(characterCreated) {
  mainOptionsMenu = new MainOptionsMenu(10, 10, 275, 125, characterCreated);
  addView(mainOptionsMenu);

  spellOptionsMenu = new SpellOptionsMenu(10, 10, 275, 125);
  spellOptionsMenu.hidden = true;
  addView(spellOptionsMenu);

  meleeOptionMenu = new MeleeOptionMenu(10, 10, 275, 125);
  meleeOptionMenu.hidden = true;
  addView(meleeOptionMenu);
  
  potionOptionsMenu = new PotionOptionsMenu(10, 10, 275, 125);
  potionOptionsMenu.hidden = true;
  addView(potionOptionsMenu);

  deathScreenMenu = new DeathScreenMenu(200, 200, 400, 400);
  deathScreenMenu.hidden = true;
  addView(deathScreenMenu);

  winScreenMenu = new WinScreenMenu(200, 200, 400, 400);
  winScreenMenu.hidden = true;
  addView(winScreenMenu);

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
