var canvas;
var canvasContext;
//characters (Player, NPC's, Enemies)

// Options for title screen font (feel free to use in other contexts)
const title = "Underground Tactics";
const fontFile1 = "FantaisieArtistique.ttf";
const fontFile2 = "Rediviva.ttf";
const fontFile3 = "vinque_rg.otf";
const fontFile4 = "wizzta.ttf";
const fontFile5 = "MorrisRoman-Black.ttf";
const titleScreenFont = new FontFace("Title", `url(fonts/${fontFile5})`);
titleScreenFont
  .load()
  .then(function (loadedFont) {
    document.fonts.add(loadedFont);
  })
  .catch(function (error) {
    console.log("Failed to load title screen font: " + error);
  });

function emptyRoomObjects() {
  for (var i = charList.length - 1; i >= 0; i--) {
    if (charList[i].isHuman == false) {
      charList.splice(i, 1);
    }
  }
  potionList = [];
}

var debugSkipTitleScreen = false;

if(debugSkipTitleScreen) {
  console.log("debugSkipTitleScreen is ON, set false before upload");
}

//game states
var liveGame = (debugSkipTitleScreen);

var pauseScreen = false;
var inventoryScreen = false;
var mainMenu = (debugSkipTitleScreen==false);

window.onload = function () {
  // this causes an error in browsers due to autoplay being forbidden
  // see handleMouseClick() function where we play on 1st click
  // however, on itch.io this is not a problem because we've already clicked
  // the window and are allowed to play sound immediately right here:
  // caveAmbienceSound.play();

  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  loadImages();

  initInput();

  canvas.addEventListener("mousemove", function (evt) {
    var mousePos = calculateMousePos(evt);

    MousePosX = mousePos.x;
    MousePosY = mousePos.y;
  });

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  setupMenus(true);
  testUISetup(); // Just a function for testing out various UI elements. Comment it out as you please.
  mainOptions = true;
  mainOptionsMenu.hidden = false;
};

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(),
    root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}

function imageLoadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval(function () {
    resetViewStates();
    handleMousePosition();
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
  loadLevel(levelList[0]);
}

function roomChange(roomChangeC, roomChangeR) {
  levelRoomC += roomChangeC;
  levelRoomR += roomChangeR;
  if (levelRoomC < 0) {
    levelRoomC = 0;
  }
  if (levelRoomR < 0) {
    levelRoomR = 0;
  }
  if (levelRoomC >= WORLD_ROOM_COLS) {
    levelRoomC = WORLD_ROOM_COLS - 1;
  }
  if (levelRoomR >= WORLD_ROOM_ROWS) {
    levelRoomR = WORLD_ROOM_ROWS - 1;
  }
  levelNow = levelRoomC + levelRoomR * WORLD_ROOM_COLS;
  console.log("Loading: ", levelRoomC, levelRoomR, levelNow);
  loadLevel(levelList[levelNow]);
  textBoxUI.text = levelText[levelNow];
  var doorSpawnC = 1;
  var doorSpawnR = 1;
  var teamShiftC = 0;
  var teamShiftR = 0;
  if (roomChangeC == -1) {
    doorSpawnC = ROOM_COLS - 3;
    doorSpawnR = Math.floor(ROOM_ROWS / 2);
    teamShiftC = -1;
  }
  if (roomChangeR == -1) {
    doorSpawnC = Math.floor(ROOM_COLS / 2);
    doorSpawnR = ROOM_ROWS - 3;
    teamShiftR = -1;
  }
  if (roomChangeC == 1) {
    doorSpawnC = 2;
    doorSpawnR = Math.floor(ROOM_ROWS / 2);
    teamShiftC = 1;
  }
  if (roomChangeR == 1) {
    doorSpawnC = Math.floor(ROOM_COLS / 2);
    doorSpawnR = 2;
    teamShiftR = 1;
  }
  for (var i = 0; i < charList.length; i++) {
    if (charList[i].isHuman) {
      var targetIndex;
      var didSpawn = false;
      var safetyBreak = 50;
      while (didSpawn == false && safetyBreak-- > 0) {
        targetIndex = roomTileToIndex(doorSpawnC, doorSpawnR);
        console.log("Spawning At: ", targetIndex, doorSpawnC, doorSpawnR);
        if (tileTypeNavMode(roomGrid[targetIndex]) == NAVMODE_WALKABLE) {
          charList[i].movementArray = [targetIndex];
          charList[i].x = ROOM_W * doorSpawnC;
          charList[i].y = ROOM_H * doorSpawnR;
          charList[i].popToGrid();
          didSpawn = true;
        }
        doorSpawnC += teamShiftC;
        doorSpawnR += teamShiftR;
      }
    }
  }
}

function loadLevel(whichLevel) {
  var alreadyLoadedPlayers = false; //need to change variable to allow when players are found
  for (var i = 0; i < charList.length; i++) {
    if (charList[i].isHuman && charList[i].tiedUp) {
      alreadyLoadedPlayers = true;
      break;
    }
  }
  emptyRoomObjects();
  roomGrid = whichLevel.slice();
  for (var i = 0; i < roomGrid.length; i++) {
    if (
      roomGrid[i] == TILE_POTION_MANA ||
      roomGrid[i] == TILE_POTION_HEALTH ||
      roomGrid[i] == TILE_POTION_LEVITATION ||
      roomGrid[i] == TILE_POTION_STAMINA ||
      roomGrid[i] == TILE_SPELL_BOOK ||
      roomGrid[i] == TILE_SPELL_BOOK_2 ||
      roomGrid[i] == TILE_KEY
    ) {
      let whichPotion = roomGrid[i];
      if (roomGrid[i] == TILE_POTION_MANA) {
        whichPotion = "Mana Potion";
      } else if (roomGrid[i] == TILE_POTION_HEALTH) {
        whichPotion = "Health Potion";
      } else if (roomGrid[i] == TILE_POTION_STAMINA) {
        whichPotion = "Stamina Potion";
      } else if (roomGrid[i] == TILE_POTION_LEVITATION) {
        whichPotion = "Levitation Potion";
      } else if (roomGrid[i] == TILE_SPELL_BOOK) {
        whichPotion = "Spell Book";
      } else if (roomGrid[i] == TILE_SPELL_BOOK_2) {
        whichPotion = "Spell Book 2";
      } else if (roomGrid[i] == TILE_KEY) {
        whichPotion = "Key";
      } else {
        whichPotion = "Not listed";
      }
      addPotion(whichPotion, "Kobald");
    }
    if (
      roomGrid[i] == TILE_KOBALD ||
      roomGrid[i] == TILE_KOBALD_ARCHER ||
      roomGrid[i] == TILE_KOA_TOA
    ) {
      addEnemy(roomGrid[i]);
    }
    if (
      roomGrid[i] == TILE_WARRIOR ||
      roomGrid[i] == TILE_ARCHER ||
      roomGrid[i] == TILE_WIZARD
    ) {
      console.log("Wizard/Warrior/Archer", alreadyLoadedPlayers);
      if (alreadyLoadedPlayers == false) {
        addPlayer(roomGrid[i]);
      } else {
        roomGrid[i] = TILE_FLOOR_STONE_1;
      }
    }
  }

  for (var i = 0; i < potionList.length; i++) {
    if (potionList[i].myName == "Mana Potion") {
      potionList[i].init(potionManaPic, 75, "Mana Potion", TILE_POTION_MANA);
    } else if (potionList[i].myName == "Health Potion") {
      potionList[i].init(
        potionHealthPic,
        225,
        "Health Potion",
        TILE_POTION_HEALTH
      );
    } else if (potionList[i].myName == "Levitation Potion") {
      potionList[i].init(
        potionLevitationPic,
        0,
        "Stamina Potion",
        TILE_POTION_LEVITATION
      );
    } else if (potionList[i].myName == "Stamina Potion") {
      potionList[i].init(
        potionStaminaPic,
        150,
        "Stamina Potion",
        TILE_POTION_STAMINA
      );
    } else if (potionList[i].myName == "Spell Book") {
      potionList[i].init(spellBookPic, 300, "Spell Book", TILE_SPELL_BOOK);
    } else if (potionList[i].myName == "Spell Book 2") {
      potionList[i].init(spellBookPic, 375, "Spell Book 2", TILE_SPELL_BOOK_2);
    } else if (potionList[i].myName == "Key") {
      potionList[i].init(keyTilesPic, 450, "Key", TILE_KEY);
    }
  }
  turnNumber = 0;
  turnOrderList = [];
  charList.sort(() => 0.5 - Math.random());
  for (var i = 0; i < charList.length; i++) {
    charList[i].reset();
    addCreatureTurn(
      (charList[i].isHuman ? "Player " : "Enemy ") + (i + 1),
      charList[i].isHuman, (i + 1)
    );
  }
  console.log("Finish Load Level");
}

//All movement occurs here.  This is called every frame.
function moveEverything() {
  if(winScreenMenu.hidden == false){
    //skip game action while on win screen
  } else if (liveGame) {
    checkPlayerOptionBoxes();
    charList[turnNumber].movement();
    for (i = 0; i < smokeList.length; i++) {
      smokeList[i].move();
    }
    for (i = 0; i < arrowList.length; i++) {
      arrowList[i].move();
    }
    removeArrowFromList();
    for (var i = 0; i < turnOrderList.length; i++) {
      if (
        turnOrderList[i].myTurn == true &&
        turnOrderList[i].name == "Enemy 1"
      ) {
      }
    }
    updatedCameraPosition();
    for (i = 0; i < potionList.length; i++) {
      if (
        charList[turnNumber].isHuman &&
        charList[turnNumber].checkCollisionsAgainstItem(potionList[i])
      ) {
        console.log(potionList.length);
        potionList.splice(i, 1);
        console.log(potionList.length);
      }
    }
    for (i = 0; i < charList.length; i++) {
      if (levelLoadingSkipOperations) {
        levelLoadingSkipOperations = false;
        return;
      }
    }
    checkAllPlayerAndEnemyCollisions();
    removeSmokeFromList();
    removeCharacterFromList();
  }

  if (pauseScreen) {
    return;
  }
}

//This checks player and enemy collisions.  This is called every frame.
//This requires refactoring.  Too many individual lines checking monsters to players
function checkAllPlayerAndEnemyCollisions() {}

//All movement occurs here.  This is called every frame.
var titleScreenWizardX = -100;
var titleScreenWizardY = 0;
var titleScreenWizardXWaitTime = 0;
var titleScreenWizardXMoveRight = true;
function drawEverything() {
  if (mainMenu) {
    if (titleScreenWizardX < 0 && titleScreenWizardXMoveRight) {
      titleScreenWizardX++;
    } else {
      titleScreenWizardXMoveRight = false;
      titleScreenWizardXWaitTime++;
      if (titleScreenWizardXWaitTime > 100) {
        titleScreenWizardX--;
      }
    }
    canvasContext.drawImage(titleScreenPic, 0, 0);
    if (titleScreenWizardXWaitTime > 20 && titleScreenWizardXWaitTime < 40) {
      canvasContext.drawImage(titleScreenFireBAllPic, 0, 0);
    }
    canvasContext.drawImage(
      titleScreenWizardPic,
      titleScreenWizardX,
      titleScreenWizardY
    );
    if (titleScreenWizardXWaitTime > 50) {
		const titleText = canvasContext.measureText(title);
		const startX = 200;
		const textPadding = 50;
		const rectWidth = titleText.width + textPadding * 2;
		colorRect(200, 300, rectWidth, 100, "#81007f");
		colorText(title, startX + textPadding, 370, "white", "48px Title");
    }
    if (titleScreenWizardXWaitTime > 130) {
      mainMenu = false;
      liveGame = true;
      deathScreenMenu.hidden = true;
    }
  }
  if (liveGame) {
    colorRect(0, 0, canvas.width, canvas.height, "black");
    shiftForCameraPan();
    drawTracks();
    for (i = 0; i < arrowList.length; i++) {
      arrowList[i].draw();
    }
    for (var i = 0; i < potionList.length; i++) {
      potionList[i].draw();
    }
    for (i = 0; i < smokeList.length; i++) {
      smokeList[i].draw();
    }
    drawHealth();
    drawStamina();
    finishedCameraPan();

	canvasContext.drawImage(topBarBackgroundPic,0,0);
    drawInitiativeOrder();
    drawPlayerOptions();
    drawUiElements();
  }
}
