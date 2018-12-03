import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {
  private cx: CanvasRenderingContext2D;  
  @ViewChild('canvas') public canvas: ElementRef;

  grid = [];
  gridNext = [];
   gridWidth = 140;
 gridHeight = 70;
 gridSquareWidth = 10;
 lastTime;
 count = 0;
 canvasEl:HTMLCanvasElement;
 ctx:any;

  constructor() { }

  ngOnInit() {

      // setup canvas
   this.canvasEl = this.canvas.nativeElement;
   this.ctx = this.canvasEl.getContext('2d');

// canvas and grid size defaults


this.canvasEl.width = this.gridWidth * this.gridSquareWidth;
this.canvasEl.height = this.gridHeight * this.gridSquareWidth;
// this['canvasEl']['style']['width'] = this.canvasEl.width;
// this.canvasEl.style.height = this.canvasEl.height;
// create default grid array
// sudo random noise
for (let x = 0; x < this.gridWidth; x++) {
	this.grid[x] = []
	this.gridNext[x] = []
	for (var y = 0; y < this.gridHeight; y++) {
		this.grid[x][y] = [];
		this.gridNext[x][y] = []

		var rand = Math.random()*100;

		if (rand > 44) {
			this.grid[x][y] = 1;
		}
	}
}

this.gameLoop();

  }





// life init grid
 life(){
	// touch each grid coord
	for (var x = 0; x < this.gridWidth; x++) {
		for (var y = 0; y < this.gridHeight; y++) {

			// counts alive or dead for neighbours
			var count = this.countNearby(x,y);

			if(this.grid[x][y] == 0){
				if(count == 3){
					// life is born
					this.gridNext[x][y] = 1;
				}
			}else{
				if(count < 2 || count > 3){
					// underpopulation & overpopulation
					this.gridNext[x][y] = 0;
				}else{
					this.gridNext[x][y] = 1;
				}
			}
		}
	}
	// replace old grid with new population grid
	this.grid = this.gridNext;
}

// count grid neighbours
 countNearby(x,y){
	

  // count all nearby sqaures
  this.count = 0;
	this.counter(x-1,y-1);
	this.counter(x-1,y);
	this.counter(x-1,y+1);
	this.counter(x,y-1);
	this.counter(x,y+1);
	this.counter(x+1,y-1);
	this.counter(x+1,y);
	this.counter(x+1,y+1);

	 

	// return count value
	return this.count;
}

counter(x,y){
  // if x and y on the grid
  
  if(x > 0 && x < this.gridWidth && y > 0 && y < this.gridHeight){
    if (this.grid[x][y] == 1) 
    this.count++;
  }
}



 draw() {
// clear canvas
console.log('draw')
	this.ctx.fillStyle = '#fee';
	this.ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);

	for (var x = 0; x < this.gridWidth; x++) {
		for (var y = 0; y < this.gridHeight; y++) {

			if (this.grid[x][y] == 1) {
				this.ctx.fillStyle = "#982515";
				this.ctx.fillRect(x * this.gridSquareWidth, y * this.gridSquareWidth, this.gridSquareWidth, this.gridSquareWidth);
			}
		}
	}
}


// The main game loop
 gameLoop() {
    var now = Date.now();
    var dt = (now - this.lastTime) / 1000.0;

    this.update(dt);

    this.lastTime = now;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.gameLoop();
 }, 50);
	//(this.gameLoop, 50);
}

// game update
 update(dt) {
	// iterate simulation rules
	this.life();

	// draw result
	this.draw();
}

// start game


}
