// Title of Game
// play
// pause
// clear
// random (seed)
// - slowplay
// - mediumplay
// - fastplay
// grid-size
// downbottom - shows generation

const unitLength  = 20;
const boxColor    = 168;
const strokeColor = 25;
let columns;    /* To be determined by window width */
let rows;       /* To be determined by window height */
let currentBoard;
let nextBoard;
let slider;
const SAM = 3;
const YEE = 2;

let buttonPlay;

function changeBG() {
  console.log('inside changeBG')
  // for(;;){
    noLoop();
  // }
}

function setup(){
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight); 
   console.log(windowWidth)
   console.log(windowHeight)
    frameRate(3);
   
	canvas.parent(document.querySelector('#canvas'));
    
    buttonPlay = createButton('PLAY');
    buttonPlay.position(400,20);
    buttonPlay.mousePressed(changeBG)
    slider = createSlider(0, 100, 30, 10);
    slider.position(200, 30);
    slider.style('heigth', '180px');

	/*Calculate the number of columns and rows */
	columns = floor(width  / unitLength);
	rows    = floor(height / unitLength);

//    console.log(columns)
//    console.log(rows)
    
	/*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
	currentBoard = [];
	nextBoard = [];
	for (let i = 0; i < columns; i++) {
		currentBoard[i] = [];
		nextBoard[i] = []
    }
	// Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBo
}

/**
* Initialize/reset the board state
*/
function  init() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			currentBoard[i][j] = 0;
			nextBoard[i][j] = 0;
        }
	}
}

function RandomSeed(){
    
    for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			currentBoard[i][j] = 0;
			nextBoard[i][j] = 0;
         currentBoard[i][j] = random() > 0.8 ? 1 : 0;
        }
	}

}

function draw(){
    // let val = slider.value();
    // console.log(val);
    // background(val);
    background(255);
    generate();

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1){
                fill('#fae');  
            } else {
                fill(255);
            } 
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
    // const fps = frameRate();
    // console.log("ha ha ha");
    // console.log(fps);
}

function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if( i == 0 && j == 0 ){
	                    // the cell itself is not its own neighbor
	                    continue;
	                }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < YEE) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > SAM) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == SAM) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }
   // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];

}

/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/* When mouse is pressed */
function mousePressed() {
    noLoop();
    mouseDragged();
}

/* When mouse is released */
function mouseReleased() {
    loop();
}

// function mousePressed() {
//     noLoop();
//   }
  
//   function mouseReleased() {
//     loop();
//   }

document.querySelector('#butbut1')
	.addEventListener('click', function() {
		init();
});

document.querySelector('#butbut2')
	.addEventListener('click', function() {
		RandomSeed();
});