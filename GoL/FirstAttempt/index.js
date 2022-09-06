// screen size
// - small, medium & large

const unitLength    = 20;
const boxColor      = 168;
const strokeColor   = 2;
var SAM           = 3;
var YEE           = 2;
var currentSpeed  = 'slow';     /* slow=fr(2); medium=fr(); fast=fr() */ 
var currentSize   = 'large';    /* large; middle; small */
let columns;    /* To be determined by window width */
let rows;       /* To be determined by window height */
let currentBoard;
let nextBoard;
let intermediateBoard;
let time2start; 

function setup(){
    /* Set the canvas to be under the element #canvas*/
//    const canvas = createCanvas(windowWidth-77, windowHeight-129);
    const canvas = createCanvas(windowWidth, windowHeight-129); 
//    console.log(windowWidth)
//    console.log(windowHeight)
    frameRate(1);
   
	canvas.parent(document.querySelector('#canvas'));
      
	/*Calculate the number of columns and rows */
	columns = floor(width  / unitLength);
	rows    = floor(height / unitLength);

//    console.log(columns)
//    console.log(rows)
    
	/*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
	currentBoard = [];
	nextBoard = [];
    intermediateBoard = [];
	for (let i = 0; i < columns; i++) {
		currentBoard[i] = [];
		nextBoard[i] = [];
        intermediateBoard[i] = [];
    }
	// Now both currentBoard and nextBoard are array of array of undefined values.
    initBB();  // Set the initial values of the currentBoard and nextBo
}

/* Initialize/reset the board state */
function  initBB() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			currentBoard[i][j] = 0;
			nextBoard[i][j] = 0;
            intermediateBoard[i][j];
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

/* When mouse is dragged */
function mouseDragged() {
    /* If the mouse coordinate is outside the board */
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

document.querySelector('.btn-outline-play')
	.addEventListener('click', function() {
		mouseReleased();
});

document.querySelector('.btn-outline-pause')
	.addEventListener('click', function() {
		mousePressed();
});

document.querySelector('.btn-outline-clear')
	.addEventListener('click', function() {
		initBB();
});

document.querySelector('.btn-outline-seed')
	.addEventListener('click', function() {
		RandomSeed();
});

document.querySelector('.DLspeed')
	.addEventListener('click', function() {
        var inputSpeed = document.querySelector('.DLspeed').value;
        console.log(inputSpeed);
        UpdateSpeed(inputSpeed);
});

function UpdateSpeed(str) {
    var input = str;
    if (input === currentSpeed){
        /* do nothing */    ;
    } else {
        currentSpeed = input;
        if(currentSpeed === 'slow'){
            frameRate(1);
        } else if (currentSpeed === 'medium'){
            frameRate(8);
        } else if (currentSpeed === 'fast'){
            frameRate (30);
        } 
    } 
}

document.querySelector('.DLsize')
	.addEventListener('click', function() {
		console.log(document.querySelector('.DLsize').value);
});

// Add event listener on keydown, no keypress as it will not be able to give out arrow or space bar
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    console.log(event);
    // console.log(name);
    // console.log(code);    // only code can see 'Space'

    // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);

    // alert (`Cursor will start in the middle of the screen, pls use Arrow keys to go your desire grid, then hit space bar, start & draw your preferred path, after done, hit "ENTER"`);
    
    // time2start = second(); // as soon as user finishes reading the message, time start to count
//    keyPressed(code);
   
}, false);




// function keyPressed(str){
//     var input = str;
//     intermediateBoard = currentBoard;

//     if (firsttime enter keypress)
//     {
//         go mark the starting Point (rows/2, columns/s)

//     } else {


//     }

//             switch (input) {
//                 case 'ArrowUp':
//                     // console.log('Oranges Up');
//                     break;
//                 case 'ArrowDown':
//                     // console.log('Oranges down');
//                     break;
//                 case 'ArrowLeft':
//                     // console.log('Left: Mangoes & papayas');
//                     break;
//                 case 'ArrowRight':
//                     // console.log('I m Right');
//                     break;
//                 case 'Enter':
//                     // console.log('hitting return');
//                     break;
//                 default:
//                     // console.log(`Sorry, we are out of ${code}.`);
//             }
//     noLoop();

// }