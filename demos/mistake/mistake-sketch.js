//我打江南走过————————————————————————————————————————————
const zouPath = document.getElementById("zou-path");
const zouText = document.getElementById("zou");
const zouAni = document.getElementById("zou-ani");
const guoPath = document.getElementById("guo-path");
const guoText = document.getElementById("guo");
const guoAni = document.getElementById("guo-ani");
const djnText = document.getElementById("djn-text");
let zouLe = false;
let guoLe = false;

zouText.addEventListener("click", () => {
  zouText.setAttribute("x", "-18");
  zouText.setAttribute("y", "12");
  zouAni.beginElement();
  zouLe = true;
  if (guoLe) {
    setTimeout(function () {
      djnText.style.opacity = 1;
    }, 2000);
  }
});
guoText.addEventListener("click", () => {
  guoText.setAttribute("x", "-18");
  guoText.setAttribute("y", "12");
  guoAni.beginElement();
  guoLe = true;
  if (zouLe) {
    setTimeout(function () {
      djnText.style.opacity = 1;
    }, 3000);
  }
});

//那等在季节里的容颜如莲花的开落————————————————————————————————————————
const rongyanText = document.getElementById("rongyan");
const maskText = document.getElementById("mask-text");
const maskTextAni = document.getElementById("mask-text-ani");
const dekailuoText = document.getElementById("dekailuo");
const dekailuoAni = document.getElementById("dekailuo-ani");
const ruText = document.getElementById("ru");
const lianText = document.getElementById("lian");
const lianTextAni = document.getElementById("lian-text-ani");
const huaText = document.getElementById("hua");
const huaTextAni = document.getElementById("hua-text-ani");

rongyanText.addEventListener("click", () => {
  maskTextAni.beginElement();
});

dekailuoText.addEventListener("click", () => {
  ruText.style.opacity = 1;
  dekailuoAni.beginElement();

  setTimeout(function () {
    lianText.style.opacity = 1;
    lianText.setAttribute("x", "-18");
    lianText.setAttribute("y", "13");
    lianTextAni.beginElement();
    huaText.style.opacity = 1;
    huaText.setAttribute("x", "-18");
    huaText.setAttribute("y", "13");
    huaTextAni.beginElement();
  }, 1000);
});

//东风不来。。————————————————————————————————————————
const dongfengText = document.getElementById("dongfeng");
const dongfengAni = document.getElementById("dongfeng-ani");
const bulaiText = document.getElementById("bulai");
const bulaiAni = document.getElementById("bulai-ani");
const liuxuTextF = document.getElementById("liuxu");
const bufeiText = document.getElementById("bufei");
const sydText = document.getElementById("sanyuede");
const liuText = document.getElementById("liu");
const xuText = document.getElementById("xu");

dongfengText.addEventListener("click", () => {
  dongfengAni.beginElement();
  bulaiAni.beginElement();
  bulaiText.style.opacity = 1;
});
liuxuTextF.addEventListener("click", () => {
  bufeiText.style.opacity = 1;
  sydText.style.opacity = 1;
  flyLiuXu(liuxu1, 1);
  flyLiuXu(liuxu2, 2);
  setTimeout(function () {
    liuxu1.forEach((circle) => {
      circle.style.opacity = 1;
    });
    liuxu2.forEach((circle) => {
      circle.style.opacity = 1;
    });
  }, 2000);
});
liuxuTextF.addEventListener("mouseenter", () => {
  liuText.setAttribute("fill", "rgb(222, 168, 222)");
  xuText.setAttribute("fill", "rgb(222, 168, 222)");
});
liuxuTextF.addEventListener("mouseleave", () => {
  liuText.setAttribute("fill", "rgb(51, 51, 51)");
  xuText.setAttribute("fill", "rgb(51, 51, 51)");
});

//柳絮纷飞——————————————————————
//get points
let points1 = getPoints("liu");
let points2 = getPoints("xu");
function getPoints(str) {
  let pathElement = document.getElementById(`${str}`);
  let d = pathElement.getAttribute("d");
  let subPaths = extractSubPaths(d);
  let points = [];

  function extractSubPaths(d) {
    return d.match(/M[^M]*/g) || []; // 提取多个 M 开头的路径片段
  }
  function samplePathPoints(d, numPoints = 20) {
    let tempPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    tempPath.setAttribute("d", d);

    let pathLength = tempPath.getTotalLength();
    let points = [];

    for (let i = 0; i < numPoints; i++) {
      let distance = (i / numPoints) * pathLength;
      let point = tempPath.getPointAtLength(distance);
      points.push({ x: point.x, y: point.y });
    }

    return points;
  }
  //subPaths is a string arr
  subPaths.forEach((subPath) => {
    points.push(...samplePathPoints(subPath, 15)); // 采样多个路径
  });
  console.log(points);
  return points;
}

//liuxu: <circle>s
let points = [points1, points2];
let liuxu1 = createPoints(1);
let liuxu2 = createPoints(2);
function createPoints(num) {
  let svg = document.querySelector("svg");
  points[num - 1].forEach((point) => {
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    if (num == 1) circle.classList.add("liuCircle");
    else circle.classList.add("xuCircle");

    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", 1.4); // 粒子大小
    circle.style.opacity = 0;
    svg.appendChild(circle);
  });
  if (num == 1) {
    let liuxu1 = document.querySelectorAll(".liuCircle");
    return liuxu1 || [];
  } else {
    let liuxu2 = document.querySelectorAll(".xuCircle");
    return liuxu2 || [];
  }
}
//fly liuxu

function flyLiuXu(liuxu, dif) {
  liuxu.forEach((circle, index) => {
    let duration = Math.random() * 5 + 300;
    let radius = Math.random() * 50 + 20;

    let startX = parseFloat(circle.getAttribute("cx"));
    let startY = parseFloat(circle.getAttribute("cy"));
    if (dif == 1) circle.setAttribute("fill", "rgba(171, 211, 78, 0.74)");
    else circle.setAttribute("fill", "rgba(245, 177, 212, 0.74)");
    circle.style.opacity = 0;
    circle.style.transition = "opacity 4s";

    function move(t) {
      if (dif == 1) {
        let x = startX + radius * Math.cos((t + index * 25) / (3.6 * duration));
        let y = startY + radius * Math.sin((t + index * 20) / (4.5 * duration));
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
      } else {
        let x = startX + radius * Math.sin((t + index * 25) / (3.6 * duration));
        let y = startY + radius * Math.cos((t + index * 20) / (4.5 * duration));
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
      }
      requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
  });
}

//心城————————————————————————————————————————
const xinText = document.getElementById("xin");
const xinAni = document.getElementById("xin-ani");
const chengText = document.getElementById("cheng");
const chengAni = document.getElementById("cheng-ani");
const xxjmAni = document.getElementById("xxjm-ani");
const nideText = document.getElementById("nide");

xinText.addEventListener("click", () => {
  nideText.style.opacity = 1;
  xinAni.beginElement();
});

chengText.addEventListener("click", () => {
  chengAni.beginElement();
  xxjmAni.beginElement();
});

//向晚————————————————————————————————————————
const xiangwanText = document.getElementById("xiangwan");
const xiangwanAni = document.getElementById("xiangwan-ani");
const stoneTexts = document.querySelectorAll("#stones text");

xiangwanText.addEventListener("click", () => {
  setTimeout(function () {
    xiangwanAni.beginElement();
  }, 4500);

  // let count = 0;
  // let time = 800;
  // const intervalID = setInterval(() => {
  //   if (count < 2) time = 3000;
  //   else time = 80;
  //   if (count < stoneTexts.length) {
  //     stoneTexts[count].style.transition = "opacity 1s";
  //     stoneTexts[count].style.opacity = 1;
  //     count++;
  //   } else {
  //     clearInterval(intervalID);
  //   }
  //   console.log(time);
  // }, time);

  let count = 0;

  function revealText() {
    let time = count < 3 ? 1300 : 500; // 计算新的时间间隔
    if (count == 1) time = 700;

    if (count < stoneTexts.length) {
      stoneTexts[count].style.transition = "opacity 1s";
      stoneTexts[count].style.opacity = 1;
      count++;

      setTimeout(revealText, time); // 递归调用，动态设置时间
    }
  }

  revealText();
});
