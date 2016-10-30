var SCREEN_SIZE = 500;
var SIDE_CELLS = 50;
var CELL_SIZE = SCREEN_SIZE / SIDE_CELLS; //セル幅
var FPS = 10;
var canvas;
var context;
var dy = [1, 1, 0, -1, -1, -1, 0, 1];
var dx = [0, 1, 1, 1, 0, -1, -1, -1];

window.onload = function(){
	var field = [];
	var tmpField = [];
	for (var i = 0; i < SIDE_CELLS; i++) {
		field[i] = [];
		tmpField[i] = [];
		for (var j = 0; j < SIDE_CELLS; j++) {
			field[i][j] = Math.floor(Math.random() * 2);//randomに生死を格納
		}
	}
	
	canvas = document.getElementById('world');
	canvas.width = canvas.height = SCREEN_SIZE;//キャンパスのサイズを設定
	context = canvas.getContext('2d');
	context.fillStyle = 'rgb(128, 100, 162)'; // 紫
	update(field, tmpField);//ゲームループ開始
}

function update(field, tmpField) {
	// 世代交代処理とキャンパスの描画処理
	for (var y = 0; y < SIDE_CELLS; y++) {
		for (var x = 0; x < SIDE_CELLS; x++) {
			tmpField[y][x] = field[y][x];
		}
	}

	for (var y = 0; y < SIDE_CELLS; y++) {
		console.log('y' + y);
		for (var x = 0; x < SIDE_CELLS; x++) {
			var cnt = 0;
			console.log('x' + x);
			for (var i = 0; i < 8; i++) {
				var ny = y + dy[i];
				var nx = x + dx[i];
				if(!(0 <= ny && ny < SIDE_CELLS && 0 <= nx && nx < SIDE_CELLS)) continue;
				if(tmpField[ny][nx]) cnt++;
			}
		
			if(tmpField[y][x] && (cnt == 2 || cnt == 3)){//自身が生でカウントが2か3
				field[y][x] = 1;
			}else if(!tmpField[y][x] && cnt == 3){//自身が死でカウント3
				field[y][x] = 1;
			}else{
				field[y][x] = 0;
			}
		}
	}
	draw(field);
	setTimeout(update, 1000/FPS, field, tmpField);//再帰
}

function draw(field){
	//キャンパスの描画処理 updata関数で呼び出される
	context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE); //画面クリア
	for (var y = 0; y < SIDE_CELLS; y++) {
		for (var x = 0; x < SIDE_CELLS; x++) {
			var px = x * CELL_SIZE;
			var py = y * CELL_SIZE;
			if(field[y][x]){
				context.fillRect(px, py, CELL_SIZE, CELL_SIZE);//生を描画
			}
		}
	}
}