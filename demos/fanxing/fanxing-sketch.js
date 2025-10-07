//+++++++++++++++++++dev+++++++++++++++++++
//the third scene, when click on flower, there is a bug where flowers can't grow together

//viewport init
window.history.scrollRestoration = "manual";
window.addEventListener("load", () => {
  window.scrollTo(640, 416);
});

//mouse coordinator
// {
//   const coords = document.getElementById("mouseCoords");
//   document.addEventListener("mousemove", (event) => {
//     const mouseX = event.clientX + window.scrollX; // 加上水平滚动距离
//     const mouseY = event.clientY + window.scrollY; // 加上垂直滚动距离

//     coords.textContent = `X: ${mouseX}, Y: ${mouseY}`;

//     coords.style.left = `${mouseX + 10}px`; // 右侧偏移 10px
//     coords.style.top = `${mouseY - 10}px`; // 下方偏移 10px
//     console.log("mouse");
//   });
// }

//大海啊------------------------------------------------------------
//create ocean path id------------
document.addEventListener("DOMContentLoaded", function () {
  const paths = document.querySelectorAll("svg g path"); // 选取所有 <path>

  paths.forEach((path, index) => {
    path.id = `path${index}`; // 生成 id，从 path1 开始
    // path.setAttribute("stroke-dasharray", "10 10");
    path.setAttribute("stroke-linecap", "round");
    const strokeWidth = path.getAttribute("stroke-width");
    const strokeDasharray = path.getAttribute("stroke-dasharray");
    if (strokeWidth === "6" && strokeDasharray) {
      path.setAttribute("stroke-dasharray", "30 50");
    } else if (strokeWidth === "5" && strokeDasharray) {
      path.setAttribute("stroke-dasharray", "40 40");
    } else if (strokeWidth === "4" && strokeDasharray) {
      path.setAttribute("stroke-dasharray", "20 20");
    }
    const animate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    // 设置 animate 属性
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "0");
    animate.setAttribute("to", "-480");
    animate.setAttribute("dur", "5s");
    animate.setAttribute("repeatCount", "indefinite");
    // 将 <animate> 添加到当前的 <path>
    path.appendChild(animate);
  });
});

//海 movement & viewport change------------
document.addEventListener("DOMContentLoaded", function () {
  // 创建文字移动效果
  const oceanPath = document.getElementById("text-path");
  oceanPath.setAttribute("transform", "translate(-60, 50)");
  oceanPath.setAttribute("stroke", "");

  const svg = document.querySelector("svg");

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("font-size", "40");
  text.setAttribute("fill", "black");
  text.setAttribute("id", "moving-text");
  text.style.cursor = "pointer";

  const textPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "textPath"
  );
  textPath.setAttribute("href", "#text-path"); // 绑定到 id="text-path"
  textPath.textContent = "海"; // 文字内容

  const animate = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  animate.setAttribute("attributeName", "startOffset");
  animate.setAttribute("dur", "12s");
  animate.setAttribute("from", "0%");
  animate.setAttribute("to", "100%");
  animate.setAttribute("repeatCount", "indefinite"); // 无限循环

  textPath.appendChild(animate);
  text.appendChild(textPath);
  svg.appendChild(text);

  // 创建消失动画
  const fadeOut = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  fadeOut.setAttribute("attributeName", "fill-opacity");
  fadeOut.setAttribute("from", "1");
  fadeOut.setAttribute("to", "0");
  fadeOut.setAttribute("dur", "2s");
  fadeOut.setAttribute("begin", "click");
  fadeOut.setAttribute("fill", "freeze");

  text.appendChild(fadeOut);

  //click animation
  text.addEventListener("click", function () {
    //text animation
    fadeOut.beginElement();
    const hai = document.getElementById("hai-in-box");
    hai.style.opacity = 1;

    //viewport change

    setTimeout(() => {
      smoothScrollTo(3200, 416, 2000);
      // window.scroll({
      //   left: 3200,
      //   top: 416,
      //   behavior: "smooth", // 平滑滚动
      // });
    }, 3000);
  });
});
//auto scroll--------
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
      // window.scrollTo(scrollX, scrollY);
      window.scrollTo({
        left: scrollX,
        top: scrollY,
      });
      requestAnimationFrame(step);
    } else {
      window.scrollTo({
        left: targetX,
        top: targetY,
      }); // 确保最终到达目标位置
    }
  }

  // 简单的线性缓动函数
  function easeLinear(t) {
    return t;
  }

  requestAnimationFrame(step);
}
//哪一颗星没有光------------------------------------------------------------
//星 movement & viewport change
const stars = document.querySelectorAll(".star");
const halos = document.querySelectorAll(".halo");
const xing = document.getElementById("xing-in-box");
stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    // 找到对应的光晕
    const id = star.id.split("-")[1];
    const halo = document.getElementById(`halo-${id}`);
    halo.classList.add("visible");
    star.classList.add("bounce");

    let lightingStar = document.querySelectorAll(".visible");
    console.log(lightingStar.length);
    if (lightingStar.length == 8) {
      xing.style.opacity = 1;

      //viewport change
      setTimeout(() => {
        smoothScrollTo(3200, 2080, 2000);

        // window.scroll({
        //   left: 3200,
        //   top: 2080,
        //   behavior: "smooth", // 平滑滚动
        // });
      }, 3000);
    }
  });
});

//哪一朵花没有香------------------------------------------------------------
//花 movement & viewport change
const tl = gsap.timeline();
let flowerFlag = 0;
const triggerFlowers = document.querySelectorAll(".trigger-flower");
triggerFlowers.forEach((triggerFlower) => {
  triggerFlower.addEventListener("click", () => {
    tl.fromTo(
      `#${triggerFlower.id}`,
      { opacity: 1 },
      { opacity: 0, duration: 1 }
    )
      .fromTo(
        `#${triggerFlower.id}-1`,
        { opacity: 0 },
        { opacity: 1, duration: 2 }
      )
      .fromTo(
        `#${triggerFlower.id}-2`,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        "-=1.5"
      )
      .fromTo(
        `#${triggerFlower.id}-3`,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        "-=1.5"
      )
      .fromTo(
        `#${triggerFlower.id}-4`,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        "-=1.5"
      )
      .fromTo(
        `#${triggerFlower.id}-5`,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        "-=1.5"
      );
    flowerFlag++;
    if (flowerFlag >= 4) {
      document.getElementById("hua-in-box").style.opacity = 1;
      setTimeout(() => {
        smoothScrollTo(640, 2080, 2000);

        // window.scroll({
        //   left: 640,
        //   top: 2080,
        //   behavior: "smooth", // 平滑滚动
        // });
      }, 8000);
    }
  });
});

//哪一次我的思潮里------------------------------------------------------------
//思潮 movement & viewport change
const thoughtsLines = document.querySelectorAll(".thoughts-line");
const textThoughts = document.querySelectorAll(".text-thoughts");
const thoughtsShadows = document.querySelectorAll(".thoughts-line-shadow");
let thoughtsFlag = 0;
// thoughtsLines.forEach((thoughtsLine) => {
//   thoughtsLine.addEventListener("click", () => {
//     thoughtsLine.style.opacity = 1;
//     thoughtsFlag++;
//     if (thoughtsFlag >= 4) {
//       textThoughts[0].style.opacity = 1;
//       textThoughts[1].style.opacity = 1;

//       //text appear
//       finalTextAppear();

//       setTimeout(() => {
//         smoothScrollTo(640, 416, 6000);
//       }, 2000);
//     }
//   });
// });

thoughtsShadows.forEach((thoughtsShadow, index) => {
  const thoughtsLine = thoughtsLines[index];
  let isClicked = false;
  //hover effect

  thoughtsShadow.addEventListener("mouseenter", () => {
    if (!isClicked) {
      console.log(isClicked, 2);
      thoughtsLine.style.opacity = 1;
    }
  });
  thoughtsShadow.addEventListener("mouseleave", () => {
    if (!isClicked) {
      console.log(isClicked, 2);
      thoughtsLine.style.opacity = 0.1;
    }
  });

  //click effect
  thoughtsShadow.addEventListener("click", () => {
    isClicked = true;
    console.log(isClicked, 1);
    thoughtsLine.style.opacity = 1;
    thoughtsFlag++;
    if (thoughtsFlag >= 4) {
      textThoughts[0].style.opacity = 1;
      textThoughts[1].style.opacity = 1;

      //text appear
      finalTextAppear();

      setTimeout(() => {
        smoothScrollTo(640, 416, 6000);
      }, 2000);
    }
  });
});
function smoothScrollTo(targetLeft, targetTop, duration) {
  const startLeft = window.scrollX;
  const startTop = window.scrollY;
  const distanceLeft = targetLeft - startLeft;
  const distanceTop = targetTop - startTop;

  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / duration, 1); // 计算进度

    // progress = progress < 0.5 ? progress : Math.sqrt(progress);
    window.scrollTo(
      startLeft + distanceLeft * progress,
      startTop + distanceTop * progress
    );

    if (progress < 1) {
      requestAnimationFrame(scrollStep); // 继续滚动
    }
  }

  requestAnimationFrame(scrollStep);
}

//没有你波涛的轻响------------------------------------------------------------
//波涛
function finalTextAppear() {
  const textFinal = document.querySelector(".text-final");
  const textBegin = document.querySelector(".text-begin");
  textBegin.style.display = "none";
  textFinal.style.display = "flex";
}
