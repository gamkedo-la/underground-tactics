const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 58;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 20;
const ROOM_ROWS = 20;
const WORLD_ROOM_COLS = 3;
const WORLD_ROOM_ROWS = 3;


// the tile cursor sprites are larger than a tile (60px vs 50px) for glow overlap
const CURSOROFFSETX = -5;
const CURSOROFFSETY = 0;

// ensure that gameCoordToIsoCoord() function 
// always returns isoDrawX and isoDrawY as integers
// this stops graphics from looking blurry
const SNAP_ISODRAWXY_TO_INTEGER_VALUES = true;
var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var levelNow = 0;
var levelRoomC = 0;
var levelRoomR = 0;
var levelLoadingSkipOperations = false;
var roomGrid = [];


var levelOne = [						
					 51, 52, 51, 53, 52, 52, 54, 50, 52, 52, 50, 52, 52, 53, 52, 52, 54, 50, 52, 52,
					 52,110,  1, 10, 10, 10, 13, 10, 16,  1,  1, 19,  1,  1, 57, 17, 13, 10, 10, 10,
					 51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 53,  1,  1,  2,  2,  1,111,  1,  1,  1,  1, 19,  1,153, 57,  1,  1,  1,  1,  1,
					 51,  1,  1,  1,  1,  1,  2,  1,  4,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 54, 14,  3,  3,  2,  1,112,  3,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 50, 12,  1,  4,  2,  1,  2,  1,  1,  1,154, 19,  1,152, 57,  1,  1,  1,  1,  1,
					 50, 12,  1,  3,  1,  1,  2,  1,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 51, 15,  1,  1,  1, 1,   1,  1,  3,  2,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 52,  1,  1,  1,  1,  1,150,  1,  1,  1,  1, 19,  1,  1, 57,  4,  1,  1,  1,  1,
					 50,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 53,  1,  1,  1,  1,  1, 55,  1,  1,  3,  1, 19,  1,  3, 58, 56, 56, 56, 56, 56,
					 60,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1, 19,  3,  1,  3,  1,  1,  1,  1,  1,
					 52, 18, 69, 56, 56, 56, 56, 68,  1,  1,  1, 29,  4,  1,  1,  1,  1,  1,  1,  1,
					 54, 14, 57,  1,  1,  1,155, 57,  3,  1,  1, 19,  1,  1,  1,  1,  4,  1,  1,  1,
					 52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19, 19, 19, 19, 19, 19, 19, 19, 19,
					 52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,
					 52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1, 69, 56, 56, 56, 56,
					 52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1, 57,  1,  1,  1,  1,
					 52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1, 57,  1,  1,  1,  1,
				];
					

				var levelTwo = [						
					51, 52, 51, 53, 52, 52, 54, 50, 50, 51, 51, 52, 52, 53, 52, 52, 54, 50, 52, 52,
					52,110,  1, 10, 10, 10, 13, 10, 16,  1,  1, 19,  1,  1, 57, 17, 13, 10, 10, 10,
					51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					53,  1,  1,  2,  2,  1,111,  1,  1,  1,  1, 19,  1,153, 57,  1,  1,  1,  1,  1,
					51,  1,  1,  1,  1,  1,  2,  1,  4,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					54, 14,  3,  3,  2,  1,112,  3,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 1, 12,  1,  4,  2,  1,  2,  1,  1,  1,154, 19,  1,152, 57,  1,  1,  1,  1,  1,
					 1, 12,  1,  3,  1,  1,  2,  1,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 1, 15,  1,  1,  1, 1,   1,  1,  3,  2,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					 1,  1,  1,  1,  1,  1,150,  1,  1,  1,  1, 19,  1,  1, 57,  4,  1,  1,  1,  1,
					 1,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1, 19,  1,  1, 57,  1,  1,  1,  1,  1,
					53,  1,  1,  1,  1,  1, 55,  1,  1,  3,  1, 19,  1,  3, 58, 56, 56, 56, 56, 56,
					60,  1,  1,  1,  1,  1,  1,  3,  1,  1,  1, 19,  3,  1,  3,  1,  1,  1,  1,  1,
					52, 18, 69, 56, 56, 56, 56, 68,  1,  1,  1, 29,  4,  1,  1,  1,  1,  1,  1,  1,
					54, 14, 57,  1,  1,  1,155, 57,  3,  1,  1, 19,  1,  1,  1,  1,  4,  1,  1,  1,
					52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19, 19, 19, 19, 19, 19, 19, 19, 19,
					52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,
					52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1, 69, 56, 56, 56, 56,
					52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1, 57,  1,  1,  1,  1,
					52, 12, 57,  1,  1,  1,  1, 57,  1,  1,  1, 19,  1,  1,  1, 57,  1,  1,  1,  1,
			   ];
			   
			   var sewerEntrance = [						
				52, 52, 52, 52, 52, 51, 50, 52, 50, 53, 50, 51, 52, 54, 52, 52, 52, 52, 52, 53,
				52, 64, 65,  1,  1,  1,  1,  1,  1,  1,  1,  1, 17, 13, 10, 16,  1,  1,  1, 52,
				52,  1, 66,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
			    52,  1,  1,100,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  2,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  3,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 18,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,111,  4,  1,  1,  1, 52,
				54, 14,  1,  1,  1,  2,102,  1,  2,  4,  1,  1,  1,  1,  3,  4,  1,  1,  1, 52,
				52, 12,  1,  1,  1,  1,  1,  1,  2,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 12,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 12,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				52, 12,  1,  4,  1,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  1,  1,  1,
				52, 12,  1,  3,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  2,  2,  1,  1, 52,
				52, 12,  1,  1,  3,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 12,  1,  1,  1,  1,  2,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 15,  1,  1,  1,111,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  3,  4,  1, 52,
				52,  1,  1,  1,  1,  3,  2,  1, 57,  1,  1,  1,  1,  1,  1,  1,  4,  3,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  2,  2,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 52
		   		];
			   var bossRoom =  [						
				52, 52, 52, 52, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 52, 52, 52, 53,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
			    52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 51,
				 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,150,  1,  1,  1,  1,  1,  1,  1,  1, 51,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 52
		   ];
		   var sewerRoom1 =  [						
			52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 53,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,101,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19, 56, 56, 56, 56, 56, 56, 56, 52,
			51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,
			51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 29,  1,  1,  1,  1,  1,  1,  1,  1,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1, 52,
			52, 52, 52, 52, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 52, 52, 52, 52
	   ];
			   var sewerRoom2 =  [						
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 53,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
			    52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,150,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 56, 56,  1,  1, 56, 56, 56, 59,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 52
		   ];
			   var sewerRoom3 =  [						
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 53,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
			    52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 51,
				 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 51,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 57,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 52
		   ];
			   var sewerRoom4 =  [						
				52, 52, 52, 52, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 52, 52, 52, 53,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
			    52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				51,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 52, 52, 52, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 52, 52, 52, 52
		   ];
			   var sewerRoom5 =  [						
				52, 52, 52, 52, 52, 52, 52, 52, 52,  1,  1, 52, 52, 52, 52, 52, 52, 52, 52, 53,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
			    52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				 1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				 1,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52,  1,  1,  1,  1,  1,  1,  1, 19,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 52,
				52, 52, 52, 52, 52, 52, 52, 52, 52, 51, 51, 52, 52, 52, 52, 52, 52, 52, 52, 52
		   ];

			   var levelList = 	[sewerEntrance, levelTwo, bossRoom,
								sewerRoom1, sewerRoom2, sewerRoom3,
								sewerRoom4, sewerRoom5, levelOne];

var levelText = 	["words when we enter room A",
						"words when we enter room B",
							"words when we enter room C",
				"words when we enter room D",
						"words when we enter room E",
							"words when we enter room F",
				"words when we enter room G",
						"words when we enter room H",
							"words when we enter room I"];


        //World tiles in the spritesheet are 0-indexed, and each tile are 50x75.
	//Floor tiles 0 through 49
	const TILE_FLOOR_STONE_1 = 1;
	const TILE_FLOOR_STONE_2 = 2;
	const TILE_FLOOR_STONE_3 = 3;
	const TILE_FLOOR_STONE_4 = 4;
	const TILE_FLOOR_SEWER_1 = 10;
	const TILE_FLOOR_SEWER_2 = 11;
	const TILE_FLOOR_SEWER_3 = 12;
	const TILE_FLOOR_SEWER_4 = 13;
	const TILE_FLOOR_SEWER_5 = 14;
	const TILE_FLOOR_SEWER_6 = 15;
	const TILE_FLOOR_SEWER_7 = 16;
	const TILE_FLOOR_SEWER_8 = 17;
	const TILE_FLOOR_SEWER_9 = 18;
	const TILE_WATER = 19;
	const TILE_BRIDGE_1 = 29;
	//Wall Tiles 50 through 99
	const TILE_WALL_STONE_1 = 50;
	const TILE_WALL_STONE_2 = 51;
	const TILE_WALL_STONE_3 = 52;
	const TILE_WALL_STONE_4 = 53;
	const TILE_WALL_STONE_5 = 54;
	const TILE_COLUMN_STONE_1 = 55;
	const TILE_WALL_STONE_6 = 56;
	const TILE_WALL_STONE_7 = 57;
	const TILE_WALL_STONE_8 = 58;
	const TILE_WALL_STONE_9 = 59;
	const TILE_WOODEN_DOOR_1 = 60;
	const TILE_STAIRWAY_1 = 64;
	const TILE_STAIRWAY_2 = 65;
	const TILE_STAIRWAY_3 = 66;
	const TILE_WALL_STONE_10 = 67;
	const TILE_WALL_STONE_11 = 68;
	const TILE_WALL_STONE_12 = 69;
	//Player and Enemies 100 through 149
	const TILE_WIZARD = 100;
	const TILE_WARRIOR = 101;
	const TILE_ARCHER = 102;
	const TILE_KOBALD = 110;
	const TILE_KOBALD_ARCHER = 111;
	const TILE_KOA_TOA = 112;
	//Pick up items 150 through 199
	const TILE_POTION_MANA = 150;
	const TILE_POTION_HEALTH = 151;
	const TILE_POTION_STAMINA = 152;
	const TILE_POTION_LEVITATION = 153;
	const TILE_SPELL_BOOK = 154;
	const TILE_SPELL_BOOK_2 = 155;

    const NAVMODE_IMPASSIBLE = 0;
	const NAVMODE_WALKABLE = 1;
	const NAVMODE_FLYABLE = 2;
	const NAVMODE_LOCKED = 3;
	const NAVMODE_HARMFUL = 4;
	const NAVMODE_PICKUP = 5;

	var tileNavData = [
		{navMode: NAVMODE_IMPASSIBLE, tileTypes: [TILE_WALL_STONE_1, TILE_WALL_STONE_2, TILE_WALL_STONE_3, TILE_WALL_STONE_4, TILE_WALL_STONE_5, TILE_COLUMN_STONE_1, TILE_WALL_STONE_6, TILE_WALL_STONE_7, TILE_WALL_STONE_8]},
		{navMode: NAVMODE_WALKABLE, tileTypes: [TILE_FLOOR_SEWER_1, TILE_FLOOR_SEWER_2, TILE_FLOOR_SEWER_3, TILE_FLOOR_SEWER_4, TILE_FLOOR_SEWER_5, TILE_FLOOR_SEWER_6, TILE_FLOOR_SEWER_7, TILE_FLOOR_SEWER_8, TILE_FLOOR_SEWER_9, TILE_FLOOR_STONE_1, TILE_FLOOR_STONE_2, TILE_FLOOR_STONE_3, TILE_FLOOR_STONE_4, TILE_BRIDGE_1]},
		{navMode: NAVMODE_FLYABLE, tileTypes: [TILE_WATER]},
		{navMode: NAVMODE_LOCKED, tileTypes: [TILE_WOODEN_DOOR_1]},
	];

	function tileTypeNavMode(tiletype){
		for (var i = 0; i<tileNavData.length; i++){
			for (var ii = 0; ii<tileNavData[i].tileTypes.length; ii++){
				if(tiletype == tileNavData[i].tileTypes[ii]){
					return tileNavData[i].navMode;
				}
			}
		}
		return NAVMODE_IMPASSIBLE;
	}

	
function gameCoordToIsoCoord (pixelX, pixelY){
	
	var camPanX = -350;
	var camPanY = 0;
	var tileCFraction = pixelX / ROOM_W;
	var tileRFraction = pixelY / ROOM_H;
	
	isoDrawX = -camPanX + tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = -camPanY + tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);

	if (SNAP_ISODRAWXY_TO_INTEGER_VALUES) {
		isoDrawX = Math.round(isoDrawX);
		isoDrawY = Math.round(isoDrawY);
	}

}	

function tileCoordToIsoCoord(tileC, tileR ){
	gameCoordToIsoCoord(tileC * ROOM_W, tileR * ROOM_H);
}

var drawTileIndicators = true
var showTileNumber = true;

function drawTrackTile(worldTilesSpriteSheetIndex, dx, dy){
	// Counting from 0
	const row = Math.floor(worldTilesSpriteSheetIndex / 10);
	const col = worldTilesSpriteSheetIndex % 10;

	const sWidth = 50;
	const sHeight = 75;
	const sx = col * sWidth;
	const sy = row * sHeight;

	canvasContext.drawImage(worldTilesPic, sx, sy, sWidth, sHeight, dx, dy, sWidth, sHeight);
}
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 700
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeY = 0;
	var miniMapX = 750;
	var miniMapY = 2;
	sharedAnimCycle++;

	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 7;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			tileCoordToIsoCoord(eachCol, eachRow);		
			drawTrackTile(trackTypeHere,
				      isoDrawX - ISO_GRID_W/2,
				      isoDrawY - ISO_TILE_GROUND_Y);
			var textColor;
			if(drawTileIndicators){
				if(	trackTypeHere == TILE_FLOOR_STONE_1 ||
					trackTypeHere == TILE_FLOOR_STONE_2 ||
					trackTypeHere == TILE_FLOOR_STONE_3 ||
					trackTypeHere == TILE_FLOOR_STONE_4 ||
					trackTypeHere == TILE_FLOOR_SEWER_1 ||
					trackTypeHere == TILE_FLOOR_SEWER_2 ||
					trackTypeHere == TILE_FLOOR_SEWER_3 ||
					trackTypeHere == TILE_FLOOR_SEWER_4 ||
					trackTypeHere == TILE_FLOOR_SEWER_5 ||
					trackTypeHere == TILE_FLOOR_SEWER_6 ||
					trackTypeHere == TILE_FLOOR_SEWER_7){
						canvasContext.drawImage(tileIndicatorPic, isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
						textColor = "rgba(128,128,128,1)" //"black"
				}

				// draw the path the player is creating for the next move
				// with a highlight at the cursor position
				if(	charList[turnNumber].movementArray[0]==tileIndex ||
					charList[turnNumber].movementArray[0]==tileIndex){
						// the main "TARGET CURSOR" for movement - fixme: don't do for enemies?
						textColor = "rgba(255,255,255,1)" //"white";
						canvasContext.globalAlpha = Math.sin(performance.now()/100)*0.5+0.5; // 0..1
						canvasContext.drawImage(tileIndicatorWhitePic, isoDrawX - ISO_GRID_W/2 + CURSOROFFSETX, isoDrawY - ISO_TILE_GROUND_Y + CURSOROFFSETY);
						canvasContext.globalAlpha = 1;
				} else if(charList[turnNumber].movementArray.includes(tileIndex) ||
						charList[turnNumber].movementArray.includes(tileIndex)){
							textColor = "rgba(0,64,255,1)" //"cyan";
							canvasContext.drawImage(tileIndicatorCyanPic, isoDrawX - ISO_GRID_W/2 + CURSOROFFSETX, isoDrawY - ISO_TILE_GROUND_Y + CURSOROFFSETY);
				} else {
						
				}
			//	colorText(tileIndex, isoDrawX-10+1, isoDrawY+1, "black", "10px Arial Black" ); // drop shadow
			//	colorText(tileIndex, isoDrawX-10, isoDrawY, textColor, "10px Arial Black" );
			}	 
			tileIndex++;
		} // end of each col
		tileTopEdgeY += ROOM_H;
	} // end of each row
}

function tileTypeHasRoadTransparency(checkTileType) {
/*	return (checkTileType == TILE_BOOKSHELF ||
			checkTileType == TILE_PITTRAP_UNARMED ||
				checkTileType == TILE_SPIKES_UNARMED 
			); */
}

function isWallAtTileCoord(trackTileCol, trackTileRow){
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			
		
function getTileIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / ROOM_W;		
	var tileRow = pixelY / ROOM_H;
					
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow); 
	//console.log("X: "+pixelX+ " Y: "+pixelY+ " col: " + tileCol + " row: " + tileRow);
				
	if(tileCol < 0 || tileCol >= ROOM_COLS || 
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		
			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}

function indexN (fromIndex){
	return fromIndex - ROOM_COLS;
}

function indexS (fromIndex){
	return fromIndex + ROOM_COLS;
}

function indexW(fromIndex){
	return fromIndex - 1;
}

function indexE(fromIndex){
	return fromIndex + 1;
}

function whichCol(index){
	var col =  index% ROOM_COLS;
	return col;
}

function whichRow(index){
	var row = Math.floor(index / ROOM_COLS);
	return row;
}

