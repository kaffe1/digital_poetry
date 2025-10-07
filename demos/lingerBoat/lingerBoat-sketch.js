const changingWord = document.querySelector(".word-changing");
const poemCtn = document.querySelector(".poem-container");
const wordsArr = [
  "来",
  "吹",
  "拂",
  "临",
  "落",
  "到",
  "过",
  "如",
  "满",
  "绿",
  "抚",
  "明",
  "上",
  "访",
  "留",
  "舞",
  "顾",
  "会",
  "醒",
  "唤",
];

let intervalId = null;

// poemCtn.addEventListener("mouseenter", startChanging);
// poemCtn.addEventListener("mouseleave", stopChanging);
function startChanging() {
  if (intervalId) return; // 避免重复开启

  intervalId = setInterval(() => {
    const currentSpans = changingWord.querySelectorAll("span");
    if (currentSpans.length) {
      currentSpans.forEach((currentSpan) => {
        currentSpan.style.opacity = "0";
      });
    }

    //create randomChar span in changingWord
    const randomChar = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    const span = document.createElement("span");
    span.textContent = randomChar;
    span.style.opacity = "0";
    changingWord.appendChild(span);

    // 动画结束后移除这个元素
    span.addEventListener("animationend", () => {
      span.remove();
    });
  }, 500); // 调整速度（越小越快）
}
function stopChanging() {
  clearInterval(intervalId);
  intervalId = null;

  const spans = changingWord.querySelectorAll("span");
  // 如果有多个叠加的span，保留最后一个
  if (spans.length > 0) {
    const last = spans[spans.length - 1];
    last.style.animation = "none"; // 停止它的动画
    last.style.opacity = "1"; // 设置为完全不透明
  }

  // 清除其余的span
  spans.forEach((s, index) => {
    if (index !== spans.length - 1) {
      s.style.opacity = "0";
      // s.remove();
    }
  });
}

//test2--color changing motion----------------------------------------

//---initiate float circle
const circleArr = document.querySelectorAll(".circle");
circleArr.forEach((circle, index) => {
  initializeCircles(circle, index);
  createAsyncAni(circle, index);
});

function initializeCircles(circle, index) {
  //position---
  let topV = getRandomInt(0, 80) + "%";
  let leftV = getRandomInt(0, 80) + "%";
  circle.style.top = topV;
  circle.style.left = leftV;

  //color---
  const colors = getHarmoniousColors([120, 200, 255], 10);

  // let bgColor = `rgb(${getRandomInt(200, 255)}, ${getRandomInt(50, 200)}, 10)`;
  let bgColor = colors[index];
  circle.style.opacity = "0.8";
  circle.style.backgroundColor = bgColor;

  //size---
  let randomR = getRandomInt(100, 300);
  circle.style.width = `${randomR}px`;
  circle.style.height = `${randomR}px`;
}
function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
function createAsyncAni(circle, index) {
  const delay = Math.random() * 4; // 随机 0~4 秒内启动
  circle.style.animation = "float-circle 10s linear infinite";
  circle.style.animationDelay = `-${delay}s`;
  circle.style.animationDirection = index % 2 == 0 ? "normal" : "reverse";
}
function getHarmoniousColors(baseColor, count = 5) {
  const [rBase, gBase, bBase] = baseColor;
  const colors = [];

  for (let i = 0; i < count; i++) {
    const variation = 100;
    const r = Math.min(
      255,
      Math.max(0, rBase + (Math.random() - 0.5) * variation)
    );
    const g = Math.min(
      255,
      Math.max(0, gBase + (Math.random() - 0.5) * variation)
    );
    const b = Math.min(
      255,
      Math.max(0, bBase + (Math.random() - 0.5) * variation)
    );

    colors.push(`rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`);
  }

  return colors;
}

//---create @keyframes float-circle
{
  const keyframeName = "float-circle";
  const radius = 50; // 半径，单位像素
  const steps = 16;
  const keyframes = [];

  for (let i = 0; i <= steps; i++) {
    const percent = (i / steps) * 100;
    const angle = (2 * Math.PI * i) / steps;
    const x = Math.round(Math.cos(angle) * radius);
    const y = Math.round(Math.sin(angle) * radius);
    keyframes.push(`${percent}% { transform: translate(${x}px, ${y}px); }`);
  }

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerHTML = `@keyframes ${keyframeName} {\n${keyframes.join(
    "\n"
  )}\n}`;
  document.head.appendChild(styleSheet);
}

//---create mouse-enter&leave interaction
const test2Ctn = document.querySelector(".test2");

test2Ctn.addEventListener("mouseenter", () => {
  startChanging();
  circleArr.forEach((circle, index) => {
    circle.style.animationPlayState = "paused";
    targetSpeed = 30.0; // 鼠标移入，加速
  });
  mouseBlur();
});
test2Ctn.addEventListener("mouseleave", () => {
  stopChanging();
  circleArr.forEach((circle, index) => {
    circle.style.animationPlayState = "running";
    circle.classList.add(".circle-rotate");
    targetSpeed = 0.2; // 鼠标移出，减速
  });
  mouseClear();
});

const spinner = document.querySelector(".rotateCtn");

let angle = 0;
let speed = 0.05; // 初始速度（度数/帧）
let targetSpeed = speed;
let animationFrameId;

function update() {
  // 平滑过渡到目标速度
  speed += (targetSpeed - speed) * 0.05;

  angle += speed;
  spinner.style.transform = `rotate(${angle}deg)`;

  animationFrameId = requestAnimationFrame(update);
}
update();

function mouseBlur() {}
function mouseClear() {}

const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
