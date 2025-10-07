//salute to 王阿肃
//code by Vanilla 2025/1/14
//----- Let life be beautiful like summer flowers
//----- and death like autumn leaves

const { Engine, Runner, Bodies, Composite, Constraint, World } = Matter;

const floatLetter = [];
const spinWords = [];
const dropWords = [];
const matterWords = [
  "a",
  "u",
  "t",
  "u",
  "m",
  "n",
  " ",
  " ",
  " ",
  "l",
  "e",
  "a",
  "v",
  "e",
  "s",
];
let opacity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const size = 12;
let engine, world, ground;
let boxes = [];
let anchor = {
  x: 250,
  y: 100,
};

let clicked = 0;
let activeState = [false, false, false];

/////////////////////////////////////
function setup() {
  // createCanvas(370, 470);
  const canvas = createCanvas(370, 520);
  canvas.parent("my-canvas-container");
  createWorld();

  createFloatLetters();
  createSpinWords();
  createDropWords();
  createMatterLetters();
  noCursor();
}

function draw() {
  background(0);

  updateLetters();
  updateAndDrawMatterLetters();
  // drawOthers();

  drawFloatLetters();
  drawSpinLetters();
  drawDropLetters();
}
/////////////////////////////////////

function createFloatLetters() {
  class letterObject {
    constructor(l, x, y) {
      this.content = l;
      this.x = x;
      this.y = y;
      this.x0 = x;
      this.y0 = y;

      this.heart = floor(random(1, 50));
    }
  }
  floatLetter.push(new letterObject("L", 30, 50));
  floatLetter.push(new letterObject("e", 40, 50));
  floatLetter.push(new letterObject("t", 50, 60));
  floatLetter.push(new letterObject("l", 70, 130));
  floatLetter.push(new letterObject("i", 80, 130));
  floatLetter.push(new letterObject("f", 90, 130));
  floatLetter.push(new letterObject("e", 100, 130));
  floatLetter.push(new letterObject("b", 120, 100));
  floatLetter.push(new letterObject("e", 130, 100));
}
function createSpinWords() {
  const spinSentence = ["beautiful", "like", "summer", "flowers"];
  spinSentence.forEach((element, index) => {
    const obj = createSpinWord(element, index);
    spinWords.push(obj);
  });
}
function createSpinWord(string, index) {
  let d, angle;
  let obj = {
    d: 0,
    l: string.length,
    a: 0,
    a0: 0,
    letters: [],
  };
  switch (index) {
    case 0:
      d = 25;
      angle = (100 * Math.PI) / 180;
      break;
    case 1:
      d = 45;
      angle = -(30 * Math.PI) / 180;
      break;
    case 2:
      d = 60;
      angle = (20 * Math.PI) / 180;
      break;
    case 3:
      d = 80;
      angle = (22 * Math.PI) / 180;
      break;
    default:
  }
  obj.d = d;
  obj.a = angle;
  obj.a0 = angle;

  for (let i = 0; i < string.length; i++) {
    let letterObj = {
      content: string[i],
      angle: -(0 + (30 / (index + 1) + index) * i) * (Math.PI / 180),
    };
    obj.letters.push(letterObj);
  }

  return obj;
}
function createDropWords() {
  const dropSentence = ["and", "death", "like"];
  dropSentence.forEach((element, index) => {
    const obj = createDropWord(element, index);
    dropWords.push(obj);
  });
}
function createDropWord(string, index) {
  let d, angle;
  let obj = {
    dropV: 0,
    dropA: 0,
    t: 12,
    x: 250,
    y: 100,
    d: 0,
    l: string.length,
    a: 0,
    a0: 0,
    letters: [],
  };
  switch (index) {
    case 0:
      d = 200;
      angle = (35 * Math.PI) / 180;
      break;
    case 1:
      d = 240;
      angle = -(20 * Math.PI) / 180;
      break;
    case 2:
      d = 280;
      angle = (40 * Math.PI) / 180;
      break;
    default:
  }
  obj.d = d;
  obj.a = angle;
  obj.a0 = angle;
  obj.dropV = 0.00875 * obj.a;
  obj.dropA = (0.000000675 * obj.a * 180) / Math.PI;

  for (let i = 0; i < string.length; i++) {
    let letterObj = {
      content: string[i],
      angle: -((obj.t / obj.d) * 0.8 * i),
    };
    obj.letters.push(letterObj);
  }

  return obj;
}
function createWorld() {
  engine = Engine.create();
  world = engine.world;

  ground = Bodies.rectangle(width / 2, height, width, 60, {
    isStatic: true,
  });
  Composite.add(world, ground);

  let runner = Runner.create();
  Runner.run(runner, engine);
}
function createMatterLetters() {
  for (let i = 0; i < 15; i++) {
    let x;
    let divide = 9;
    i < divide ? (x = 175) : (x = 182);
    // i < 6 ? (f = 200) : (x = 250);

    let delt;
    if (i < 9) {
      delt = i % divide;
    } else {
      delt = (i % divide) + 3;
    }
    let box = Bodies.rectangle(
      x + (i % divide) * 1,
      x + (i % divide) * 5,
      size - 2,
      size - 2,
      {
        restitution: 0.6, // 弹性
        friction: 0.01, // 摩擦力
        frictionAir: 0.1,
        angle: ((45 - delt * 3) * Math.PI) / 180,
      }
    );

    let l;
    i < divide ? (l = 320) : (l = 332);

    let constraint = Constraint.create({
      pointA: anchor, // 锚点位置
      bodyB: box, // 被约束的物体
      pointB: { x: 0, y: 0 }, // 连接点相对物体的偏移
      stiffness: 0.9, // 绳索的硬度（越高越硬）
      length: l, // 绳索长度
    });

    Composite.add(world, constraint);
    Composite.add(world, box);
    boxes.push(box);
  }
}

function updateLetters() {
  //update of the floatLetters
  floatLetter.forEach((e) => {
    e.x = e.x0 + 5 * cos(frameCount / 60 + e.heart);
    e.y = e.y0 + 5 * sin(frameCount / 50 + e.heart);
  });

  //update of the spinLetters
  spinWords.forEach((spinWord) => {
    spinWord.a =
      spinWord.a0 * sin(0.03 * (frameCount + spinWord.d)) * spinWord.d * 0.03;
  });

  //update of the dropLetters

  if (clicked == 8) {
    activeState[0] = true;
  } else if (clicked == 9) {
    activeState[1] = true;
  } else if (clicked == 10) {
    activeState[2] = true;
  } else;

  for (let i = 0; i < 3; i++) {
    if (activeState[i]) {
      dropWords[i].a -= dropWords[i].dropV;
      Math.abs(dropWords[i].dropV) > Math.abs(dropWords[i].dropA)
        ? (dropWords[i].dropV -= dropWords[i].dropA)
        : (dropWords[i].dropV = 0);
      // dropV for 'and' = 1 * (Math.PI / 180) * 0.35;
      // dropA for 'and' = 0.000027;
    }
  }

  //update of the opacity
  for (let i = 0; i < opacity.length; i++) {
    if (clicked >= i + 1) {
      opacity[i] = min(++opacity[i], 255);
    }
  }
}
function updateAndDrawMatterLetters() {
  if (clicked < 11) {
    for (let box of boxes) {
      box.isStatic = true;
    }
  } else if (clicked == 11) {
    for (let box of boxes) {
      box.isStatic = false;
    }
  } else if (clicked == 12) {
    for (let constraint of world.constraints) {
      World.remove(world, constraint); // 移除目标约束
    }
    engine.gravity.y = 0.2;
  } else;

  rectMode(CENTER);
  boxes.forEach((box, index) => {
    push();
    translate(box.position.x, box.position.y);
    rotate(box.angle); // 旋转矩形
    rectMode(CENTER);
    noFill();
    noStroke();
    // stroke(255);
    rect(0, 0, size - 2, size - 2); // 绘制每个矩形

    textAlign(CENTER, CENTER);
    textSize(size);
    textStyle(NORMAL);
    fill(70, 204, 212, opacity[10]);
    let i = index;
    text(matterWords[i], 0, 0);
    pop();
  });
}
function drawOthers() {
  stroke(255);
  boxes.forEach((box) => {
    line(anchor.x, anchor.y, box.position.x, box.position.y);
  });

  fill(0, 255, 0); // 设置颜色为绿色
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 20); // 绘制地面
}
function drawFloatLetters() {
  floatLetter.forEach((element, index) => {
    textSize(13);
    textStyle(NORMAL);
    if (index < 3) fill(242, 169, 85, opacity[0]);
    else if (3 <= index && index < 7) fill(242, 169, 85, opacity[1]);
    else if (7 <= index) fill(242, 169, 85, opacity[2]);
    else;

    text(`${element.content}`, element.x, element.y);
  });
}
function drawSpinLetters() {
  spinWords.forEach((spinWord) => {
    //draw every spin word
    for (let i = 0; i < spinWord.letters.length; i++) {
      let element = spinWord.letters[i];
      textSize(13);
      textStyle(NORMAL);
      if (spinWord.letters.length == 9) fill(242, 158, 85, opacity[3]);
      else if (spinWord.letters.length == 4) fill(242, 135, 85, opacity[4]);
      else if (spinWord.letters.length == 6) fill(247, 94, 52, opacity[5]);
      else if (spinWord.letters.length == 7) fill(250, 42, 42, opacity[6]);
      push();
      translate(160, 160);
      rotate(spinWord.a + element.angle);
      // console.log(spinWord.angle);

      text(`${element.content}`, 0, spinWord.d);
      pop();
    }
  });
}
function drawDropLetters() {
  dropWords.forEach((dropWord) => {
    //draw every spin word
    for (let i = 0; i < dropWord.letters.length; i++) {
      let element = dropWord.letters[i];
      textSize(dropWord.t);
      textStyle(NORMAL);
      if (dropWord.letters.length == 3) fill(108, 71, 209, opacity[7]);
      else if (dropWord.letters.length == 5) fill(80, 113, 235, opacity[8]);
      else if (dropWord.letters.length == 4) fill(80, 168, 235, opacity[9]);

      push();
      translate(dropWord.x, dropWord.y);
      rotate(dropWord.a + element.angle);
      // console.log(spinWord.angle);

      text(`${element.content}`, 0, dropWord.d);
      pop();
    }
  });
}

function mouseClicked() {
  clicked++;
}
