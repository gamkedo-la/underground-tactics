let mainOptionsMenu;
let spellOptionsMenu;
let potionOptionsMenu;

function setupMenus() {
	mainOptionsMenu = new MainOptionsMenu(10, 10, 275, 125);
	mainOptionsMenu.backgroundColor = 'purple';
	addView(mainOptionsMenu);

	spellOptionsMenu = new SpellOptionsMenu(10, 10, 275, 125);
	spellOptionsMenu.hidden = true;
	addView(spellOptionsMenu);

	potionOptionsMenu = new PotionOptionsMenu(10, 10, 275, 125);
	potionOptionsMenu.hidden = true;
	addView(potionOptionsMenu);
}
