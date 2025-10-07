const H0 = 1248;
const sceneWidth = 790;

//for developing++++++++++
//mouse coordinator
// {
//   const coords = document.getElementById("mouseCoords");
//   document.addEventListener("mousemove", (event) => {
//     const mouseY = event.clientY + window.scrollY; // 加上垂直滚动距离
//     const mouseX = event.clientX + window.scrollX; // 加上水平滚动距离
//     let mouseYdisplay =
//       event.clientY +
//       window.scrollY -
//       (H0 + (currentScene - 1) * window.innerHeight); // 加上垂直滚动距离
//     let mouseXdisplay =
//       event.clientX + window.scrollX - 0.382 * window.innerWidth; // 加上水平滚动距离

//     // mouseYdisplay = window.innerHeight - mouseYdisplay;
//     mouseYdisplay = Math.round(mouseYdisplay * 10) / 10;
//     mouseXdisplay = Math.round(mouseXdisplay * 10) / 10;
//     coords.textContent = `X: ${mouseXdisplay}, Y: ${mouseYdisplay}`;

//     coords.style.left = `${mouseX + 10}px`; // 右侧偏移 10px
//     coords.style.top = `${mouseY - 25}px`; // 下方偏移 10px
//   });
// }
//for developing++++++++++

//general setting—————————————————————————————————————————————————————————————————————
const lPoemLines = document.querySelectorAll(".poem-afterl");
const boxes = document.querySelectorAll(".box");
const arrows = document.querySelectorAll(".arrow");
let currentScene = 1;
arrows.forEach((arrow) => {
  arrow.setAttribute("draggable", "false");
});
//scroll events———————
window.history.scrollRestoration = "manual";
window.addEventListener("load", () => {
  window.scrollTo(0, H0);
});
//for developing and testing++++++++++
// const developingScene = 5;
// window.addEventListener("load", () => {
//   window.scrollTo(0, H0 + window.innerHeight * (developingScene - 1));
// });
//for developing and testing++++++++++

//create cue-btn control—————————————————————————————————————————————————————————————————————
//lineCue--lineCueBtn———————
const lineCueBtns = document.querySelectorAll(".line-cue");
let lineCues = [];
lineCueBtns.forEach((lineCueBtn, index) => {
  lineCueBtn.addEventListener("click", () => {
    lineCues[index] = true;
  });
});

//arrowCue--arrowCueBtn———————
const arrowCueBtns = document.querySelectorAll(".arrow-cue");
let arrowCues = [];
arrowCueBtns.forEach((arrowCueBtn, index) => {
  arrowCueBtn.addEventListener("click", () => {
    arrowCues[index] = true;
  });
});

//scrollCue--scrollBtn———————
const scrollBtn = document.querySelector(".scroll-cue");
const n0R = document.querySelector(".n0-r");
const n0H = document.querySelector(".n0-h");
let scrollCue = false;
scrollBtn.addEventListener("click", () => {
  scrollCue = true;
});

//resetCue--resetBtn———————
const resetBtns = document.querySelectorAll(".reset-cue");
let resetCues = [];
resetBtns.forEach((resetBtn, index) => {
  resetBtn.addEventListener("click", () => {
    resetCues[index] = true;
  });
});

//tip————————————————————————————————————————————————————————————————————————
const tipBtn = document.querySelector(".tip-btn");
const tipBg = document.querySelector(".tip-bg");
const tipContents = document.querySelectorAll(".tip-scene");
let isTipBtnClicked = false;

tipBtn.addEventListener("click", () => {
  tipContents[currentScene - 1].style.display = "block";
  tipBg.style.display = "block";
  isTipBtnClicked = true;
});
tipBg.addEventListener("click", () => {
  if (isTipBtnClicked) {
    tipContents.forEach((tipContent) => {
      tipContent.style.display = "none";
    });
    tipBg.style.display = "none";
    isTipBtnClicked = false;
  }
});

//scene-0————————————————————————————————————————————————————————————————————
//———————————————————————————————————————————————————————————————————————————
//scroll to n0-h
window.addEventListener("scroll", function () {
  const currentScrollY = window.scrollY;
  if (currentScrollY >= window.innerHeight * 5 + H0) {
    window.scrollTo(0, 0);
    isScrolledBack = true;
  }
});

//scene-1————————————————————————————————————————————————————————————————————
//———————————————————————————————————————————————————————————————————————————
//reset——————————
function resetScene1() {
  //line
  for (let i = 0; i <= 2; i++) {
    lineCues[i] = false;
  }
  //arrow
  arrowCues[0] = false;

  //scene
  blocks.length = 0;
  Matter.World.clear(world, false);
  createTextBlocks();
}
//lineCues[0]
//don't delete , will use later
const scene1Canvas = document.getElementById("scene1-canvas");
const scene1 = document.querySelector(".scene1");
scene1.addEventListener("mouseover", () => {
  lineCues[0] = true;
});

// use matter.js——————————
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
} = Matter;

// 创建 Matter.js 引擎————————
const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 0;

// 创建渲染器————————
const render = Render.create({
  //   element: document.querySelector(".scen1"),
  engine: engine,
  canvas: document.getElementById("scene1-canvas"),
  options: {
    width: sceneWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "rgba(255, 255, 255, 0)",
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// 创建文字方块——————————————world-text
const createTextBlock = (x, y, text) => {
  const block = Bodies.rectangle(x, y, 30, 30, {
    restitution: 0.2,
    frictionAir: 0.06,
    render: {
      fillStyle: "rgba(255, 255, 255, 0)",
      strokeStyle: "rgba(0, 0, 0, 0)", // 半透明黑色边框
      lineWidth: 0.5, // 边框的宽度
    },
  });
  block.label = text;
  return block;
};

const blocks = [];
const text = document.querySelector(".poem-xxd").textContent.trim();
const textStr = Array.from(text);
console.log(textStr);
function createTextBlocks() {
  const randomTextN = 50;
  for (let i = 0; i < randomTextN; i++) {
    const text = textStr[Math.floor(Math.random() * textStr.length)];
    const tx = sceneWidth / 2 + 200 * (2 * Math.random() - 1);
    const ty = window.innerHeight / 2 + 60 * (2 * Math.random() - 1);
    blocks.push(createTextBlock(tx, ty, text));
  }
  Composite.add(world, blocks);
}
createTextBlocks();

// 动态绘制文字————————
render.context.font = "30px fangSong";
(function drawText() {
  requestAnimationFrame(drawText);
  for (const block of blocks) {
    const { position, angle, label } = block;
    render.context.save();
    render.context.translate(position.x + 3, position.y + 5);
    render.context.rotate(angle);
    render.context.fillStyle = "rgb(0, 0, 0)";
    render.context.textAlign = "center";
    render.context.fillText(label, 0, 5);
    render.context.restore();
  }
})();
// 鼠标控制——————————————world-mouseConstraint
let mousePos = { x: 0, y: 0 };
document.addEventListener("mousemove", function (event) {
  const rect = scene1Canvas.getBoundingClientRect();
  // 获取鼠标的实时位置
  mousePos.x = event.clientX + window.scrollX - rect.left;
  mousePos.y = event.clientY + window.scrollY - H0;
  //   console.log(mousePos);
});

// 添加排斥力————————

const repulseForce = (block, mousePos) => {
  const distance = Matter.Vector.magnitude(
    Matter.Vector.sub(block.position, mousePos)
  );
  const repulsionDistance = 20; // 距离越近，力越强

  if (distance < repulsionDistance && !isTipBtnClicked) {
    const forceMagnitude =
      0.001 * (repulsionDistance - distance) > 0.008
        ? 0.008
        : 0.001 * (repulsionDistance - distance);
    const force = Matter.Vector.normalise(
      Matter.Vector.sub(block.position, mousePos)
    );
    Matter.Body.applyForce(
      block,
      block.position,
      Matter.Vector.mult(force, forceMagnitude)
    );
  }
};

//update—————————————
Events.on(engine, "beforeUpdate", () => {
  // 每帧更新鼠标力
  //   const mousePos = mousePos;  --this is a bug
  for (const block of blocks) {
    repulseForce(block, mousePos);
  }
});

let isInsideEllipseN = 0;
function checkCueScene1() {
  const cx = sceneWidth / 2; // 椭圆中心x坐标
  const cy = window.innerHeight / 2; // 椭圆中心y坐标
  const a = 200; // 椭圆的长半轴
  const b = 60; // 椭圆的短半轴

  // 假设你要检查的点（比如 body.position）
  isInsideEllipseN = 0;
  blocks.forEach((body) => {
    const x = body.position.x;
    const y = body.position.y;
    const isInsideEllipse =
      (x - cx) ** 2 / a ** 2 + (y - cy) ** 2 / b ** 2 <= 1;
    if (isInsideEllipse) {
      isInsideEllipseN++;
    }
  });

  if (isInsideEllipseN) {
    // console.log("inside");
    lineCues[1] = false;
    lineCues[2] = false;
  } else {
    // console.log("all outside");
    arrowCues[0] = true;
    lineCues[1] = true;
    lineCues[2] = true;
  }
}

//scene-2————————————————————————————————————————————————————————————————————
//———————————————————————————————————————————————————————————————————————————
//reset——————————
function resetScene2() {
  //line
  for (let i = 3; i <= 6; i++) {
    lineCues[i] = false;
  }
  s2PoemLines.forEach((s2PoemLine, index) => {
    s2PoemLine.style.color = "rgba(0, 0, 0, 0.315)";
    s2PoemLine.classList.remove("active");
    s2PoemLineClicked[index] = false;
  });
  //arrow
  arrowCues[1] = false;
  //scene
  //all scene is related to line
}
//lineCues——————————
let s2PoemLineClicked = [false, false, false, false];
const s2PoemLines = document.querySelectorAll(".s2-poemline");
s2PoemLines.forEach((s2PoemLine, index) => {
  s2PoemLine.addEventListener("click", () => {
    console.log("clicked");
    s2PoemLine.style.color = "rgba(0, 0, 0, 0.632)";
    s2PoemLine.classList.add("active");
    s2PoemLineClicked[index] = true;
  });
});
s2PoemLines.forEach((s2PoemLine, index) => {
  s2PoemLine.addEventListener("mouseenter", () => {
    const lineIndex = index + 3;
    lineCues[lineIndex] = true;
    s2PoemLine.style.color = "rgba(0, 0, 0, 0.632)";
  });
  s2PoemLine.addEventListener("mouseleave", () => {
    const lineIndex = index + 3;
    if (!s2PoemLineClicked[index]) {
      lineCues[lineIndex] = false;
      s2PoemLine.style.color = "rgba(0, 0, 0, 0.315)";
    }
  });
});

//你是四月早天里的云烟——————————
function drawClouds(cue) {
  const clouds = document.querySelector(".clouds");
  if (cue) clouds.classList.add("appear");
  else clouds.classList.remove("appear");
}
// 黄昏吹着风的软——————————
const flowerCtn = document.querySelector(".flowers");
const flowerN = 20;
for (let i = 0; i < flowerN; i++) {
  const gif = document.createElement("img");
  gif.src = "./img/scene2/flower-new.gif";
  gif.classList.add("flower");
  flowerCtn.appendChild(gif);
}

let flowerFlag = -1;

setInterval(() => {
  if (lineCues[4]) {
    flowerFlag = flowerFlag <= flowerN ? flowerFlag + 1 : flowerN;
  } else {
    flowerFlag = flowerFlag > -1 ? flowerFlag - 1 : -1;
  }
  //   console.log("interval--1000ms");
}, 300);
const flowers = document.querySelectorAll(".flower");

function drawFlowers() {
  //   console.log(flowerFlag);
  for (let i = 0; i < flowers.length; i++) {
    if (i <= flowerFlag) {
      flowers[i].style.opacity = 1;
    } else {
      flowers[i].style.opacity = 0;
    }
  }
}
// 星子在无意中闪——————————
const starCtn = document.querySelector(".stars");
const starN = 10;
for (let i = 0; i < starN; i++) {
  const star = document.createElement("img");
  star.src = "./img/scene2/star.png";
  star.classList.add("star");
  const delayTime = Math.floor(Math.random() * 10);
  star.style.animationDelay = `-${delayTime}s`;
  starCtn.appendChild(star);
}
function drawStars() {
  if (lineCues[5]) {
    starCtn.style.opacity = 1;
  } else {
    starCtn.style.opacity = 0;
  }
}

// 细雨点洒在花前——————————
const raindropCtn = document.querySelector(".raindrops");
const raindropN = 200;
const raindropSrc = [
  "./img/scene2/raindrop.png",
  "./img/scene2/raindrop2.png",
  "./img/scene2/raindrop3.png",
  "./img/scene2/raindrop4.png",
];
for (let i = 0; i < raindropN; i++) {
  const raindrop = document.createElement("img");
  const randomIndex = Math.floor(Math.random() * 4);
  raindrop.src = raindropSrc[randomIndex];
  raindrop.classList.add("raindrop");

  raindrop.style.top = `${Math.random() * window.innerHeight}px`;
  raindrop.style.left = `${Math.random() * sceneWidth}px`;
  raindropCtn.appendChild(raindrop);
}
const raindrops = document.querySelectorAll(".raindrop");
function drawRaindrops() {
  raindrops.forEach((raindrop) => {
    let left = parseInt(raindrop.style.left, 10);
    let top = parseInt(raindrop.style.top, 10);
    // console.log(left, top);

    //mark---!!!---!!!---!!!---!!!
    //here is a big bug, which is if I change the step value from 1 to belowe 1, then the whole ani won't work
    //mark---!!!---!!!---!!!---!!!

    if (left > -50) {
      left -= 1;
    } else {
      left += sceneWidth + 100;
    }
    if (top < window.innerHeight + 50) {
      top += 2;
    } else {
      top -= window.innerHeight + 100;
    }

    raindrop.style.left = `${left}px`;
    raindrop.style.top = `${top}px`;
  });
  if (lineCues[6]) {
    raindropCtn.style.opacity = 1;
  } else {
    raindropCtn.style.opacity = 0;
  }
}
// final check—————————
function shouldArrowAppearS2() {
  if (lineCues[3] && lineCues[4] && lineCues[5] && lineCues[6]) {
    arrowCues[1] = true;
  } else {
  }
}
//scene-3————————————————————————————————————————————————————————————————————
//———————————————————————————————————————————————————————————————————————————
//reset—————————————
function resetScene3() {
  //lineCue
  for (let i = 7; i <= 9; i++) {
    lineCues[i] = false;
  }
  //arrowCue
  arrowCues[2] = false;
  //about scene
  s3PoemLines.forEach((s3PoemLine, index) => {
    s3PoemLine.style.color = "rgba(255, 255, 255, 0.15)";
    s3PoemLineClicked[index] = false;
  });
  dancingGirl.currentTime = 0;
  hasPlayed = false;
  isFlowerCrownDown = false;
  flowerCrown.dataset.switched = false;
  flowerCrown.style.top = "260px";
  flowerCrown.style.left = "520px";
  flowerCrown.style.opacity = 0;
}
//lineCues—————————————
const s3PoemLines = document.querySelectorAll(".s3-poemline");
const s3PoemLineClicked = [false, false, false];
s3PoemLines.forEach((line, index) => {
  line.addEventListener("click", () => {
    const lineCueIndex = index + 7;
    if (lineCueIndex < 9) {
      lineCues[lineCueIndex] = true;
      s3PoemLineClicked[index] = true;
      line.style.color = "rgba(255, 255, 255, 0.9)";
    }
  });
  line.addEventListener("mouseenter", () => {
    const lineCueIndex = index + 7;
    if (lineCueIndex < 9) {
      lineCues[lineCueIndex] = true;
      line.style.color = "rgba(255, 255, 255, 0.9)";
    }
  });
  line.addEventListener("mouseleave", () => {
    const lineCueIndex = index + 7;
    if (lineCueIndex < 9) {
      if (!s3PoemLineClicked[index]) {
        lineCues[lineCueIndex] = false;
        line.style.color = "rgba(255, 255, 255, 0.15)";
      }
    }
  });
});
//那轻 那娉婷 你是—————————————
const dancingGirl = document.querySelector(".dancing-girl");
let hasPlayed = false;
function drawDancingGirl() {
  if (lineCues[7]) {
    dancingGirl.style.opacity = 0.9;
    if (!hasPlayed) {
      dancingGirl.play();
    }
  } else {
    dancingGirl.pause();
    dancingGirl.style.opacity = 0.1;
  }
}

dancingGirl.addEventListener("ended", () => {
  hasPlayed = true;
});
// 鲜妍百花的冠冕你戴着—————————————
//create flower petals————
const flowerPetalCtn = document.querySelector(".flower-petals");
const flowerPetalN = 60;
const flowerPetalSrc = [
  "./img/scene3/image-89.png",
  "./img/scene3/image-90.png",
  "./img/scene3/image-92.png",
  "./img/scene3/image-96.png",
  "./img/scene3/image-97.png",
  "./img/scene3/image-98.png",
  "./img/scene3/image-99.png",
  "./img/scene3/image-100.png",
];
const width = 200;
const height = 400;
for (let i = 0; i < flowerPetalN; i++) {
  const flowerPetal = document.createElement("img");
  const randomIndex = Math.floor(Math.random() * 8);
  flowerPetal.src = flowerPetalSrc[randomIndex];
  flowerPetal.classList.add("flower-petal");
  flowerPetal.id = `flowerPetal${i}`;
  flowerPetal.style.left = `${Math.random() * width}px`;
  flowerPetal.style.top = `${Math.random() * height}px`;
  flowerPetalCtn.appendChild(flowerPetal);
  // console.log("created");
}
//make flower petals flying————
const styleSheets = document.styleSheets;
const myStyleSheet = styleSheets[0];
for (let i = 0; i < flowerPetalN; i++) {
  const animationName = `petalFly${i}`;
  const xMove = (Math.random() * width) / 2 - width / 4;
  const yMove = height * 1.1;
  const duration = (Math.random() * 6 + 6).toFixed(2);

  const keyframes = `
      @keyframes ${animationName} {
        0% { transform: translate(0px, ${-yMove / 2}px); opacity:0 }
        50% { transform: translate(0px, 0px); opacity:1 }
        100% { transform: translate(${xMove}px, ${yMove / 3}px); opacity:0}
      }
    `;

  myStyleSheet.insertRule(keyframes, myStyleSheet.cssRules.length);

  //assign ani to petals
  const target = document.getElementById(`flowerPetal${i}`);
  if (target) {
    target.style.animation = `${animationName} ${duration}s infinite ease-in-out`;
  }
}

function drawFlowerPetals() {
  if (lineCues[8]) {
    flowerPetalCtn.style.opacity = 1;
  } else {
    flowerPetalCtn.style.opacity = 0;
  }
}
//create flower crown————
const flowerCrown = document.querySelector(".flower-crown");
let isFlowerCrownDown = false;
flowerCrown.setAttribute("draggable", "false");
s3PoemLines[1].addEventListener("click", () => {
  flowerCrown.style.animation = "crown-down 4s ease-in-out forwards";
  isFlowerCrownDown = true;
});
function drawFlowerCrownJump() {
  const top = parseFloat(window.getComputedStyle(flowerCrown).top);
  if (isFlowerCrownDown) {
    flowerCrown.style.opacity = 1;

    if (
      top >= 260 &&
      flowerCrown.dataset.switched !== "true" &&
      !isFlowerCrownDragged
    ) {
      flowerCrown.style.animation = "crown-jump 3s linear infinite";
      flowerCrown.dataset.switched = "true";
    }
  }
}
//drag flowerCrown————
let isFlowerCrownDragged = false;
flowerCrown.addEventListener("mousedown", (e) => {
  flowerCrown.style.animation = "";
  //   flowerCrown.style.top = "260px";
  //   flowerCrown.style.left = "520px";
  isFlowerCrownDragged = true;

  // 鼠标按下的位置
  const offsetX =
    e.clientX - parseFloat(window.getComputedStyle(flowerCrown).left);
  const offsetY =
    e.clientY - parseFloat(window.getComputedStyle(flowerCrown).top);

  const onMouseMove = (e) => {
    if (isFlowerCrownDragged) {
      flowerCrown.style.position = "absolute";

      const top = parseFloat(window.getComputedStyle(flowerCrown).top);
      const left = parseFloat(window.getComputedStyle(flowerCrown).left);
      //   console.log(left, top);
      //   console.log(`${e.clientX - offsetX}px`, `${e.clientY - offsetY}px`);
      flowerCrown.style.left = `${e.clientX - offsetX}px`;
      flowerCrown.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const onMouseUp = () => {
    isFlowerCrownDragged = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});
//check if drag successful————
function shouldArrowAppearS3() {
  const top = parseFloat(window.getComputedStyle(flowerCrown).top);
  const left = parseFloat(window.getComputedStyle(flowerCrown).left);
  //   console.log(left, top);
  if (285 <= left && left <= 300 && 255 <= top && top <= 270) {
    lineCues[9] = true;
    s3PoemLines[2].style.color = "white";
    arrowCues[2] = true;
  }
}

//scene-4————————————————————————————————————————————————————————————————————
//———————————————————————————————————————————————————————————————————————————
//reset———————————————
const s4PoemLines = document.querySelectorAll(".s4-poemline span");
function resetScene4() {
  //lineCue
  for (let i = 10; i <= 12; i++) {
    lineCues[i] = false;
  }
  //arrowCue
  arrowCues[3] = false;
  //about scene
  s4PoemLines.forEach((s4PoemLine, index) => {
    s4PoemLine.style.color = "rgb(0, 0, 0, 0.25)";
    s4PoemLineClicked[0] = false;
    s4PoemLineClicked[1] = false;
    s4PoemLineClicked[2] = false;
  });
  resetSnow();
  resetGreen();
  resetLotus();
}

//right poemLine interaction———————————————
const s4PoemLineCtn = document.querySelector(".s4-poem-ctn");
const s4PoemLine1s = document.querySelectorAll(".s4-poemline-1");
const s4PoemLine2s = document.querySelectorAll(".s4-poemline-2");
const s4PoemLine3s = document.querySelectorAll(".s4-poemline-3");
const s4PoemLineClicked = [false, false, false];
s4PoemLine1s.forEach((s4PoemLine1) => {
  s4PoemLine1.addEventListener("mouseenter", () => {
    s4PoemLine1s[0].style.color = "rgb(0, 0, 0)";
    s4PoemLine1s[1].style.color = "rgb(0, 0, 0)";
  });
  s4PoemLine1.addEventListener("mouseleave", () => {
    if (!s4PoemLineClicked[0]) {
      s4PoemLine1s[0].style.color = "rgb(0, 0, 0, 0.25)";
      s4PoemLine1s[1].style.color = "rgb(0, 0, 0, 0.25)";
    }
  });
  s4PoemLine1.addEventListener("click", () => {
    s4PoemLine1s[0].style.color = "rgb(0, 0, 0)";
    s4PoemLine1s[1].style.color = "rgb(0, 0, 0)";
    s4PoemLineClicked[0] = true;

    document.body.classList.add("yellow-cursor");
    s4PoemLineCtn.classList.add("no-cursor-events");
  });
});
s4PoemLine2s.forEach((s4PoemLine2) => {
  s4PoemLine2.addEventListener("mouseenter", () => {
    s4PoemLine2s[0].style.color = "rgb(0, 0, 0)";
    s4PoemLine2s[1].style.color = "rgb(0, 0, 0)";
  });
  s4PoemLine2.addEventListener("mouseleave", () => {
    if (!s4PoemLineClicked[1]) {
      s4PoemLine2s[0].style.color = "rgb(0, 0, 0, 0.25)";
      s4PoemLine2s[1].style.color = "rgb(0, 0, 0, 0.25)";
    }
  });
  s4PoemLine2.addEventListener("click", () => {
    s4PoemLine2s[0].style.color = "rgb(0, 0, 0)";
    s4PoemLine2s[1].style.color = "rgb(0, 0, 0)";
    s4PoemLineClicked[1] = true;

    document.body.classList.add("green-cursor");
    s4PoemLineCtn.classList.add("no-cursor-events");
  });
});
s4PoemLine3s.forEach((s4PoemLine3) => {
  s4PoemLine3.addEventListener("mouseenter", () => {
    s4PoemLine3s[0].style.color = "rgb(0, 0, 0)";
  });
  s4PoemLine3.addEventListener("mouseleave", () => {
    if (!s4PoemLineClicked[2]) {
      s4PoemLine3s[0].style.color = "rgb(0, 0, 0, 0.25)";
    }
  });
  s4PoemLine3.addEventListener("click", (e) => {
    if (s4PoemLineClicked[0] && s4PoemLineClicked[1]) {
      s4PoemLine3s[0].style.color = "rgb(0, 0, 0)";
      s4PoemLineClicked[2] = true;

      // document.body.classList.add("no-cursor");
      s4PoemLineCtn.classList.add("no-cursor-events");
      lotusCursorAppear(e);
      pond.style.opacity = 1;
    }
  });
});

//snow———————————————
const snowTexts = document.querySelectorAll(".snow-group > path");
const snowTextsShadow = document.querySelectorAll(".snow-group > circle");
const duckYellow = document.querySelector(".duck-yellow");
const snowTextMeltedStates = [];
const line10Key = document.querySelector(".s4-line10-key");
snowTextsShadow.forEach((snowTextShadow, index) => {
  snowTextShadow.addEventListener("mouseenter", () => {
    if (document.body.classList.contains("yellow-cursor")) {
      snowTexts[index].style.opacity = 0;
      snowTextMeltedStates[index] = true;
    }
  });
});
function checkIfSnowMelted() {
  let count = 0;
  for (let i = 0; i < snowTextMeltedStates.length; i++) {
    if (snowTextMeltedStates[i]) {
      count++;
    }
  }
  if (count == 18) {
    lineCues[10] = true;
    duckYellow.style.opacity = 1;
    line10Key.style.color = "rgb(0, 0, 0)";
    document.body.classList.remove("yellow-cursor");
    s4PoemLineCtn.classList.remove("no-cursor-events");
    // console.log("yellow appear", count);
  }
}
function resetSnow() {
  snowTexts.forEach((snowText, index) => {
    snowText.style.opacity = 1;
    snowTextMeltedStates[index] = false;
    duckYellow.style.opacity = 0;
    line10Key.style.color = "rgb(0, 0, 0,0.25)";
  });
}
//green———————————————
const treeBranchShadows = document.querySelectorAll(".tree-branch-shadow");
const leftTreeGreens = document.querySelectorAll(".left-tree-green");
const middleTreeGreens = document.querySelectorAll(".middle-tree-green");
const rightTreeGreens = document.querySelectorAll(".right-tree-green");
const treeGreens = [leftTreeGreens, middleTreeGreens, rightTreeGreens];
const line11Key = document.querySelector(".s4-line11-key");
const greenGrownStates = [false, false, false];

treeBranchShadows.forEach((shadow, index) => {
  shadow.addEventListener("mouseenter", () => {
    if (document.body.classList.contains("green-cursor")) {
      greenGrownStates[index] = true;
      const treeGreenGroup = treeGreens[index];

      treeGreenGroup.forEach((treeGreenEll, index) => {
        treeGreenGroup[0].style.opacity = 1;
        if (index < treeGreenGroup.length - 1)
          setTimeout(() => {
            treeGreenGroup[index + 1].style.opacity = 1;
          }, 500 + index * 500);
      });
    }
  });
});
function checkIfTreesGrown() {
  const allTrue = greenGrownStates.every((value) => value === true);
  if (allTrue && greenGrownStates.length) {
    lineCues[11] = true;
    line11Key.style.color = "rgb(0, 0, 0)";
    document.body.classList.remove("green-cursor");
    s4PoemLineCtn.classList.remove("no-cursor-events");
    for (let i = 0; i < greenGrownStates.length; i++) {
      greenGrownStates[i] = false;
    }
  }
}
function resetGreen() {
  treeGreens.forEach((treeGreenGroup) => {
    treeGreenGroup.forEach((treeGreenElli) => {
      treeGreenElli.style.opacity = 0;
      line11Key.style.color = "rgb(0, 0, 0,0.25)";
    });
  });
}

//white lotus———————————————
//about lotus cursor————
const scene4 = document.querySelector(".scene4");
const lotusCursor = document.querySelector(".lotus-img");
//!!!!!!!!!!!!!!this varible is super important
let scrollOffsetY = 0;

scene4.addEventListener("mousemove", (e) => {
  if (lineCues[10] && lineCues[11]) {
    lotusCursorAppear(e);
  }
});
scene4.addEventListener("wheel", (e) => {
  if (lineCues[10] && lineCues[11]) {
    scrollOffsetY += e.deltaY; // 累加滚动的偏移量
    lotusCursorAppear();
  }
});

function lotusCursorAppear(e) {
  if (s4PoemLineClicked[2]) {
    lotusCursor.style.opacity = 1;

    // 计算鼠标位置
    const mouseX = window.innerWidth - e.clientX;
    let mouseY = e.clientY;

    mouseY += scrollOffsetY; // 添加滚动的Y偏移量

    // 更新光标的位置
    lotusCursor.style.right = `${mouseX - lotusCursor.offsetWidth / 2}px`;
    lotusCursor.style.top = `${mouseY - lotusCursor.offsetHeight / 2}px`;
  }
}
//pond & lotus————
const pond = document.querySelector(".pond");
const pondShadow = document.querySelector(".pond-shadow > path");
let isLotusGrown = false;
const line12Key = document.querySelector(".s4-line12-key");
pondShadow.addEventListener("click", (e) => {
  if (s4PoemLineClicked[2]) {
    isLotusGrown = true;

    const video = document.createElement("video");
    video.src = "./img/scene4/lotus.mp4"; // 替换为你的视频文件路径
    video.classList.add("lotus-video");
    // 设置视频的属性
    video.autoplay = true;
    video.loop = false;

    // 设置视频的样式
    video.style.position = "absolute";
    video.style.right = `${window.innerWidth - e.clientX - 50}px`;
    video.style.top = `${e.clientY + scrollOffsetY - 25}px`;

    scene4.appendChild(video);
  }
});
function checkIfLotusGrown() {
  if (isLotusGrown) {
    lineCues[12] = true;
    line12Key.style.color = "rgb(0, 0, 0)";
  }
}
function resetLotus() {
  s4PoemLineCtn.classList.remove("no-cursor-events");
  line12Key.style.color = "rgb(0, 0, 0,0.25)";
  pond.style.opacity = 0;
  lotusCursor.style.opacity = 0;
  scrollOffsetY = 0;
  isLotusGrown = false;
  const lotusVideos = document.querySelectorAll(".lotus-video");
  lotusVideos.forEach((video) => {
    video.remove();
  });
}
//final check———————————————
function shouldArrowAppearS4() {
  if (lineCues[10] && lineCues[11] && lineCues[12]) {
    arrowCues[3] = true;
  }
}

//scene-5————————————————————————————————————————————————————————————————————
//———————————————————————————————————————————————————————————————————————————
//reset—————————————
function resetScene5() {
  //lineCue
  for (let i = 13; i <= 17; i++) {
    lineCues[i] = false;
  }
  //arrowCue

  //about scene
  resetS2PoemLines();
  resetFlowerTrees();
  resetSwallows();
  resetPoints();
  resetColorfulLine();
}

//right poemLine interaction———————————————
const s5PoemLines = document.querySelectorAll(".s5-poemline");
let s5PoemLineClicked = [false, false, false, false, false];

s5PoemLines.forEach((s5PoemLine, index) => {
  s5PoemLine.addEventListener("mouseenter", () => {
    if (index == 0 || index == 1) {
      const lineIndex = index + 13;
      lineCues[lineIndex] = true;
    }
    s5PoemLine.classList.add("active");
  });
  s5PoemLine.addEventListener("mouseleave", () => {
    if (index == 2 || index == 3 || index == 4) {
      if (!s5PoemLineClicked[index]) {
        s5PoemLine.classList.remove("active");
      }
    }
  });

  s5PoemLine.addEventListener("click", () => {
    if (index == 2 || index == 3 || index == 4) {
      s5PoemLineClicked[index] = true;
      s5PoemLine.classList.add("active");
      const lineIndex = index + 13;
      lineCues[lineIndex] = true;
      if (index == 2) {
        makePointMove(50, redPointCtns, 0);
      } else if (index == 3) {
        makePointMove(150, yellowPointCtns, -80);
      } else if (index == 4) {
        makePointMove(300, greenPointCtns, -180);
      }
    }
  });
});
function resetS2PoemLines() {
  s5PoemLines.forEach((s5PoemLine, index) => {
    s5PoemLine.classList.remove("active");
    s5PoemLineClicked[2] = false;
    s5PoemLineClicked[3] = false;
    s5PoemLineClicked[4] = false;
  });
}

//你是一树一树的花开———————————————
const flowerTrees = document.querySelectorAll(".flower-tree");
let appearPercent = 0;
let intervalID;
// testImg.addEventListener('mouseleave',()=>{

flowerTrees.forEach((flowerTree, index) => {
  const x = index * 500;
  flowerTree.style.backgroundPosition = `${-x}px 0px`;
});
function drawFlowerTrees() {
  if (lineCues[13]) {
    // console.log(appearPercent);
    if (!intervalID) {
      intervalID = setInterval(() => {
        appearPercent++;
      }, 20);
    }
    flowerTrees.forEach((flowerTree, index) => {
      const p = appearPercent - index * 20;
      flowerTree.style.maskImage = `linear-gradient(to top, black ${
        p - 10
      }%, transparent ${p}%)`;
    });
    if (appearPercent > 500) {
      clearInterval(intervalID);
    }
  }
}

function resetFlowerTrees() {
  appearPercent = 0;
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
  }
  flowerTrees.forEach((flowerTree) => {
    flowerTree.style.maskImage = `linear-gradient(to top, black 0%, transparent 0%)`;
  });
}

// 是燕在梁间呢喃———————————————
const swallow1Ctn = document.querySelector(".swallow1-ctn");
const swallow2Ctn = document.querySelector(".swallow2-ctn");
function drawSwallows() {
  if (lineCues[14]) {
    swallow1Ctn.classList.add("active");
    swallow2Ctn.classList.add("active");
  }
}
function resetSwallows() {
  swallow1Ctn.classList.remove("active");
  swallow2Ctn.classList.remove("active");
}
//你是爱-是暖-是希望———————————————
//create point—————
const redPointsCtn = document.querySelector(".red-points-ctn");
const yellowPointsCtn = document.querySelector(".yellow-points-ctn");
const greenPointsCtn = document.querySelector(".green-points-ctn");
function createPoints(color, src, n, baseWidth) {
  const pointsCtnObj = {
    red: redPointsCtn,
    yellow: yellowPointsCtn,
    green: greenPointsCtn,
  };
  for (let i = 0; i < n; i++) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("point");
    const width = baseWidth + Math.random() * 50;
    img.style.width = `${width}px`;
    const opacity = 1 - Math.random() * n * 0.015;
    img.style.opacity = `${opacity}`;

    const imgCtn = document.createElement("div");
    imgCtn.classList.add("point-ctn");
    imgCtn.classList.add(`${color}-point-ctn`);

    imgCtn.appendChild(img);

    pointsCtnObj[color].appendChild(imgCtn);
  }
}
createPoints("red", "./img/scene5/red-point.png", 2, 100);
createPoints("yellow", "./img/scene5/yellow-point.png", 10, 60);
createPoints("green", "./img/scene5/green-point.png", 60, 40);
//make point float—————
const points = document.querySelectorAll(".point");
function drawFloatPoints() {
  points.forEach((point, index) => {
    const r = point.offsetWidth / 5;
    const x = r * Math.cos((loopCount + index * 1000) * 0.01);
    const y = r * Math.sin(loopCount * 0.01 * 1.5);
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
  });
}
//make point-ctn translate—————
const redPointCtns = document.querySelectorAll(".red-point-ctn");
const yellowPointCtns = document.querySelectorAll(".yellow-point-ctn");
const greenPointCtns = document.querySelectorAll(".green-point-ctn");
function makePointMove(baseR, pointCtns, yAjust) {
  pointCtns.forEach((pointCtn) => {
    pointCtn.style.opacity = 1;
    const theta = Math.random() * Math.PI * 2;
    const r = baseR + Math.random() * baseR;
    const translateX = r * Math.cos(theta);
    const translateY = r * Math.sin(theta) * 0.5;

    pointCtn.style.transform = `translate(${translateX}px,${
      translateY + yAjust
    }px)`;
  });
}
document.querySelector(".test-cue").addEventListener("click", () => {
  makePointMove(50, redPointCtns, 0);
  makePointMove(150, yellowPointCtns, -80);
  makePointMove(300, greenPointCtns, -180);
});
const pointCtns = document.querySelectorAll(".point-ctn");
function resetPoints() {
  pointCtns.forEach((pointCtn) => {
    pointCtn.style.opacity = 0;
    pointCtn.style.transform = `translate(0px,0px)`;
  });
}
//scroll cue———————————————
let isAllPoemRead = false;
function updateColorfulLine() {
  const ifAllLineRead =
    lineCues[13] &&
    lineCues[14] &&
    lineCues[15] &&
    lineCues[16] &&
    lineCues[17];
  if (scrollCue || ifAllLineRead) {
    isAllPoemRead = true;
    n0R.style.display = "block";
    setTimeout(() => {
      n0R.style.opacity = 1;
    }, 100);
  }
}
//draw last leftLine
let isLastLineRead = false;
let isScrolledBack = false;
window.addEventListener("scroll", function () {
  const currentScrollY = window.scrollY;
  if (currentScrollY >= 140 + H0 - window.innerHeight && isScrolledBack) {
    isLastLineRead = true;
  }
});
function drawLastLeftLine() {
  if (isAllPoemRead && isLastLineRead) {
    lineCues[18] = true;
    resetRightAll();
    n0R.style.display = "none";
  }
}
function resetColorfulLine() {
  isAllPoemRead = false;
  isLastLineRead = false;
  isScrolledBack = false;
  n0R.style.opacity = 0;
  n0R.style.display = "none";
}
function resetRightAll() {
  resetCues[0] = true;
  resetCues[1] = true;
  resetCues[2] = true;
  resetCues[3] = true;
  resetCues[4] = true;
}

//loop——————————————————————————————————————————————————————————————————————
//loop——————————————————————————————————————————————————————————————————————
let loopCount = 0;
function loop() {
  loopCount++;
  updateLeftPoem();
  updateArrow();
  updateCurrentScene();
  updateReset();

  requestAnimationFrame(loop);
}
loop();

function updateLeftPoem() {
  lineCues.forEach((lineCue, index) => {
    if (lineCue) {
      lPoemLines[index].style.clipPath = "inset(0 0 0 0)";
    } else {
      lPoemLines[index].style.clipPath = "inset(0 100% 0 0)";
    }
  });
}
const arrowClickHandlers = [];
function updateArrow() {
  arrowCues.forEach((arrowCue, index) => {
    if (!arrowClickHandlers[index]) {
      arrowClickHandlers[index] = () => {
        const targetY = H0 + (index + 1) * window.innerHeight;
        smoothScrollTo(0, targetY, 3800);
      };
    }
    const arrowClickEvent = arrowClickHandlers[index];

    if (arrowCue) {
      //arrow appear
      arrows[index].style.display = "block";
      setTimeout(() => {
        arrows[index].style.opacity = 0.4;
      }, 100);
      arrows[index].style.cursor = "pointer";

      //let next box appear
      boxes[index + 1].style.display = "block";

      //add scroll function to arrow
      arrows[index].addEventListener("click", arrowClickEvent);
    } else {
      arrows[index].style.opacity = "0";
      arrows[index].style.display = "none";
      boxes[index + 1].style.display = "none";
      //如果没有找到匹配的监听器，它只是跳过这个调用!!!!
      arrows[index].removeEventListener("click", arrowClickEvent);
    }
  });
}
function smoothScrollTo(targetX, targetY, duration) {
  const startY = window.scrollY;
  const startX = window.scrollX;
  const distanceY = targetY - startY;
  const distanceX = targetX - startX;
  const startTime = performance.now();

  function step() {
    const currentTime = performance.now();
    const timeElapsed = currentTime - startTime;

    if (timeElapsed < duration) {
      const scrollY = easeLinear(timeElapsed / duration) * distanceY + startY;
      const scrollX = easeLinear(timeElapsed / duration) * distanceX + startX;
      window.scrollTo({
        left: scrollX,
        top: scrollY,
      });
      requestAnimationFrame(step);
    } else {
      window.scrollTo({
        left: targetX,
        top: targetY,
      });
    }
  }
  // 简单的线性缓动函数
  function easeLinear(t) {
    return t;
  }
  requestAnimationFrame(step);
}
function updateCurrentScene() {
  //update current scene pointer
  const H = window.innerHeight;
  if (window.scrollY <= H0 && window.scrollY < H0 + H) {
    currentScene = 1;
  } else if (H0 + H <= window.scrollY && window.scrollY < H0 + 2 * H) {
    currentScene = 2;
  } else if (H0 + 2 * H <= window.scrollY && window.scrollY < H0 + 3 * H) {
    currentScene = 3;
  } else if (H0 + 3 * H <= window.scrollY && window.scrollY < H0 + 4 * H) {
    currentScene = 4;
  } else if (H0 + 4 * H <= window.scrollY) {
    currentScene = 5;
  }
  //update current scene drawings && check sceneCues
  //scene1————————————
  checkCueScene1();
  //scene2————————————
  drawClouds(lineCues[3]);
  drawFlowers();
  drawStars();
  drawRaindrops();
  shouldArrowAppearS2();

  //scene3————————————
  drawDancingGirl();
  drawFlowerPetals();
  drawFlowerCrownJump();
  shouldArrowAppearS3();

  //scene4————————————
  checkIfSnowMelted();
  checkIfTreesGrown();
  checkIfLotusGrown();
  shouldArrowAppearS4();

  //scene5————————————
  drawFlowerTrees();
  drawSwallows();
  drawFloatPoints();
  updateColorfulLine();
  drawLastLeftLine();
}
function updateReset() {
  //   console.log(resetCues);
  resetCues.forEach((resetCue, index) => {
    if (resetCue) {
      const sceneIndex = index + 1;
      switch (sceneIndex) {
        case 5:
          resetScene5();
          break;
        case 4:
          resetScene4();
          break;
        case 3:
          resetScene3();
          break;
        case 2:
          resetScene2();
          break;
        case 1:
          resetScene1();
          break;
        default:
          break;
      }
    }
    resetCues[index] = false;
  });
}
