"use strict";
//HEADING JAVASCRIPT SCRIPTS STARTS HERE
//IMPORT AREA
let heading=document.querySelector("#headingImage");
let movingimg=document.querySelector("#movingimg");
let headbg=document.querySelector("#headbg");
let movingimg2=document.querySelector("#movingimg2");
let headContainer=document.querySelector("#headContainer");

//DEFAULT VALUES
let sideMargin=innerWidth*0.025;
let moversOpacity=0.4;
let topMargin=innerHeight*0.025;

//HEADING STYLE CONFIGURATION
heading.style.width=`${innerWidth + sideMargin}px`;
heading.style.height=`${innerHeight*0.15}px`;
heading.style.margin=`${0}px`;
heading.style.marginLeft=`${-sideMargin}px`;
heading.style.marginRight=`${-sideMargin}px`;
heading.style.marginTop=`${-topMargin*1.35}px`;

//POSITION OTHER HEAD ELEMENTS (MOVING BACKGROUNDS AND THEIR BACKGROUNDS)
function positionHeadElm(...names){
  for (let element of names){
    element.style.margin=`${0}px`;
    element.style.marginLeft=`${-sideMargin}px`;
    element.style.marginRight=`${-sideMargin}px`;
    element.style.marginTop=`${-topMargin}px`;
    element.style.left=`${heading.offsetLeft}px`;
    element.style.top="0px";
    element.style.top=`${heading.offsetTop - (heading.offsetTop + element.offsetTop)}px`;
    element.style.width=`${heading.clientWidth}px`;
    element.style.height=`${heading.clientHeight*0.95}px`;
  }
}
positionHeadElm(movingimg,movingimg2,headbg);

//PRE ANIMATION CONFIGURATIONS
headbg.style.marginTop=`${-topMargin*1.6}px`;
movingimg.style.opacity=moversOpacity;
movingimg2.style.opacity=moversOpacity;
headbg.style.opacity=1;
headbg.style.background="cyan";
let movingValue1=0;
let movingValue2=0;
let move1=movingimg.offsetLeft;
let move2=-innerWidth-sideMargin;

//MOVING BACKGROUND ANIMATION PORT
function animateHead(...names){
  movingimg.style.left=`${move1+movingValue1}px`;
  movingimg2.style.left=`${move2 + movingValue2}px`;
  movingValue1++;
  movingValue2++;
  if (movingimg.offsetLeft==innerWidth){
    move1=move2;
    movingimg.style.left=`${move1}px`;
    movingValue1=0;
  }
  else if (movingimg2.offsetLeft==innerWidth){
    movingimg2.style.left=`${move2}px`;
    movingValue2=0;
  }
  requestAnimationFrame(animateHead)
}
animateHead(movingimg,movingimg2);

//HEADING SCRIPTS ENDS HERE

// DATE SCRIPTS START HERE
//IMPORT AREA
let date=document.querySelector("#date");
let tracker=document.querySelector("#tracker");

//DEFAULT DATE TEXT
date.textContent=new Date;

//COLOR AREA
let dateBgColor="#040D1A";
let dateTextColor="#FFFFFF";
let trackerColor="#9999FF";

//SIZING PORT
let dateSideMargin=-innerWidth*0.025;
let fontsize=innerHeight*0.03;
if (innerHeight > innerWidth){
  fontsize=innerHeight*0.02;
}
let dateBoxPos=innerHeight*0.90;

//DATEBOX STYLES
date.style.width=`${innerWidth - dateSideMargin/1.3}px`;
date.style.fontSize=`${fontsize}px`;
date.style.background=dateBgColor;
date.style.color=dateTextColor;
date.style.padding="0px";
date.style.marginLeft=`${dateSideMargin}px`;
date.style.marginRight=`${dateSideMargin}px`;
date.style.top=`${dateBoxPos}px`;
date.style.textAlign="center";

//TRACKER STYLES
tracker.style.width=`${4}px`;
tracker.style.height=`${date.clientHeight}px`;
tracker.style.background=trackerColor;
tracker.style.opacity=0.9;
tracker.style.left=`${date.offsetLeft - -dateSideMargin}px`;
tracker.style.top=`${dateBoxPos}px`;

//DATE ANIMATION DEFAULT VALUES
let trackerStartPos=tracker.offsetLeft;
let movement=0;
let status="forward";

//DATE ANIMATOR
function animateDate(){
  if (tracker.offsetLeft > innerWidth*0.98){
    status="reverse";
  }
  else if(tracker.offsetLeft<=trackerStartPos){
    status="forward";
  }
  if (status=="forward"){
    movement+=8;
  }
  else if (status=="reverse"){
    movement-=8;
  }
  tracker.style.left=`${movement}px`;
  date.textContent=new Date;
  requestAnimationFrame(animateDate);
}
animateDate();
//DATE JAVASCRIPT SCRIPTS ENDS HERE

// INPUT AREA JAVASCRIPT SCRIPT STARTS HERE
//IMPORTS FROM DOM PORT
//CANVAS CONTAINER ELEMENTS
let upFlipBackground=document.querySelector("#upFlipBackground");
let downFlipBackground=document.querySelector("#downFlipBackground");
let usernameContainer=document.querySelector("#usernameContainer");
let Password=document.querySelector("#Password");
let upFlipContainer=document.querySelector("#upFlipContainer");
let downFlipContainer=document.querySelector("#downFlipContainer");
let logInContainer=document.querySelector("#logInContainer");
let registerContainer=document.querySelector("#registerContainer");
let usernameInput=document.querySelector("#usernameInput");
let passwordInput=document.querySelector("#passwordInput");
let usernameText=document.querySelector("#usernameText");
let passwordText=document.querySelector("#passwordText");
let registerText=document.querySelector("#registerText");
let logInText=document.querySelector("#logInText");
//CANVAS DOM ELEMENTS
let canvasUpFlip=document.querySelector("#upFlip");
let canvasDownFlip=document.querySelector("#downFlip");
let canvasUpFlipB=document.querySelector("#upFlipB");
let canvasDownFlipB=document.querySelector("#downFlipB");
let canvasUsernameC=document.querySelector("#usernameC");
let canvasPasswordC=document.querySelector("#PasswordC");
let canvasLogInC=document.querySelector("#logInC");
let canvasRegisterC=document.querySelector("#registerC");

//CANVAS CONTEXT PORT
let upFlip=canvasUpFlip.getContext("2d");
let downFlip=canvasDownFlip.getContext("2d");
let upFlipB=canvasUpFlipB.getContext("2d");
let downFlipB=canvasDownFlipB.getContext("2d");
let usernameC=canvasUsernameC.getContext("2d");
let PasswordC=canvasPasswordC.getContext("2d");
let logInC=canvasLogInC.getContext("2d");
let registerC=canvasRegisterC.getContext("2d");

//MENSURATION PORT
//TRAPEZPIDS DIMENSSIOM
let trapezoidHeight=innerHeight*0.03;
let trapezoidA=innerWidth*0.115;
let trapezoidB=innerWidth*0.25;
let trapezoidX=Math.abs(trapezoidB-trapezoidA)/2;
let totalTrapezoidWidth=trapezoidX*1.5*2 + trapezoidB;
let totalTrapezoidHeight=trapezoidHeight*4;
function trapezoidLayout(){
  if (innerHeight > innerWidth){
    trapezoidHeight=innerHeight*0.025;
    trapezoidA=innerWidth*0.24;
    trapezoidB=innerWidth*0.5;
    trapezoidX=Math.abs(trapezoidB-trapezoidA)/2;
    totalTrapezoidWidth=trapezoidX*1.5*2 + trapezoidB;
    totalTrapezoidHeight=trapezoidHeight*4;
  }
}
trapezoidLayout();
//CANVAS TRAPEZOIDS SIZE

function canvasSize(width,height,...canvasNames){
  for (let element of canvasNames){
    element.width=width;
    element.height=height;
  }
}
//TRAPEZOID CANVAS SIZE
canvasSize(trapezoidB,trapezoidHeight,canvasUpFlip,canvasUpFlipB,canvasDownFlip,canvasDownFlipB,canvasUsernameC,canvasPasswordC);
//DIAMOND CANVAS SIZE
canvasSize(trapezoidX*2.5,trapezoidHeight*2,canvasRegisterC,canvasLogInC);
//GENERAL MEASUREMENTS
let genLineWidth=0.005*trapezoidB;
//INPUT AREA SIZE
function inputsSize(...containers){
  for (let element of containers){
    element.style.width=`${trapezoidA - genLineWidth*4}px`;
    element.style.height=`${trapezoidHeight - trapezoidHeight*0.33}px`;
  }
}
inputsSize(usernameInput,passwordInput);
//CANVAS CONTAINER SIZE
function canvasContainerSize(width,height,...canvasNames){
  for (let element of canvasNames){
    element.style.width=`${width}px`;
    element.style.height=`${height}px`;
  }
}
//CANVAS TRAPEZOID CONTAINER
canvasContainerSize(trapezoidB,trapezoidHeight,upFlipBackground,downFlipBackground,usernameContainer,Password,upFlipContainer,downFlipContainer);
//CANVAS DIAMOND CONTAINER
canvasContainerSize(trapezoidX*2.5,trapezoidHeight*2,logInContainer,registerContainer);

function textWidth(...names){
  let fontsize=trapezoidHeight*0.8;
  for (let element of names){
    element.style.height=`${fontsize}px`;
    element.style.width=`${fontsize*0.60*element.textContent.length}px`;
    element.style.fontSize=`${fontsize}px`;
  }
}
textWidth(usernameText,passwordText,registerText,logInText);

//COLOR PORT
//DIAMONDS COLOR
let diamondsFillColor="#040D1A";
let diamondsStrokeColor="cyan";
//TRAPEZOIDS COLOR
let trapezoidsFillColor="#081325";
let trapezoidsStrokeColor="cyan";
//FLIPPERS COLOR
let flippersFillColor="#0D47A1";
let flippersStrokeColor="cyan";
// DIAMOND EFFECT COLOR
let diamondEffectFill="#1A237E";
let diamondEffectStroke="cyan";
//INPUT AREA BACKGROUND AND COLOR
let inputFontColor="red";
function colorInputs(...containers){
  for (let element of containers){
    element.style.background=trapezoidsFillColor;
    element.style.borderColor=trapezoidsStrokeColor;
    element.style.borderStyle="solid";
    element.style.borderWidth=`${genLineWidth}px`;
    element.style.color=`${inputFontColor}px`;
  }
}
colorInputs(usernameInput,passwordInput);
function colorTexts(...names){
  for (let element of names){
    element.style.color=trapezoidsStrokeColor;
  }
}
colorTexts(usernameText,passwordText,registerText,logInText);

//DRAW ON CANVAS PORT
//DRAW TRAPEZOIDS
function trapezoid(name,posX,posY,a,b,h,color1,color2){
  let x=(b-a)/2;
  let lineWeigth;
  if (a>b)lineWeigth=0.005*a;
  else if(b>a)lineWeigth=0.005*b;
  name.beginPath();
  name.moveTo(posX + x,posY);
  name.lineTo(x + posX + a,posY);
  name.lineTo(2*x + posX + a,posX + h);
  name.lineTo(posX,posY + h);
  name.closePath();
  name.lineWidth=lineWeigth;
  name.fillStyle=color1;
  name.strokeStyle=color2;
  name.fill();
  name.stroke();
}
//DRAW GROUP OF TRAPEZOIDS
function identicalTrapezoids(posX,posY,a,b,h,color1,color2,...canvasNames){
  for (let element of canvasNames){
    trapezoid(element,posX,posY,a,b,h,color1,color2)
  }
}
//BACKGROUND TRAPEZOIDS
identicalTrapezoids(0,0,trapezoidA,trapezoidB,trapezoidHeight,trapezoidsFillColor,trapezoidsStrokeColor,usernameC,PasswordC,upFlipB,downFlipB);
//FLIPPERS TRAPEZOIDS
identicalTrapezoids(0,0,trapezoidA,trapezoidB,trapezoidHeight,flippersFillColor,flippersStrokeColor,upFlip,downFlip);
//DRAW DIAMOND
function diamond(name,posX,posY,color1,color2){
  let shortLength=trapezoidX;
  let height=trapezoidHeight;
  let longLength=shortLength*1.5;
  name.beginPath();
  name.moveTo(posX,posY + height);
  name.lineTo(posX + longLength,posY);
  name.lineTo(posX + longLength+shortLength,posY + height);
  name.lineTo(posX + longLength,posY + height*2);
  name.closePath();
  name.fillStyle=color1;
  name.strokeStyle=color2;
  name.fill ();
  name.stroke();
}
//DRAW IDENTICAL DIAMONDS
function identicalDiamonds(posX,posY,color1,color2,...canvasNames){
  for (let element of canvasNames){
    diamond(element,posX,posY,color1,color2)
  }
}
//DIAMONDS FOR REGISTER AND LOG IN BUTTON
identicalDiamonds(0,0,diamondsFillColor,diamondsStrokeColor,registerC,logInC);

//POSITION ELEMENTS PORT
//POSITION ALL FLIPPERS
let inputsPositionX=innerWidth/2 - totalTrapezoidWidth/2;
let inputsPositionY=innerHeight*1.1/2 - totalTrapezoidHeight/2;
function inputLayout(){
  if (innerHeight > innerWidth){
    inputsPositionY=innerHeight*1.1/2 + totalTrapezoidHeight/2;
  }
}
inputLayout();

function positionFlipperElements(posX,posY,...containers){
  let count=1;
  for (let element of containers){
    element.style.left=`${posX}px`;
    element.style.top=`${trapezoidHeight*count + posY}px`;
    count++;
  }
}
//POSITION ALL TRAPEZOIDS
function positionTrapezoids(posX,posY,...divNames){
  let increment=0;
  for (let element of divNames){
    element.style.left=`${posX}px`;
    element.style.top=`${posY + increment}px`;
    increment+=trapezoidHeight;
  }
}
//POSITION ALL DIAMONDS
function positionDiamonds(posX,posY,...canvasNames){
  let span=0;
  for (let element of canvasNames){
    element.style.top=`${posY + trapezoidHeight}px`;
    element.style.left=`${posX - (trapezoidX*1.5) + span}px`;
    span+=trapezoidA + trapezoidX*2.5;
  }
}

//POSITION TEXTS (USERNAME AND PASSWORD)
function positionVTexts(posX,posY,...names){
  let increment=0;
  for (let element of names){
    element.style.left=`${posX + trapezoidX*2.25 + trapezoidA/2 - element.clientWidth/2}px`;
    element.style.top=`${posY + increment - trapezoidHeight + element.clientHeight/2.3}px`;
    increment+=trapezoidHeight*1.35;
  }
}

//POSITION TEXTS(REGISTER AND LOG-IN)
function positionHTexts(posX,posY,...names){
  let hIncrement=0;
  let vIncrement=0;
  for (let element of names){
    element.style.left=`${posX + trapezoidX*2.25/2 - element.clientWidth/2 + hIncrement}px`;
    element.style.top=`${posY - trapezoidHeight*2.40 - vIncrement}px`;
    hIncrement=trapezoidX*2 + trapezoidA + trapezoidX/1.2 - logInText.clientWidth/2;
    vIncrement=trapezoidHeight*1.60;
  }
}

//POSITION ALL ENTRIES(DIAMONDS AND TRAPEZOIDS)
function posAllEntryPort(posX,posY){
  positionVTexts(posX,posY,usernameText,passwordText);
  positionHTexts(posX,posY,registerText,logInText);
  posX+=trapezoidX*1.5;
  positionTrapezoids(posX,posY,usernameContainer,upFlipBackground,downFlipBackground,Password);
  positionFlipperElements(posX,posY,upFlipContainer,downFlipContainer);
  positionFlipperElements(posX+trapezoidX,posY+genLineWidth,usernameInput,passwordInput);
  positionDiamonds(posX,posY,registerContainer,logInContainer)
}
posAllEntryPort(inputsPositionX,inputsPositionY);

//SIDE EFFECTS PORT
//FLIPPERS TRANSITION
usernameInput.style.display="none";
passwordInput.style.display="none";

function openFlipper(canvasNames){
  canvasNames.clearRect(0,0,trapezoidB,trapezoidHeight);
  trapezoid(canvasNames,0,0,trapezoidA,trapezoidB,trapezoidHeight,trapezoidsFillColor,trapezoidsFillColor);
  trapezoid(canvasNames,0,0,trapezoidA,trapezoidB,trapezoidHeight*0,flippersFillColor,flippersStrokeColor);
}
function closeFlipper(canvasNames){
  canvasNames.clearRect(0,0,trapezoidB,trapezoidHeight);
  trapezoid(canvasNames,0,0,trapezoidA,trapezoidB,trapezoidHeight,flippersFillColor,flippersStrokeColor);
}

//ADDITIONAL EFFECT FOR USERNAME FEILD
usernameInput.addEventListener("change",()=>{
  usernameInput.style.display="none";
  closeFlipper(upFlip)
})
usernameInput.addEventListener("blur",()=>{
  usernameInput.style.display="none";
  closeFlipper(upFlip)
})
//ADDITIONAL EFFECT FOR PASSWORD FIELD
passwordInput.addEventListener("change",()=>{
  passwordInput.style.display="none";
  closeFlipper(downFlip);
})
passwordInput.addEventListener("blur",()=>{
  passwordInput.style.display="none";
  closeFlipper(downFlip);
  passwordText.textContent="PASSWORD";
})
//EFFECT PORT FOR ALL INPUT AREAS
window.addEventListener("click",event=>{
  if (event.target.id=="usernameC" || event.target.id=="usernameText"){
    usernameInput.style.display="inline";
    usernameInput.focus();
    openFlipper(upFlip)
  }
  else if (event.target.id =="PasswordC" || event.target.id=="passwordText"){
    passwordInput.style.display="inline";
    passwordInput.focus();
    openFlipper(downFlip);
    passwordText.textContent="TROUBLE LOGGING IN?"
  }
  else if (event.target.id=="registerText" || event.target.id=="registerC"){
    diamond(registerC,0,0,diamondEffectFill,diamondEffectStroke)
  }
  else if (event.target.id=="logInText" || event.target.id=="logInC"){
    diamond(logInC,0,0,diamondEffectFill,diamondEffectStroke)
  }
  else{
    closeFlipper(upFlip);
    closeFlipper(downFlip);
    passwordInput.blur();
    usernameInput.blur();
  }
})
// INPUT AREA JAVASCRIPT SCRIPT ENDS HERE

// GEARS JAVASCRIPT STARTS HERE
// IMPORT PORT
// CANVAS CONTAINERS
let bigGearContainer=document.querySelector("#bigGearContainer");
let mediumGearContainer1=document.querySelector("#mediumGearContainer1");
let mediumGearContainer2=document.querySelector("#mediumGearContainer2");
let smallGearContainer1=document.querySelector("#smallGearContainer1");
let smallGearContainer2=document.querySelector("#smallGearContainer2");

// PRE CONTEXT CANVAS IMPORTS
let bigCanvasGear=document.querySelector("#bigGear");
let mediumCanvasGear1=document.querySelector("#mediumGear1");
let mediumCanvasGear2=document.querySelector("#mediumGear2");
let smallCanvasGear1=document.querySelector("#smallGear1");
let smallCanvasGear2=document.querySelector("#smallGear2");

//CANVAS CONTEXTS PORT
let bigGear=bigCanvasGear.getContext("2d");
let mediumGear1=mediumCanvasGear1.getContext("2d");
let mediumGear2=mediumCanvasGear2.getContext("2d");
let smallGear1=smallCanvasGear1.getContext("2d");
let smallGear2=smallCanvasGear2.getContext("2d");

//COLOR PORT
let gearFillColor="#081325";
let gearStrokeColor="#1F8DE4";

//MENSURATION PORT
let gearTeethRadius=innerWidth*0.13;
let gearOffsetRadius=gearTeethRadius*0.94;
let gearCenterRadius=gearTeethRadius*0.4;
let gearTeethCount=20;

//SIZE GEAR CONTAINERS
function sizeBigGearContainer(){
  bigGearContainer.style.width=`${gearTeethRadius*2 + gearTeethRadius*0.027}px`;
  bigGearContainer.style.height=`${gearTeethRadius*2 + gearTeethRadius*0.027}px`;
}
sizeBigGearContainer();
function sizeMediumGearContainers(...mediumContainers){
  for (let element of mediumContainers){
    element.style.width=`${bigGearContainer.clientWidth/1.5}px`;
    element.style.height=`${bigGearContainer.clientWidth/1.5}px`;
  }
}
sizeMediumGearContainers(mediumGearContainer1,mediumGearContainer2);
function sizeSmallGearContainers(...smallContainers){
  for (let element of smallContainers){
    element.style.width=`${bigGearContainer.clientWidth/2.0}px`;
    element.style.height=`${bigGearContainer.clientWidth/2.0}px`;
  }
}
sizeSmallGearContainers(smallGearContainer1,smallGearContainer2);

//SIZE GEAR CANVAS
function sizeBigGearCanvas(){
  bigCanvasGear.Width=`${gearTeethRadius*2 + gearTeethRadius*0.027}px`;
  bigCanvasGear.Height=`${gearTeethRadius*2 + gearTeethRadius*0.027}px`;
}
sizeBigGearCanvas();
function sizeMediumGearCanvas(...mediumCanvas){
  for (let element of mediumCanvas){
    element.Width=`${bigGearContainer.clientWidth/1.5}px`;
    element.Height=`${bigGearContainer.clientWidth/1.5}px`;
  }
}
sizeMediumGearCanvas(mediumCanvasGear1,mediumCanvasGear2);
function sizeSmallGearCanvas(...smallCanvas){
  for (let element of smallCanvas){
    element.Width=`${bigGearContainer.clientWidth/2.0}px`;
    element.Height=`${bigGearContainer.clientWidth/2.0}px`;
  }
}
sizeSmallGearCanvas(smallCanvasGear1,smallCanvasGear2);

//POSITION PORT
//POSITION GEAR CONTAINERS
function positionAllGears([...gearNames]){
  let count=0;
  let totalGearWidth=gearNames.reduce((acc,element)=>element.clientWidth + acc,0);
  let totalGearMargin=gearNames.reduce((acc,element)=>element.clientWidth*0.035 + acc,0);
  let incrementValue=(innerWidth - totalGearWidth + totalGearMargin)/2;
  for (let element of gearNames){
    element.style.top=`${innerHeight*1.1/2 - element.clientHeight/2}px`;
    if (innerHeight > innerWidth){
      element.style.top=`${innerHeight*1.1/2 - element.clientHeight}px`;
    }
    element.style.left=`${incrementValue}px`;
    incrementValue+=element.clientWidth*0.965;
    count++;
  }
}
positionAllGears([smallGearContainer1,mediumGearContainer1,bigGearContainer,mediumGearContainer2,smallGearContainer2]);

//CONVERT ANGLES FROM RADIAN TO DEGREE
function sine(angle){
  return Math.sin((angle*Math.PI)/180)
}
function cosine(angle){
  return Math.cos((angle*Math.PI)/180)
}
function tangent(angle){
  return Math.tan((angle*Math.PI)/180)
}

// GETS COORDINATES ON A CIRCLE
function circleCoords(posX,posY,radius,angle){
  angle=360-angle;
  if ((angle%360>=270)&&(angle%360<=360)){
    let Xcoord=posX + radius*cosine(angle);
    let Ycoord=posY + radius*-sine(angle);
    return {x: Xcoord,y: Ycoord}
  }
  if ((angle%360>=180)&&(angle%360<=270)){
    let Xcoord=posX + radius*cosine(angle);
    let Ycoord=posY + radius*-sine(angle);
    return {x: Xcoord,y: Ycoord}
  }
  if ((angle%360>=90)&&(angle%360<=180)){
    let Xcoord=posX + radius*cosine(angle);
    let Ycoord=posY + radius*-sine(angle);
    return {x: Xcoord,y: Ycoord}
  }
  if ((angle%360>=0)&&(angle%360<=90)){
    let Xcoord=posX + radius*cosine(angle);
    let Ycoord=posY + radius*-sine(angle);
    return {x: Xcoord,y: Ycoord}
  }
}

//DRAWS A SPECIFIED NUMBER OF GEAR-TEETH
function drawGearTeeth(canvasName,posX,posY,outterRadius,innerRadius,gearTeeth,color1,color2){
  let angle=0;
  let lineWeight=0.015*outterRadius;
  let incrementValue=(360)/gearTeeth;
  let innerCircleCoords=circleCoords(posX,posY,innerRadius,angle);
  let outterCircleCoords=circleCoords(posX,posY,outterRadius,angle);
  canvasName.beginPath();
  canvasName.moveTo(innerCircleCoords.x,innerCircleCoords.y);
  for (let i=0; i<gearTeeth; i++){
    canvasName.beginPath();
    canvasName.moveTo(innerCircleCoords.x,innerCircleCoords.y);
    canvasName.lineTo(outterCircleCoords.x,outterCircleCoords.y);
    angle+=incrementValue/2;
    innerCircleCoords=circleCoords(posX,posY,innerRadius,angle);
    outterCircleCoords=circleCoords(posX,posY,outterRadius,angle);
    canvasName.lineTo(outterCircleCoords.x,outterCircleCoords.y);
    canvasName.lineTo(innerCircleCoords.x,innerCircleCoords.y);
    canvasName.closePath();
    canvasName.strokeStyle=color2;
    canvasName.lineWidth=lineWeight;
    canvasName.fillStyle=color1;
    canvasName.fill();
    canvasName.stroke();
    angle+=incrementValue/2;
    innerCircleCoords=circleCoords(posX,posY,innerRadius,angle);
    outterCircleCoords=circleCoords(posX,posY,outterRadius,angle);
  }
}

//DRAWS A GEAR
function gear(canvasName,posX,posY,outterRadius,innerRadius1,innerRadius2,gearTeeth,color1,color2){
  let ring1=innerRadius1-(0.1*innerRadius1);
  let ring2=innerRadius2+(0.1*innerRadius2);
  let ring3=ring1-(0.05*ring1);
  let midRadius=(innerRadius1+innerRadius2)/2;
  let decoLineWeigth=(0.015*outterRadius)/2;
  let lineWeight=(innerRadius1 - innerRadius2)+(0.015*outterRadius);
  drawGearTeeth(canvasName,posX,posY,outterRadius,innerRadius1,gearTeeth,color1,color2);
  canvasName.beginPath();
  canvasName.arc(posX,posY,midRadius,0,7);
  canvasName.lineWidth=lineWeight;
  canvasName.strokeStyle=color1;
  canvasName.stroke();
  canvasName.beginPath();
  canvasName.arc(posX,posY,ring1,0,7);
  canvasName.strokeStyle=color2;
  canvasName.lineWidth=decoLineWeigth;
  canvasName.stroke();
  canvasName.beginPath();
  canvasName.arc(posX,posY,ring2,0,7);
  canvasName.strokeStyle=color2;
  canvasName.lineWidth=decoLineWeigth;
  canvasName.stroke();
  canvasName.beginPath();
  canvasName.arc(posX,posY,ring3,0,7);
  canvasName.strokeStyle=color2;
  canvasName.lineWidth=decoLineWeigth;
  canvasName.stroke();
}
gear(bigGear,bigGearContainer.clientWidth/2,bigGearContainer.clientWidth/2,gearTeethRadius,gearOffsetRadius,gearCenterRadius,gearTeethCount,gearFillColor,gearStrokeColor);
gear(mediumGear1,mediumGearContainer1.clientWidth/2,mediumGearContainer2.clientWidth/2,gearTeethRadius/1.5,gearOffsetRadius/1.5,gearCenterRadius/1.5,gearTeethCount,gearFillColor,gearStrokeColor);
gear(mediumGear2,mediumGearContainer2.clientWidth/2,mediumGearContainer2.clientWidth/2,gearTeethRadius/1.5,gearOffsetRadius/1.5,gearCenterRadius/1.5,gearTeethCount,gearFillColor,gearStrokeColor);
gear(smallGear1,smallGearContainer1.clientWidth/2,smallGearContainer1.clientWidth/2,gearTeethRadius/2.0,gearOffsetRadius/2.0,gearCenterRadius/2.0,gearTeethCount,gearFillColor,gearStrokeColor);
gear(smallGear2,smallGearContainer2.clientWidth/2,smallGearContainer2.clientWidth/2,gearTeethRadius/2.0,gearOffsetRadius/2.0,gearCenterRadius/2.0,gearTeethCount,gearFillColor,gearStrokeColor);

// PRE ANIMATION VALUES
let gearAngle=0;

//ANIMATE ALL GEARS
function rotator(){
  gearAngle+=1;
  if (gearAngle==360)gearAngle=0;
  bigGearContainer.style.transform=`rotate(${gearAngle}deg)`;
  mediumGearContainer1.style.transform=`rotate(${-gearAngle}deg)`;
  mediumGearContainer2.style.transform=`rotate(${-gearAngle}deg)`;
  smallGearContainer1.style.transform=`rotate(${gearAngle}deg)`;
  smallGearContainer2.style.transform=`rotate(${gearAngle}deg)`;
  requestAnimationFrame(rotator)
}
rotator();
// GEARS JAVASCRIPT ENDS HERE
