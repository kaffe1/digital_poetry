let phase = 1,
  sunCue = false,
  mountainCue = false,
  fogCue = false,
  farViewCue = false,
  waterfallCue = false,
  waterfallDropCue = false,
  isTextDropAllowed = false,
  textDropCue = false,
  resizeTime = 0;
let scaling,
  w,
  h,
  shrinkSpeed = 10;
let colorBeforeSun = "#69666e";
let colorAfterSun = "#f5eed7";
let canvas;
let waterfallGif, waterfallPic;
const dropHeight = 4500;

//interaction with the text----------------------
const words = document.querySelectorAll(".word"); // 获取所有字
const dropWords = document.querySelectorAll(".dropWord");
const cueWords = document.querySelector(".cueWords");
const milkyWay = document.querySelector(".milky-way");
const backgroundPic = document.querySelector(".background");

words.forEach((word) => {
  word.addEventListener("mouseenter", () => {
    //words jump || star jump------
    if (!textDropCue) {
      word.style.transition = "transform 0.5s ease, opacity 3s ease";
      word.style.transform = "translateY(-10px)";
    } else {
      if (isTextDropAllowed) {
        if (word.innerHTML == "疑") {
          word.style.transform = `translate(50px,${dropHeight - 30}px)`;
        } else if (word.innerHTML == "是") {
          word.style.transform = `translate(260px,${dropHeight - 80}px)`;
        } else if (word.innerHTML == "银") {
          word.style.transform = `translate(370px,${dropHeight - 40}px)`;
        } else if (word.innerHTML == "河") {
          word.style.transform = `translate(520px,${dropHeight + 20}px)`;
        } else if (word.innerHTML == "落") {
          word.style.transform = `translate(610px,${dropHeight + 190}px)`;
        } else if (word.innerHTML == "九") {
          word.style.transform = `translate(840px,${dropHeight + 130}px)`;
        } else if (word.innerHTML == "天") {
          word.style.transform = `translate(850px,${dropHeight - 80}px)`;
        } else;
      }
    }

    //about cues------
    if (word.innerHTML == "日" || word.innerHTML == "照") {
      sunCue = true;
    }
    if (word.innerHTML == "香" || word.innerHTML == "炉") {
      mountainCue = true;
    }
    if (
      word.innerHTML == "生" ||
      word.innerHTML == "紫" ||
      word.innerHTML == "烟"
    ) {
      fogCue = true;
    }
    if (word.innerHTML == "遥" || word.innerHTML == "看") {
      farViewCue = true;
      //test
      // phase = 2;
    }
    if (
      word.innerHTML == "瀑" ||
      word.innerHTML == "布" ||
      word.innerHTML == "挂" ||
      word.innerHTML == "前" ||
      word.innerHTML == "川"
    ) {
      waterfallCue = true;
    }
    if (
      word.innerHTML == "飞" ||
      word.innerHTML == "流" ||
      word.innerHTML == "直" ||
      word.innerHTML == "下"
    ) {
      waterfallDropCue = true;
    }
    if (
      (word.innerHTML == "三" ||
        word.innerHTML == "千" ||
        word.innerHTML == "尺") &&
      phase == 2
    ) {
      // textDropCue = true;
    }
  });

  word.addEventListener("mouseleave", () => {
    //words translateY------
    if (!textDropCue) {
      word.style.transform = "translateY(0)";
    }

    // cues------
    // word.style.color = "black";
    if (word.innerHTML == "日" || word.innerHTML == "照") {
      sunCue = false;
    }
    if (word.innerHTML == "香" || word.innerHTML == "炉") {
      mountainCue = false;
    }
    if (
      word.innerHTML == "生" ||
      word.innerHTML == "紫" ||
      word.innerHTML == "烟"
    ) {
      fogCue = false;
    }
    if (word.innerHTML == "遥" || word.innerHTML == "看") {
      farViewCue = false;
    }
    if (
      word.innerHTML == "瀑" ||
      word.innerHTML == "布" ||
      word.innerHTML == "挂" ||
      word.innerHTML == "前" ||
      word.innerHTML == "川"
    ) {
      waterfallCue = false;
    }
    if (
      word.innerHTML == "飞" ||
      word.innerHTML == "流" ||
      word.innerHTML == "直" ||
      word.innerHTML == "下"
    ) {
      waterfallDropCue = false;
    }
  });
});

dropWords.forEach((dropWord) => {
  if (
    dropWord.innerHTML == "三" ||
    dropWord.innerHTML == "千" ||
    dropWord.innerHTML == "尺"
  ) {
    dropWord.addEventListener("mouseenter", wordsDrop);
  }
});

function wordsDrop() {
  if (isTextDropAllowed) {
    dropWords.forEach((dropWord) => {
      dropWord.style.transition =
        "transform 3s ease, opacity 3s ease, color 3s ease";
      //drop 三千尺
      textDropCue = true;
      dropWord.style.transform = `translateY(${dropHeight + 400}px)`;
      dropWord.style.color = "white";
      backgroundPic.style.display = "block";
      milkyWay.style.display = "block";
      dropLine();
      //make 三千尺 opacity 0
      if (
        dropWord.innerHTML == "三" ||
        dropWord.innerHTML == "千" ||
        dropWord.innerHTML == "尺"
      ) {
        dropWord.style.opacity = 0;
        dropWord.removeEventListener("mouseenter", wordsDrop);
      }
    });
  }
}
function dropLine() {
  const firstDropWord = document.querySelector(".dropWord");
  const dropLine1 = document.querySelector(".dropline1-div");
  const dropLine2 = document.querySelector(".dropline2-div");

  const rect = firstDropWord.getBoundingClientRect();
  const dropWordTop = rect.top + window.scrollY;

  const rectDorpLine1 = dropLine1.getBoundingClientRect();
  const dropLine1Top = rectDorpLine1.top + window.scrollY;
  const rectDorpLine2 = dropLine2.getBoundingClientRect();
  const dropLine2Top = rectDorpLine2.top + window.scrollY;
  dropLine1.style.height = `${dropWordTop - dropLine1Top}px`;
  dropLine2.style.height = `${dropWordTop - dropLine2Top}px`;

  console.log(dropWordTop);

  if (dropWordTop < 3000) requestAnimationFrame(dropLine);
}

//P5.js----------------------------------------------setup()
function preload() {
  waterfallGif = loadImage("./assets/waterfall.gif");
  waterfallPic = loadImage("./assets/waterfall.png");
}
function setup() {
  //canvas setting
  w = 850;
  h = 850;
  scaling = 1;
  pixelDensity(1);
  let canvas = createCanvas(w, h);
  canvas.parent("canvasContainer");
  // background("#4e4963");
  canvas.background("#4e4963");
  // canvas.position(400, 0);

  //canvas drawing setting
  colorMode(HSB); //以后要考虑清楚，HSB有点麻烦
  noStroke();
  drawingContext.shadowColor = colorBeforeSun;
  drawingContext.shadowBlur = 250;
  //general
  frameRate(60);
  angleMode(DEGREES);

  //objects creating
  for (let i = 0; i < fogN; i++) {
    fogs[i] = new fog(i);
  }
  fogN = 0;
  gravity = createVector(0, 0.04);

  //gif setting
  gifCenterX = w / 2 - 40;
  gifCenterY = h / 2;
  hwRatio = waterfallGif.height / waterfallGif.width;
  gifWidth = 100;
}
//draw parameters--------------------
let sunA = 0;
let mountainA = 20;
let backgroundLerp = 0;
let t;
let fogs = [];
let fogN = 100,
  fogA = 0;
let maskA = 0,
  waterPicA = 0,
  waterGifA = 0;
let gifCenterX, gifCenterY, hwRatio, gifWidth, gifHeight;
//P5.js----------------------------------------------draw()
function draw() {
  //   resize();
  if (phase == 1) {
    drawBackground();
    drawSun();
    drawMountain();
    drawFog();
    drawMask();
  } else if (phase == 2) {
    // drawWaterfall();
    drawStillWaterfall();
  }
}
//--------------------------classes
class fog {
  constructor(i) {
    this.position = createVector(random(0, width), random(height / 3, height));
    this.fogD = random(2, 150);
    this.fogA = 0;
    this.wx = random(0.5, 1);
    this.wy = random(0.5, 1);
  }
}
class Drop {
  constructor(loc) {
    this.loc = loc; // 位置
    this.stop = height - random(0, 50); // 停止位置
    this.vel = createVector(sin(radians(random(-90, 90))) / 5, 0); // 初始速度
    this.acc = createVector(0, 0); // 加速度
    this.d = random(1, 6); // 水滴大小
  }

  draw() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0); // 重置加速度
    ellipse(this.loc.x, this.loc.y, this.d, this.d); // 绘制水滴
  }

  applyForce(force) {
    let f = p5.Vector.div(force, 1.5 - this.d / 5); // 根据水滴大小调整力
    this.acc.add(f);
  }
}
//--------------------------functions
function drawBackground() {
  if (sunCue) {
    backgroundLerp += 0.005;
  }
  colorMode(RGB);
  let c = lerpColor(color(105, 102, 110), color(235, 228, 225), backgroundLerp);
  background(c);
  colorMode(HSB);
  drawingContext.shadowColor = c;
}
function drawSun() {
  if (sunCue) {
    sunA += 0.005;
  }
  fill(0, 255, 255, sunA);
  circle(w / 3, 200, 100);
}
function drawMountain() {
  for (let y = 300 * scaling; y <= h + 100 * scaling; y += 100 * scaling) {
    let ynoise = y * 0.02;
    let ymin = 100;
    let xstep = 0.005;

    if (mountainCue) {
      mountainA < 40 ? (mountainA += 0.03) : (mountainA = 40);
    }
    fill(260, y / 20, mountainA);

    beginShape();
    vertex(0, y);
    noiseSeed(123987);
    for (let x = 0; x <= w + 1; x += 2) {
      let y2 = ymin + (y - ymin) * noise(x * xstep, ynoise);
      vertex(x, y2 + 40);
    }
    vertex(w, y);
    endShape();
  }
  // Add some fog at the bottom.
  drawingContext.shadowBlur = 6000 * scaling;
  rect(-200 * scaling, h, w + 400 * scaling, 500 * scaling);
}
function drawFog() {
  if (fogCue) {
    fogN < 100 ? fogN++ : (fogN = 100);
    for (let i = 0; i < fogN; i++) {
      fogs[i].fogA < 0.1 ? (fogs[i].fogA += 0.002) : (fogs[i].fogA = 0.1);
    }
  }
  t = frameCount * 2;
  noStroke();

  for (let i = 0; i < fogN; i++) {
    let w = fogs[i].wx;
    let e = fogs[i].wy;
    // colorMode(RGB);
    // fill(255, 255, 255, fogs[i].fogA);
    // colorMode(HSB);

    fill(0, 0, 100, fogs[i].fogA);
    circle(
      fogs[i].position.x + 10 * cos(w * t),
      fogs[i].position.y + 10 * sin(e * t),
      fogs[i].fogD
    );
  }
}
function drawMask() {
  if (farViewCue && fogN > 50) {
    maskA = maskA < 1 ? maskA + 0.03 : maskA;
  }

  fill(0, 0, 255, maskA);
  rect(0, 0, w, h);
  if (maskA >= 1) {
    // colorMode(RGB);
    phase = 2;
    isTextDropAllowed = true;
  }
}
function drawStillWaterfall() {
  drawingContext.shadowColor = "rgba(0, 0, 0, 0)";
  drawingContext.shadowBlur = 0;
  let x = gifCenterX - gifWidth / 2;
  let y = gifCenterY - gifHeight / 2;
  gifHeight = gifWidth * hwRatio;

  fill(0, 0, 100);
  rect(0, 0, w, h);
  tint(255, waterPicA);

  if (waterPicA < 0.1) {
    waterPicA += 0.001; // 调整这个值来改变淡出的速度
  }
  if (waterfallCue) {
    gifWidth < w - 250 ? (gifWidth += 1.2) : (gifWidth = w - 250);
    waterPicA < 1 ? (waterPicA += 0.003) : (waterPicA = 1);
  }

  image(waterfallPic, x, y, gifWidth, gifHeight);

  if (waterfallDropCue) {
    waterGifA < 1 ? (waterGifA += 0.002) : (waterGifA = 1);
  }
  tint(255, waterGifA);
  image(waterfallGif, x, y, gifWidth, gifHeight);
}
