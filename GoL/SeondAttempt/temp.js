// Add event listener on keydown, no keypress as it will not be able to give out arrow or space bar
document.addEventListener('keydown', (event) => {
    var code = event.code;
    console.log(code);    

    keyPressed(code);

}, false);


/* When mouse is dragged */
function keyDragged(str) {
    /* If the key coordinate is outside the grid-board then ignore & exit */
    
    if (firstEntry){
            if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
                return;
            }
            let x = Math.floor(mouseX / unitLength);
            let y = Math.floor(mouseY / unitLength);
            console.log('x= '+x);
            console.log('y= '+y);
            currentBoard[x][y] = 1;
            colorMode(RGB);
            fill(30);
            stroke(strokeColor);
            rect(x*unitLength, y*unitLength, unitLength, unitLength);
            if (str === 'ArrowUp'){
                y=y-1; 
            } else if (str === 'ArrowDown'){
                y=y+1; 
                console.log('down down 1st entry');
            } else if (str === 'ArrowLeft'){
                x=x-1;
            } else{
                x=x+1;
            }
            currentBoard[x][y] = 1;
            fill(30);
            stroke(strokeColor);
            rect(x*unitLength, y*unitLength, unitLength, unitLength);
            SelfRecordX = x;
            SelfRecordY = y;
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
