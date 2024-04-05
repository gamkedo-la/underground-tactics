var camPanX = 0;
var camPanY = 0;

function updatedCameraPosition(){
	gameCoordToIsoCoord(playerOne.x,playerOne.y);
	camPanX = isoDrawX - canvas.width/2;
	camPanY = isoDrawY - canvas.height/2;
	
	if(camPanX < -400){
		camPanX = -400;
	}
	if(camPanY < -200){
		camPanY = -200;
	}
	
	var rightEdgeX = ROOM_W * ROOM_COLS;
	var bottomEdgeY = ROOM_H * ROOM_ROWS;
	
	if(camPanX >= rightEdgeX - 1 - canvas.width){
		camPanX = rightEdgeX - 1 - canvas.width;
	}
	if(camPanY >= bottomEdgeY - 1 - canvas.height){
		camPanY = bottomEdgeY - 1 - canvas.height;
	}
}

function shiftForCameraPan(){
	canvasContext.save();
	canvasContext.translate(Math.round(-camPanX), Math.round(-camPanY));
}

function finishedCameraPan(){
	canvasContext.restore();
}