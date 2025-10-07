let mic, fft, spectrum, minIndex, maxIndex;
let analyzeArr = [],
  maxE = 0,
  maxDeltE = 0;
const maxEThre = 20,
  maxDeltEThre = 10;
let flag = 0;
const poemStr = "晨对暮雪对霜和风对细雨朝霞对夕阳";
let poemArr = poemStr.split("");
let words = [];
const fSeletor = [
  [1],
  [],
  [2],
  [3],
  [],
  [4],
  [5],
  [],
  [],
  [6],
  [],
  [7],
  [8],
  [],
  [],
  [],
];
let imgs = [];
let imgStartLine, imgEndLine;
const range = 1;
let voiceLineHeight = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  imageMode(CENTER);
  //load images
  imgs.push(loadImage("./img/1.png"));
  imgs.push(loadImage("./img/qiu.jpeg"));
  imgs.push(loadImage("./img/3.png"));
  imgs.push(loadImage("./img/6.png"));
  imgs.push(loadImage("./img/qiu.jpeg"));
  imgs.push(loadImage("./img/4.png"));
  imgs.push(loadImage("./img/7.png"));
  imgs.push(loadImage("./img/8.png"));
  imgs.push(loadImage("./img/qiu.jpeg"));
  imgs.push(loadImage("./img/10.png"));
  imgs.push(loadImage("./img/11.png"));
  imgs.push(loadImage("./img/13.png"));
  imgs.push(loadImage("./img/12.png"));
  imgStartLine = 0;
  imgEndLine = height * 1.5;

  //create fft
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9, 8192);
  // fft = new p5.FFT(0.9, 512);
  fft.setInput(mic);
  spectrum = fft.analyze();
  for (let i = 0; i < floor(spectrum.length / range); i++) {
    voiceLineHeight.push(1);
  }

  let minFreq = 100;
  let maxFreq = 2000;
  minIndex = floor(map(minFreq, 0, 22050, 0, spectrum.length));
  maxIndex = floor(map(maxFreq, 0, 22050, 0, spectrum.length));

  //create analyzeArr
  for (let i = minIndex; i < maxIndex; i++) {
    let obj = {
      preE: 0,
      curE: 0,
      deltE: 0,
    };
    analyzeArr.push(obj);
  }

  //create Words
  for (let i = 0; i < poemArr.length; i++) {
    if (i < 6) {
      let word_i = i % 3;
      let deltD = random((word_i * width) / 6, ((word_i + 1) * width) / 6);
      let x = width / 4 + deltD;
      let y = -100 + random(20) - floor(i / 3) * height * 1.6;
      words.push(new word(`${poemArr[i]}`, x, y, fSeletor[i], imgs[i]));
    } else {
      let word_i = (i - 6) % 5;
      let deltD = random((word_i * width) / 10, ((word_i + 1) * width) / 10);
      let x = width / 4 + deltD;
      let y = -100 + random(20) - floor(2 + (i - 6) / 5) * height * 1.6;
      words.push(new word(`${poemArr[i]}`, x, y, fSeletor[i], imgs[i]));
    }
  }
}

function draw() {
  background(255);

  updateFlag();
  getFlag();

  words.forEach((word) => {
    if (word.pos.y > imgStartLine && word.pos.y < imgEndLine) {
      word.updateImage();
    }
    word.update();
  });
  words.forEach((word) => {
    word.show();
  });
}

class word {
  constructor(content, x, y, updateSelector, img) {
    this.content = content;
    this.pos = createVector(x, y);
    this.speedY = 1.5;
    this.selector = updateSelector;
    this.img = img;
  }

  update() {
    this.pos.y += this.speedY;
  }
  updateImage() {
    if (this.selector.includes(1)) {
      this.updateImage1();
    } else if (this.selector.includes(2)) {
      this.updateImage2();
    } else if (this.selector.includes(3)) {
      this.updateImage3();
    } else if (this.selector.includes(4)) {
      this.updateImage4();
    } else if (this.selector.includes(5)) {
      this.updateImage5();
    } else if (this.selector.includes(6)) {
      this.updateImage6();
    } else if (this.selector.includes(7)) {
      this.updateImage7();
    } else if (this.selector.includes(8)) {
      this.updateImage8();
    }
  }
  //scale from top left
  updateImage1() {
    imageMode(CORNER);
    let flagHere = flag <= 40 ? flag : 40;
    let imageSize = ((flagHere + 1) * (flagHere + 1)) / 2;
    image(
      this.img,
      0,
      0,
      imageSize,
      (imageSize * this.img.height) / this.img.width
    );
  }
  //scale from bottom right
  updateImage2() {
    imageMode(CORNERS);
    let flagHere = flag <= 40 ? flag : 40;
    let imageSize = ((flagHere + 1) * (flagHere + 1)) / 2;
    image(
      this.img,
      width - imageSize,
      height - (imageSize * this.img.height) / this.img.width,
      width,
      height
    );
  }
  //chagne opacity
  updateImage3() {
    imageMode(CENTER);
    let imageSize = width * 1.3;
    let alpha = flag * 5 < 155 ? flag * 5 : 155;
    tint(255, 255, 255, alpha);
    image(
      this.img,
      width / 2,
      height / 2,
      imageSize,
      (imageSize * this.img.height) / this.img.width
    );
    noTint();
  }
  //multiple imgs, rotate,
  updateImage4() {
    imageMode(CENTER);
    for (let i = 0; i < 100; i++) {
      let x = noise(i, 0) * width * 2 - width / 2;
      let y = noise(i, 1) * height - height * 0.8;
      let size = noise(i, 2) * 5;
      let r = noise(i, 3);
      push();
      translate(x, y + this.pos.y);
      scale(size);
      rotate(flag * 0.1 * r);
      image(this.img, 0, 0, 30, 30);
      pop();
    }
  }
  //leaves effect
  updateImage5() {
    imageMode(CENTER);
    let iMax = flag * 3 > 10 ? flag * 3 : 10;
    for (let i = 0; i < iMax; i++) {
      let rotateR = noise(i, -1) * 100 + 50;
      let size = noise(i, 2) * 6;
      let x = noise(i, 0) * width * 2 - width / 2;
      let y = noise(i, 1) * height - height * 0.8;

      push();
      translate(x, y + this.pos.y);
      scale(size);
      rotate(cos(this.pos.y / 150));
      image(this.img, 0, rotateR, 10, (10 * this.img.height) / this.img.width);
      pop();
    }
  }
  //drizzle effect
  updateImage6() {
    imageMode(CENTER);
    let iMax = flag / 5 > 3 ? floor(flag / 5) : 3;
    for (let i = 0; i < iMax; i++) {
      let x = noise(i, 0) * width * 2 - width / 2;
      let y = noise(i, 1) * height - height * 0.8;
      let x1 =
        x - this.pos.y < -100 ? x - this.pos.y + width + 200 : x - this.pos.y;
      let y1 =
        y + this.pos.y > height + 100
          ? y + this.pos.y - height - 200
          : y + this.pos.y;
      push();
      translate(x1, y1);
      image(this.img, 0, 0, 800, (800 * this.img.height) / this.img.width);
      pop();
    }
  }
  //draw the sun
  updateImage7() {
    imageMode(CENTER);
    let theta1 = map(flag, 0, 50, -Math.PI / 6, Math.PI / 6);
    let theta = map(this.pos.y, 0, height, -Math.PI / 2, Math.PI / 2);
    push();
    translate(width / 2, this.pos.y + 200);
    rotate(theta1);
    image(this.img, 0, -700, 100, (100 * this.img.height) / this.img.width);
    pop();
  }
  //draw the mountain
  updateImage8() {
    imageMode(CENTER);
    push();
    translate(width / 2, this.pos.y);
    scale(1);
    image(
      this.img,
      0,
      0 - this.img.height / 2,
      width,
      (width * this.img.height) / this.img.width
    );
    pop();
  }

  //show the text
  show() {
    noStroke();
    fill(0);
    textSize(32);
    text(`${this.content}`, this.pos.x, this.pos.y);
  }
}
function updateFlag() {
  words.forEach((word) => {
    if (word.pos.y >= -2 && word.pos.y < 0) {
      flag = 0;
    }
  });
}
function getFlag() {
  spectrum = fft.analyze();

  //update analyzeArr
  for (let i = 0; i < maxIndex - minIndex; i++) {
    analyzeArr[i].curE = spectrum[i];
    analyzeArr[i].deltE = analyzeArr[i].curE - analyzeArr[i].preE;
    analyzeArr[i].preE = analyzeArr[i].curE;

    if (analyzeArr[i].curE > maxE) {
      maxE = analyzeArr[i].curE;
    }
    if (analyzeArr[i].deltE > maxDeltE) {
      maxDeltE = analyzeArr[i].deltE;
    }
  }

  //check if saying a word
  if (
    maxE > maxEThre &&
    (maxDeltE > maxDeltEThre || maxDeltE < -maxDeltEThre)
  ) {
    flag++;
    console.log("Detected new syllable, flag:", flag);
  }

  maxE = 0;
  maxDeltE = 0;

  // 绘制频谱图
  // drawVoiceLine();
  drawVoiceLine1();
  // noStroke();
  // fill(0);
  // for (let i = minIndex; i < maxIndex; i++) {
  //   let x = map(i, minIndex, maxIndex, 0, width);
  //   let h = map(spectrum[i], 0, 255, 0, height);
  //   rect(x, height - h, width / (maxIndex - minIndex), h);
  // }

  console.log(`Flag: ${flag}`);
}

function drawVoiceLine() {
  //update voiceLine
  let voiceLineN = floor(spectrum.length / range);
  for (let i = 0; i < voiceLineN; i++) {
    let sum = 0;
    for (let j = i * range; j < i * range + 5; j++) {
      sum += spectrum[j];
    }
    voiceLineHeight[i] = sum / 5;
  }
  console.log(voiceLineHeight);
  //draw voiceLine
  stroke(0, 0, 255);
  strokeWeight(2);
  noFill();
  let step = width / (voiceLineHeight.length - 1);
  beginShape();
  curveVertex(0, height - voiceLineHeight[0]);
  for (let i = 0; i < voiceLineHeight.length; i++) {
    let x = i * step;
    let y = height - voiceLineHeight[i];
    curveVertex(x, y);
  }
  curveVertex(width, height - voiceLineHeight[voiceLineHeight.length - 1]); // 结束控制点
  endShape();
}
function drawVoiceLine1() {
  stroke(100, 100, 100, 100);
  strokeWeight(2);
  noFill();
  let step = (width + 100) / 50;
  beginShape();
  curveVertex(0, height - spectrum[minIndex - 50]);
  for (let i = 0; i < 50; i++) {
    let x = -30 + i * step;
    let i1 = floor((maxIndex - (minIndex - 50)) / 50) * i + minIndex;
    let y = height - spectrum[i1] * 1.5 - height / 2;
    curveVertex(x, y);
  }
  curveVertex(width + 50, height - spectrum[maxIndex]); // 结束控制点
  endShape();
}
window.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault(); // 阻止默认保存行为
    console.log("Save shortcut prevented!"); // 你可以在这里添加自定义保存逻辑
  }
});
