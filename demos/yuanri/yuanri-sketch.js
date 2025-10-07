let font;
let textStartX, textStartY, wordSize, lineHeight, wordDistance;
let textDeltaY = 20;
let deltY = 0;
let textObjects = [];
let poem = "爆竹声中一岁除春风送暖入屠苏千门万户曈曈日总把新桃换旧符",
  poemArr;
let isBegin = false;
//matter.js
let engine, world;

//line_1_paramater
let fireworkPoints = [];
let explodeRadius = 20;
let chuCue = false,
  yisuiA = 255;

//line_2_paramater
let img;
let bowPoints = [],
  bowPointD = 0.4,
  bowX = 750,
  bowY = 600,
  isBowGenerated = false;
let glass,
  isGlassGenerated = false;
let winePoints1 = [],
  winePoints2 = [],
  winePointD = 1;

//line_3_paramater
let doors = [],
  windows = [];
let isDoorAppeared = false,
  isWindowsAppeared = false;

//line_4_paramater
let bottomGround, textlineGround;
let phyWords = [],
  touchTime = 0;

function preload() {
  font = loadFont("./assets/ai.ttf");
  img = loadImage("./assets/bowBody.png");
}

//check if the play begins---------------
const okBtn = document.querySelector(".okBtn");
const tipsDiv = document.querySelector(".tips");
const maskDiv = document.querySelector(".mask");

okBtn.addEventListener("click", () => {
  isBegin = true;
  tipsDiv.style.display = "none";
  maskDiv.classList.add("mask-later");
});
//--------------------------------------------setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont(font);
  fill(255);
  noStroke();
  textStartX = width / 5;
  textStartY = height / 3;
  lineHeight = 80;
  wordSize = 40;
  textDeltaY = (2 * wordSize) / 5;
  wordDistance = 1.3 * wordSize;
  textSize(wordSize);

  //matter.js world
  engine = Matter.Engine.create();
  world = engine.world;
  engine.world.gravity.y = 0.3;
  Matter.Engine.run(engine);

  //create textObject
  createTextObjects();

  createFireworkPoints();

  createWinePoints();

  createDoorsAnsWindows();

  createGround();

  createJTXF();
}
function createTextObjects() {
  poemArr = poem.split("");
  for (let j = 0; j < 4; j++) {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(new textObject(poemArr[j * 7 + i], i, j));
    }
    textObjects.push(arr);
  }
  console.log(textObjects);
}
function createFireworkPoints() {
  let points = font.textToPoints(
    "爆 竹 声 中",
    textStartX,
    textStartY,
    wordSize,
    {
      sampleFactor: 1,
    }
  );
  for (let p of points) {
    fireworkPoints.push(new Particle(p.x, p.y));
  }
}
function createWinePoints() {
  let points1 = font.textToPoints(
    textObjects[1][5].content,
    textObjects[1][5].pos.x,
    textObjects[1][5].pos.y,
    wordSize,
    {
      sampleFactor: 1,
    }
  );

  let points2 = font.textToPoints(
    textObjects[1][6].content,
    textObjects[1][6].pos.x,
    textObjects[1][6].pos.y,
    wordSize,
    {
      sampleFactor: 1,
    }
  );
  for (let p of points1) {
    winePoints1.push(createWineParticle(p.x, p.y));
  }
  for (let p of points2) {
    winePoints2.push(createWineParticle(p.x, p.y));
  }
}
function createDoorsAnsWindows() {
  for (i = 0; i < 100; i++) {
    doors.push(new fillUpText("门"));
    windows.push(new fillUpText("户"));
  }
}
function createGround() {
  bottomGround = Matter.Bodies.rectangle(0, 700, 2 * width, 20, {
    isStatic: true,
    friction: 2,
  });
  Matter.World.add(world, bottomGround);

  let x = textObjects[3][1].pos.x;
  let y = textObjects[3][0].pos.y + 8;
  let x1 = textObjects[3][6].pos.x + wordSize;
  textlineGround = Matter.Bodies.rectangle((x + x1) / 2, y, x1 - x, 10, {
    isStatic: true,
    friction: 0,
  });
  stroke(255);
  // rect(x, y, x1 - x, 5);
  Matter.World.add(world, textlineGround);
}
function createJTXF() {
  phyWords.push(new phyText(textObjects[3][2]));
  phyWords.push(new phyText(textObjects[3][3]));
  phyWords.push(new phyText(textObjects[3][5]));
  phyWords.push(new phyText(textObjects[3][6]));

  for (let phyWord of phyWords) {
    Matter.World.add(world, phyWord.body);
  }
}

//--------------------------------------------draw()
function draw() {
  background(0, 50);
  Matter.Engine.update(engine);
  //元日
  drawTitle();
  //爆竹声中
  drawBZSZ();
  //一岁除
  drawYSC();
  //春风送暖
  drawCFSN();
  //入屠苏
  drawRTS();
  //千门万户
  drawQMWH();
  //曈曈日
  drawTTR();
  //总把新桃换旧符
  drawZBXTHJF();
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.home = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.exploded = false;
  }

  update() {
    let mouseVec = createVector(mouseX, mouseY);
    let d = dist(mouseVec.x, mouseVec.y, this.pos.x, this.pos.y);

    if (d < explodeRadius && !this.exploded) {
      // 受到鼠标影响，粒子爆炸
      let force = p5.Vector.sub(this.pos, mouseVec).setMag(5); // 远离鼠标
      this.acc.add(force);
      this.exploded = true;
    } else if (this.exploded) {
      // 回归原位置
      let homeForce = p5.Vector.sub(this.home, this.pos).mult(0.05);
      this.acc.add(homeForce);
    }

    this.vel.add(this.acc);
    this.vel.mult(0.9); // 模拟摩擦力
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    fill(255);
    noStroke();
    let c = random(155) + 100;
    if (this.exploded) {
      fill(255, c, 100);
    }
    ellipse(this.pos.x, this.pos.y, 1);
  }
}
class textObject {
  constructor(wordContent, i, j) {
    this.content = wordContent;
    this.pos = createVector(
      textStartX + i * wordDistance + 3 * wordDistance * j,
      textStartY + j * lineHeight
    );
    this.bounds = font.textBounds(
      wordContent,
      textStartX + i * wordDistance + 3 * wordDistance * j,
      textStartY + j * lineHeight,
      wordSize
    );
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.isTouched = false;
    this.deltY = 0;
    this.accSeed = random(100);
  }

  update() {
    this.acc.y = 1.5 * cos(frameCount / 50 + this.accSeed) + 0.6;
    this.acc.x = 2 * sin(frameCount / 50 + this.accSeed) + 1.2;
    // this.vel.y = 2 * cos(frameCount / 50) + 0.8;
    // this.vel.x = 2 * sin(frameCount / 50) + 0.6;

    this.vel.add(this.acc);
    this.vel.mult(0.5); // 模拟摩擦力
    this.pos.add(this.vel);
    this.acc.mult(0);
    // console.log(this.vel);
  }

  updateIsTouched() {
    if (
      mouseX > this.bounds.x &&
      mouseX < this.bounds.x + this.bounds.w &&
      mouseY > this.bounds.y &&
      mouseY < this.bounds.y + this.bounds.h
    ) {
      this.isTouched = true;
    } else {
      this.isTouched = false;
    }
  }
}
class phyParticle {
  constructor(body) {
    this.body = body;
  }

  bowDisplay() {
    let pos = this.body.position;
    fill(255);
    noStroke();
    ellipse(pos.x, pos.y, bowPointD, bowPointD); // 绘制每个点
  }

  wineDisplay() {
    let pos = this.body.position;
    fill(255);
    noStroke();
    ellipse(pos.x, pos.y, winePointD, winePointD); // 绘制每个点
  }
}
class fillUpText {
  constructor(text) {
    this.content = text;
    this.pos = getXY();
    this.sizeO = random(10, 30);
    this.size = this.sizeO;
    this.alpha = 0;
    this.alphaSpeed = random(0.5, 1);
    this.alphaIncreaseLock = false;
    this.color = [255, 255, 255];
    this.colorRan = random(10, 50);
  }

  updateSize() {
    if (this.content == "户") {
      this.size = this.sizeO * (cos(frameCount / 50) + 1.5);
    } else {
      this.size = this.sizeO * (sin(frameCount / 50) + 1.5);
    }
  }
  updateAlpha() {
    if (textObjects[3][0].isTouched || textObjects[3][1].isTouched) {
      if (this.alpha > 5) this.alpha -= this.alphaSpeed * 1.4;
      this.alphaIncreaseLock = true;
    } else if (this.alpha < 250 && !this.alphaIncreaseLock) {
      this.alpha += this.alphaSpeed * 0.6;
    }
  }
  updateColor() {
    let redV = 230 + 40 * cos(frameCount / 20);
    let GreenV = 180 + 40 * sin(frameCount / 20);
    this.color[0] = redV;
    this.color[1] = GreenV;
    this.color[2] = 20;
  }

  show() {
    stroke(this.color[0], this.color[1], this.color[2], this.alpha);
    textSize(this.size);
    text(this.content, this.pos.x, this.pos.y);
  }
}
class phyText {
  constructor(textObject) {
    this.content = textObject.content;
    this.size = 42;
    this.body = Matter.Bodies.rectangle(
      textObject.pos.x + this.size / 2,
      textObject.pos.y - this.size / 2 + 4,
      this.size,
      this.size,
      {
        friction: 0,
        frictionAir: 0.01,
      }
    );
    this.pos = createVector(
      this.body.position.x - this.size / 2,
      this.body.position.y + this.size / 2
    );
  }

  move() {
    Matter.Body.applyForce(
      this.body,
      this.body.position,
      Matter.Vector.create(0.002, 0)
    );
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(0.8);
    textSize(wordSize);

    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);

    // rect(-this.size / 2, -this.size / 2, this.size, this.size);
    textSize(wordSize);
    text(`${this.content}`, -this.size / 2, this.size / 2);
    pop();
  }
}

//标题
function drawTitle() {
  noFill();
  stroke(255);
  strokeWeight(1);
  textSize(wordSize);
  text("《  元  日 》", width / 2 - 100, 100);
  textSize(wordSize * 0.6);
  strokeWeight(0.4);

  text("[宋]  王安石", width / 2 + 50, 160);
  textSize(wordSize);
  strokeWeight(0.8);
}
//爆竹声中一岁除
function drawBZSZ() {
  for (let p of fireworkPoints) {
    if (isBegin) {
      p.update();
    }
    p.show();
  }
}
function drawYSC() {
  let targetWord = textObjects[0][6];
  if (
    mouseX > targetWord.bounds.x &&
    mouseX < targetWord.bounds.x + targetWord.bounds.w &&
    mouseY > targetWord.bounds.y &&
    mouseY < targetWord.bounds.y + targetWord.bounds.h &&
    isBegin
  ) {
    chuCue = true;
  } else {
    chuCue = false;
  }
  if (chuCue) {
    yisuiA = yisuiA > 0 ? (yisuiA -= 3) : 0;
  }
  // console.log(chuCue, yisuiA);
  fill(0);
  stroke(255, 255, 255, yisuiA);
  strokeWeight(1.8);
  textSize(wordSize);

  if (isBegin) {
    //draw jumpable 一岁
    drawJumpText(textObjects[0][4]);
    drawJumpText(textObjects[0][5]);

    stroke(255);
    //draw jumpable 除
    drawJumpText(textObjects[0][6]);
  } else {
    //draw still 一岁
    drawStillText(textObjects[0][4]);
    drawStillText(textObjects[0][5]);

    stroke(255);
    //draw still 除
    drawStillText(textObjects[0][6]);
  }
}
function drawJumpText(thisWord) {
  let bounds = thisWord.bounds;
  // console.log(bounds);
  if (
    mouseX > bounds.x &&
    mouseX < bounds.x + bounds.w &&
    mouseY > bounds.y &&
    mouseY < bounds.y + bounds.h
  ) {
    thisWord.isTouched = true;
    // mouseStayTime++;
    // console.log("mouseIn");
  } else {
    thisWord.isTouched = false;
    // console.log("mouseOut");
  }

  if (thisWord.isTouched) {
    thisWord.deltY =
      thisWord.deltY < textDeltaY ? (thisWord.deltY += 1) : textDeltaY;
  } else {
    thisWord.deltY = thisWord.deltY > 0 ? (thisWord.deltY -= 1) : 0;
  }

  text(thisWord.content, thisWord.pos.x, thisWord.pos.y - thisWord.deltY);
}
function drawStillText(thisWord) {
  text(thisWord.content, thisWord.pos.x, thisWord.pos.y - thisWord.deltY);
}
//春风送暖入屠苏
function drawCFSN() {
  textSize(wordSize);

  if (isBegin) {
    drawFlyText(textObjects[1][0]);
    drawFlyText(textObjects[1][1]);
    drawFlyText(textObjects[1][2]);
    drawFlyText(textObjects[1][3]);
  } else {
    drawStillText(textObjects[1][0]);
    drawStillText(textObjects[1][1]);
    drawStillText(textObjects[1][2]);
    drawStillText(textObjects[1][3]);
  }
}
function drawFlyText(thisWord) {
  let bounds = thisWord.bounds;
  let x, y;
  if (
    mouseX > bounds.x &&
    mouseX < bounds.x + bounds.w &&
    mouseY > bounds.y &&
    mouseY < bounds.y + bounds.h
  ) {
    thisWord.isTouched = true;
  }
  if (thisWord.isTouched) {
    thisWord.update();
  }
  text(thisWord.content, thisWord.pos.x, thisWord.pos.y);
}

function drawRTS() {
  drawRuAndBow();
  // drawRuAndGlass();
  drawTuSu();
}
function drawRuAndBow() {
  // noFill();//好奇怪的noFill（）竟然会影响strokeWeight
  stroke(255);
  strokeWeight(1.8);
  textSize(wordSize);

  if (isBegin) {
    drawJumpText(textObjects[1][4]);
  } else {
    drawStillText(textObjects[1][4]);
  }

  //generate bowPoints
  // if (textObjects[1][4].isTouched && !isBowGenerated) {
  //   img.resize(img.width * 1.2, img.height * 1.2);
  //   img.loadPixels();
  //   //createPhyParticle
  //   for (let y = 0; y < img.height; y += 1) {
  //     for (let x = 0; x < img.width; x += 1) {
  //       // 获取像素颜色
  //       let c = img.get(x, y);
  //       let r = red(c);
  //       let g = green(c);
  //       let b = blue(c);

  //       // 如果是黑色（阈值可调整），则保存该点
  //       if (r < 50 && g < 50 && b < 50) {
  //         bowPoints.push(createBowParticle(bowX + x, bowY + y));
  //       }
  //     }
  //   }

  //   isBowGenerated = true;
  //   for (let i = 0; i < bowPoints.length - 1; i++) {
  //     let constraint = Matter.Constraint.create({
  //       bodyA: bowPoints[i].body,
  //       bodyB: bowPoints[i + 1].body,
  //       stiffness: 0.9,
  //       length: 0.1,
  //     });
  //     Matter.World.add(world, constraint);
  //   }
  // }

  //display bowPoints
  // if (isBowGenerated) {
  //   for (let bowPoint of bowPoints) {
  //     bowPoint.bowDisplay();
  //   }
  // }
}
function drawRuAndGlass() {
  stroke(255);
  strokeWeight(1.8);
  drawJumpText(textObjects[1][4]);

  if (textObjects[1][4].isTouched && !isGlassGenerated) {
    isGlassGenerated = true;
    let leftSide = Matter.Bodies.rectangle(320, 380, 5, 200, {
      isStatic: true,
      angle: radians(60),
    });
    let rightSide = Matter.Bodies.rectangle(480, 380, 5, 200, {
      isStatic: true,
      angle: radians(-60),
    });
    let bottom = Matter.Bodies.rectangle(800, 500, 100, 4, {
      isStatic: true,
    });

    glass = Matter.Composite.create();
    Matter.Composite.add(glass, [leftSide, rightSide, bottom]);

    // 添加到世界
    Matter.World.add(world, glass);
  }

  if (isGlassGenerated) {
    console.log(glass);
    for (let body of glass.bodies) {
      noFill();
      stroke(255);
      let vertices = body.vertices;
      beginShape();
      for (let v of vertices) {
        vertex(v.x, v.y);
      }
      endShape(CLOSE);
    }
  }
}
function drawTuSu() {
  //set Tu Su wine free
  if (isBegin) {
    textObjects[1][5].updateIsTouched();
    textObjects[1][6].updateIsTouched();
  }
  // console.log(textObjects[1][5].isTouched, textObjects[1][6].isTouched);
  if (textObjects[1][5].isTouched) {
    for (let p of winePoints1) {
      let f = random(0.05);
      Matter.Body.set(p.body, { frictionAir: f });
      Matter.Body.setStatic(p.body, false); // 让物体变得动态
      Matter.Body.setMass(p.body, 0.001);
      p.body.inertia = Matter.Body._inertiaScale * p.body.mass * 1;
    }
  }
  if (textObjects[1][6].isTouched) {
    for (let p of winePoints2) {
      let f = random(0.05);
      Matter.Body.set(p.body, { frictionAir: f });
      Matter.Body.setStatic(p.body, false); // 让物体变得动态
      Matter.Body.setMass(p.body, 0.1);
      p.body.inertia = Matter.Body._inertiaScale * p.body.mass * 1;
    }
  }
  //display Tu Su wine
  for (let p of winePoints1) {
    p.wineDisplay();
  }
  for (let p of winePoints2) {
    p.wineDisplay();
  }
}
function createBowParticle(x, y) {
  let radius = bowPointD / 2;
  let particle = Matter.Bodies.circle(x, y, radius, {
    restitution: 0.8, // 弹性
    friction: 0.1, // 摩擦力
    density: 0.001, // 密度
    isStatic: true,
  });

  // 将实体添加到物理世界
  Matter.World.add(world, particle);

  return new phyParticle(particle);
}
function createWineParticle(x, y) {
  let radius = winePointD / 4;
  let particle = Matter.Bodies.circle(x, y, radius, {
    restitution: 0.4, // 弹性
    friction: 0.1, // 摩擦力
    density: 0.0001, // 密度
    isStatic: true,
  });

  // 将实体添加到物理世界
  Matter.World.add(world, particle);

  return new phyParticle(particle);
}
//千门万户曈曈日
function drawQMWH() {
  noFill();
  stroke(255);
  strokeWeight(0.8);
  textSize(wordSize);
  for (let i = 0; i < 7; i++) {
    textObjects[2][i].updateIsTouched;
    if (isBegin) drawJumpText(textObjects[2][i]);
    else drawStillText(textObjects[2][i]);
  }

  //draw doors
  if (isBegin) {
    if (textObjects[2][1].isTouched || isDoorAppeared) {
      for (let door of doors) {
        door.updateSize();
        door.updateAlpha();
        door.show();
      }
      isDoorAppeared = true;
    }
    //draw windows
    if (textObjects[2][3].isTouched || isWindowsAppeared) {
      for (let window of windows) {
        window.updateSize();
        window.updateAlpha();
        window.show();
      }
      isWindowsAppeared = true;
    }
  }
}
function drawTTR() {
  if (
    textObjects[2][4].isTouched ||
    textObjects[2][5].isTouched ||
    textObjects[2][6].isTouched
  ) {
    for (let door of doors) {
      door.updateColor();
    }
    for (let window of windows) {
      window.updateColor();
    }
  }
}
function getXY() {
  let x1 = textObjects[0][0].pos.x;
  let y1 = textObjects[0][0].pos.y - wordSize;
  let x2 = textObjects[3][6].pos.x + wordSize;
  let y2 = textObjects[3][6].pos.y;

  let px, py;
  do {
    px = random(0, width);
    py = random(0, height);
  } while (px >= x1 && px <= x2 && py >= y1 && py <= y2);

  return createVector(px, py);
}
//总把新桃换旧符
function drawZBXTHJF() {
  //draw normal words
  noFill();
  stroke(255);
  strokeWeight(0.8);
  textSize(wordSize);

  if (isBegin) {
    drawJumpText(textObjects[3][0]);
    drawJumpText(textObjects[3][1]);
    drawJumpText(textObjects[3][4]);

    //disappear men hu
    disAppearMH();
  } else {
    drawStillText(textObjects[3][0]);
    drawStillText(textObjects[3][1]);
    drawStillText(textObjects[3][4]);
  }

  //draw新桃 & 旧符
  drawXTJF();
}
function disAppearMH() {
  textObjects[3][0].updateIsTouched();
  textObjects[3][1].updateIsTouched();
  if (isDoorAppeared || isWindowsAppeared) {
    for (let door of doors) {
      door.updateAlpha();
    }
  }
  if (isWindowsAppeared) {
    for (let window of windows) {
      window.updateAlpha();
    }
  }
}
function drawXTJF() {
  textObjects[3][2].updateIsTouched();
  textObjects[3][3].updateIsTouched();
  console.log(`${textObjects[3][2].isTouched},${textObjects[3][3].isTouched}`);

  if (
    (textObjects[3][2].isTouched || textObjects[3][3].isTouched) &&
    touchTime < 9 &&
    isBegin
  ) {
    phyWords[0].move();
    phyWords[1].move();
    touchTime++;
  }
  for (let phyWord of phyWords) {
    phyWord.show();
  }
}
