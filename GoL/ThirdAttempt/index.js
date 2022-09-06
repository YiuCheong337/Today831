// screen size
// - small, medium & large

const unitLength    = 20;
const boxColor      = 168;
const strokeColor   = 32;
var SAM           = 3;
var YEE           = 2;
var currentSpeed  = 'slow';     /* slow=fr(2); medium=fr(); fast=fr() */ 
var currentSize   = 'large';    /* large (903px,629px); middle; small */
let columns;    /* To be determined by window width */
let rows;       /* To be determined by window height */
let currentBoard;
let nextBoard;
let intermediateBoard;
let time2start; 
var SelfRecordX;
var SelfRecordY;
let firstEntry = true;
var tempcount=0;

function setup(){
    /* Set the canvas to be under the element #canvas*/
//    const canvas = createCanvas(windowWidth-27, windowHeight-59);
    const canvas = createCanvas(windowWidth-27, windowHeight-59); 
//   console.log(windowWidth)
//   console.log(windowHeight)
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
       //  intermediateBoard[i] = [];
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
            
          //  intermediateBoard[i][j];
        }
	}
    console.log('done initialization')
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
//    tempcount++;
//    console.log(tempcount);

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
    fill(0,255,0);
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
            frameRate(30);
        } 
    } 
}

document.querySelector('.DLsize')
	.addEventListener('click', function() {
		var inputWsize = document.querySelector('.DLsize').value;
        console.log(inputWsize);
        UpdateWsize(inputWsize);
});

function UpdateWsize(str) {
    var input = str;
    if (input === currentSize){
        /* do nothing */    ;
    } else {
        currentSize = input;
        if(currentSize === 'small'){
            resizeCanvas(windowWidth/3, windowHeight/3);
        } else if (currentSize === 'middle'){
            resizeCanvas(windowWidth/2, windowHeight/2);
        } else if (currentSize === 'big'){
            resizeCanvas(windowWidth-27, windowHeight-59);
        } 
    } 
}

document.querySelector('.SpecialGadget')
	.addEventListener('click', function() {
        var inputGadget = document.querySelector('.SpecialGadget').value;
        console.log(inputGadget);
        UpdateScreenDevice(inputGadget);
});

function UpdateScreenDevice(str) {
    var input = str;
    noLoop();
    initBB();
        
        if(input === 'gldr'){
            AssignSlider();
        } else if (input === 'sship'){
            AssignSpaceShip();
        } else if (input === 'gosper'){
            AssignGosper();
        } 
    // loop();
}

function AssignGosper(){
    // console.table(nextBoard);
    nextBoard[2][6]=1;
    nextBoard[3][6]=1;
    nextBoard[2][7]=1;
    nextBoard[3][7]=1;
    nextBoard[12][6]=1;
    nextBoard[12][7]=1;
    nextBoard[12][8]=1;
    nextBoard[13][5]=1;
    nextBoard[13][9]=1;
    nextBoard[14][4]=1;
    nextBoard[14][10]=1;
    nextBoard[15][4]=1;
    nextBoard[15][10]=1;
    nextBoard[16][7]=1;
    nextBoard[17][5]=1;
    nextBoard[17][9]=1;
    nextBoard[18][6]=1;
    nextBoard[18][7]=1;
    nextBoard[18][8]=1;
    nextBoard[19][7]=1;
    nextBoard[22][4]=1;
    nextBoard[22][5]=1;
    nextBoard[22][6]=1;
    nextBoard[23][4]=1;
    nextBoard[23][5]=1;
    nextBoard[23][6]=1;
    nextBoard[24][3]=1;
    nextBoard[24][7]=1;
    nextBoard[26][2]=1;
    nextBoard[26][3]=1;
    nextBoard[26][7]=1;
    nextBoard[26][8]=1;
    nextBoard[36][4]=1;
    nextBoard[36][5]=1;
    nextBoard[37][4]=1;
    nextBoard[37][5]=1;

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];

    for (let m = 0; m < columns; m++) {
        for (let n = 0; n < rows; n++) {
            if (currentBoard[m][n] == 1){
                fill('#fae');  
            } else {
                fill(255);
            } 
            stroke(strokeColor);
            rect(m * unitLength, n * unitLength, unitLength, unitLength);
        }
    }
}

function AssignSlider(){

    // console.table(nextBoard);
    nextBoard[4][2]=1;
    nextBoard[2][3]=1;
    nextBoard[4][3]=1;
    nextBoard[3][4]=1;
    nextBoard[4][4]=1;

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];

    for (let m = 0; m < columns; m++) {
        for (let n = 0; n < rows; n++) {
            if (currentBoard[m][n] == 1){
                fill('#fae');  
            } else {
                fill(255);
            } 
            stroke(strokeColor);
            rect(m * unitLength, n * unitLength, unitLength, unitLength);
        }
    }
}

function AssignSpaceShip(){

    nextBoard[3][2]=1;
    nextBoard[4][2]=1;
    nextBoard[2][3]=1;
    nextBoard[3][3]=1;
    nextBoard[4][3]=1;
    nextBoard[5][3]=1;
    nextBoard[2][4]=1;
    nextBoard[3][4]=1;
    nextBoard[5][4]=1;
    nextBoard[6][4]=1;
    nextBoard[4][5]=1;
    nextBoard[5][5]=1;

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];

    for (let m = 0; m < columns; m++) {
        for (let n = 0; n < rows; n++) {
            if (currentBoard[m][n] == 1){
                fill('#fae');  
            } else {
                fill(255);
            } 
            stroke(strokeColor);
            rect(m * unitLength, n * unitLength, unitLength, unitLength);
        }
    }
}

// Add event listener on keydown, no keypress as it will not be able to give out arrow or space bar
document.addEventListener('keydown', (event) => {
    var code = event.code;
    console.log(code);    

    // alert (`Cursor will start in the middle of the screen, pls use Arrow keys to go your desire grid, then hit space bar, start & draw your preferred path, after done, hit "ENTER"`);
    
    // time2start = second(); // as soon as user finishes reading the message, time start to count
    keyPressed(code);

}, false);


/* When mouse is dragged */
function keyDragged(str) {
    /* If the key coordinate is outside the grid-board then ignore & exit */
    
    if (firstEntry){
            if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
                return;
            }
            const x = Math.floor(mouseX / unitLength);
            const y = Math.floor(mouseY / unitLength);
            console.log('x= '+x);
            console.log('y= '+y);
            currentBoard[x][y] = 1;
            fill(30);
            stroke(strokeColor);
            rect(420, 260, 20, 20);
            let Y = y;
            let X = x;
            if (str === 'ArrowUp'){
                Y=Y-1; 
            } else if (str === 'ArrowDown'){
                Y=Y+1; 
                console.log('down down 1st entry');
            } else if (str === 'ArrowLeft'){
                X=X-1;
            } else{
                X=X+1;
            }
            currentBoard[X][Y] = 1;
            fill(30);
            stroke(strokeColor);
            rect(X*unitLength, Y*unitLength, unitLength, unitLength);
            SelfRecordX = X;
            SelfRecordY = Y;
            firstEntry = !firstEntry;
            console.log(SelfRecordX);
            console.log(SelfRecordY);
            console.log('done in the 1st entry');
        }
    else{
            let x = SelfRecordX; 
            let y = SelfRecordY;
            if (str === 'ArrowUp'){
                y=y-1; 
            } else if (str === 'ArrowDown') {
                y=y+1; 
                console.log('not the first time down')
            } else if (str === 'ArrowLeft') {
                x=x-1;
            } else {
                x=x+1;
            }
            currentBoard[x][y] = 1;
            fill(10);
            stroke(strokeColor);
            rect(x * unitLength, y * unitLength, unitLength, unitLength);
            SelfRecordX = x;
            SelfRecordY = y;
    }
}

/* When mouse is pressed */
function keyPressed(str) {
    console.log('Inside keyPress');
    noLoop();
    switch (str) {
        case 'ArrowUp':
            keyDragged(str);
            break;
        case 'ArrowDown':
            keyDragged(str);
            break;
        case 'ArrowLeft':
            keyDragged(str);
            break;
        case 'ArrowRight':
            keyDragged(str);
            break;
        default:
            // console.log(`Sorry, we are out of ${code}.`);
    } 
}

/* When mouse is released */
function keyReleased() {
    console.log('here in Key Released');
    loop();
}
