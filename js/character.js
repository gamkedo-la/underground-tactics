function CharacterBase (){
	this.x;
	this.y;

	this.reset = function(tileMatch) {
        this.speed = 0;
        this.keysHeld = 0;

        for (var i = 0; i < roomGrid.length; i++) {
            if (roomGrid[i] == tileMatch) {
                var tileRow = Math.floor(i / ROOM_COLS);
                var tileCol = i % ROOM_COLS;

                this.homeX = tileCol * ROOM_W;
                this.homeY = tileRow * ROOM_H;

                this.movementArray = [i];

                roomGrid[i] = TILE_FLOOR_STONE_1;
                break;
            }
        }

        this.x = this.homeX;
        this.y = this.homeY;

		this.popToGrid();
    }

    this.init = function(whichGraphic, whichName, tileTypeMatch) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset(tileTypeMatch);
    }

	this.popToGrid = function(){
		var currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
		var col = currentIndex%ROOM_COLS;
		var row = Math.floor(currentIndex/ROOM_COLS);
		this.x = col * ROOM_W + ROOM_W * 0.5; 
		this.y = row * ROOM_H + ROOM_H * 0.5;
	}
	 

}