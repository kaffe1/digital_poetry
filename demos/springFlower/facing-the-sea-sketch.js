document.addEventListener("DOMContentLoaded", function () {
  //   诗歌内容 - 可以替换为你喜欢的诗
  const poemLines = ["从明天起", "做一个幸福的人", "喂马", "劈柴", "周游世界"];
  // const poemLines = ["hao"];
  const poemLines2 = [
    "从明天起",
    "春暖花开",
    "面朝大海",
    "我有一所房子",
    "关心粮食和蔬菜",
  ];
  const poemLines3 = [
    "从明天起",
    "和每一个亲人通信",
    "告诉他们我的幸福",
    "那幸福的闪电告诉我的",
    "我将告诉每一个人",
  ];
  const poemLineArr = [poemLines, poemLines2];

  const container = document.querySelector(".poem-container");
  const container2 = document.querySelector(".poem-container2");
  const containerArr = [container, container2];
  const radius = 120; // 半径100px
  const centerX = 150; // 容器宽度300px的一半
  const centerY = 150; // 容器高度300px的一半
  let currentAngle = 0;
  let currentAngle2 = 0;

  // 创建诗歌行并定位
  poemLineArr.forEach((poemLines, poemLineIndex) => {
    poemLines.forEach((line, index) => {
      const lineElement = document.createElement("div");
      lineElement.className = "poem-line";
      lineElement.textContent = line;

      // 计算每行的初始角度（均匀分布)
      const angle = (index * (360 / poemLines.length)) % 360;

      // 设置初始位置
      updateLinePosition(lineElement, angle, poemLineIndex);

      containerArr[poemLineIndex].appendChild(lineElement);
    });
  });

  // 更新行位置的函数
  function updateLinePosition(element, angle, poemLineIndex) {
    const radian = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(radian);
    const y = centerY + radius * Math.sin(radian);

    // 计算旋转角度（文字始终指向圆心）
    const rotation = angle + 0;

    if (poemLineIndex == 0) {
      element.style.transformOrigin = "left center";
      element.style.transform = `translate(${x - centerX}px, ${
        y - centerY - 15
      }px) rotate(${rotation}deg)`;
    } else if (poemLineIndex == 1) {
      element.style.transformOrigin = "right center";
      element.style.transform = `translate(${centerX - x}px, ${
        centerY - y - 15
      }px) rotate(${rotation}deg)`;
    }
  }

  // 处理鼠标滚轮事件
  function handleWheel(event) {
    // 阻止默认滚动行为
    event.preventDefault();

    // 根据滚轮方向调整角度
    const delta = -Math.sign(event.deltaY);
    currentAngle += delta * 0.8;
    const delta2 = Math.sign(event.deltaY);
    currentAngle2 += delta2 * 0.8;

    // 更新所有行的位置
    const lines = document.querySelectorAll(".poem-container .poem-line");
    lines.forEach((line, index) => {
      const originalAngle = (index * (360 / poemLines.length)) % 360;
      const newAngle = originalAngle + currentAngle;
      updateLinePosition(line, newAngle, 0);
      //chagne opacity
      if (currentAngle > -360) {
        line.style.opacity = 1;
      } else {
        line.style.opacity = 0;
      }
    });

    const lines2 = document.querySelectorAll(".poem-container2 .poem-line");
    lines2.forEach((line, index) => {
      const originalAngle = (index * (360 / poemLines.length)) % 360;
      const newAngle = originalAngle + currentAngle2;
      updateLinePosition(line, newAngle, 1);
      //chagne opacity
      if (currentAngle2 < 350 || currentAngle2 > 670) {
        line.style.opacity = 0;
      } else {
        line.style.opacity = 1;
      }
    });
  }

  const body = document.querySelector("body");
  // 添加滚轮事件监听
  body.addEventListener("wheel", handleWheel);

  //play-----------------------------
  let frameCount = 0;
  function play() {
    currentAngle = -frameCount * 0.3;
    currentAngle2 = frameCount * 0.3;

    // 更新所有行的位置
    const lines = document.querySelectorAll(".poem-container .poem-line");
    lines.forEach((line, index) => {
      const originalAngle = (index * (360 / poemLines.length)) % 360;
      const newAngle = originalAngle + currentAngle;
      updateLinePosition(line, newAngle, 0);
    });

    const lines2 = document.querySelectorAll(".poem-container2 .poem-line");
    lines2.forEach((line, index) => {
      const originalAngle = (index * (360 / poemLines.length)) % 360;
      const newAngle = originalAngle + currentAngle2;
      updateLinePosition(line, newAngle, 1);
    });

    frameCount++;

    requestAnimationFrame(play);
    console.log("执行动画帧...");
  }
  // play();
});
