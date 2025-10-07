//video controler---------------------------------
const sound = document.querySelector(".sound-img");
const noSound = document.querySelector(".no-sound-img");
const video = document.querySelector(".video");

sound.addEventListener("click", () => {
  sound.style.display = "none";
  noSound.style.display = "block";
  video.muted = true;
});
noSound.addEventListener("click", () => {
  noSound.style.display = "none";
  sound.style.display = "block";
  video.muted = false;
});
//quick-img jump like river---------------------------------

const quickDemos = document.querySelectorAll(".quick-demo-ctn");
const quickDemoImgs = document.querySelectorAll(".quick-demo-ctn img ");

let t = 0;
let visualFrozens = [false, false, false, false, false]; // 控制视觉是否跟随逻辑变化
let lastTs = [0, 0, 0, 0, 0]; // 实时记录逻辑目标值

function animate() {
  quickDemos.forEach((box, index) => {
    const mappedIndex = map(index, 0, 4, 0, Math.PI);
    const y = Math.sin(t + Math.sin(mappedIndex) * 3) * 50; // 逻辑目标位置
    lastTs[index] = t;

    if (!visualFrozens[index]) {
      box.style.top = `${y}px`;
    }
  });
  t += 0.025;
  requestAnimationFrame(animate);
}
animate();
function map(value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

quickDemoImgs.forEach((quickDemoImg, index) => {
  const box = quickDemos[index];

  quickDemoImgs[index].addEventListener("mouseenter", () => {
    visualFrozens[index] = true;
  });

  quickDemoImgs[index].addEventListener("mouseleave", () => {
    box.style.transition = "top 1s";
    //1.5 = 0.025*60
    const mappedIndex = map(index, 0, 4, 0, Math.PI);
    const targetY =
      Math.sin(lastTs[index] + 1.5 + Math.sin(mappedIndex) * 3) * 50;
    box.style.top = `${targetY}px`; // 平滑补回逻辑目标位置

    setTimeout(() => {
      box.style.transition = ""; // 清除 transition，避免干扰下一帧逻辑更新
      visualFrozens[index] = false;
    }, 1000);
  });
});

//change components when clicked---------------------------------

const components = document.querySelectorAll(".component");
function showComponent(className) {
  components.forEach((comp) => {
    if (comp.classList.contains(`${className}`)) {
      comp.style.display = "flex";
      changeBg(comp);
      setTimeout(() => {
        comp.style.opacity = 1;
      }, 1000);
    } else {
      comp.style.opacity = 0;
      setTimeout(() => {
        comp.style.display = "none";
      }, 1000);
    }
  });
}
function changeBg(appearedComp) {
  const noneVideoCtn = document.querySelector(".none-video");
  const rect = appearedComp.getBoundingClientRect();
  noneVideoCtn.style.height = rect.height + 1700 + "px";
}
window.onload = function () {
  //----------!! chagne behavior instead of change state appearance !!----------
  // const noneVideoCtn = document.querySelector(".none-video");
  // if (noneVideoCtn) {
  //   noneVideoCtn.style.height =
  //     components[0].getBoundingClientRect().height + 1700 + "px";
  // }
  controlBtns[0].click();
};

//change control btn style when click---------------------------------
const controlBtns = document.querySelectorAll(".control-btn");
controlBtns.forEach((controlBtn, index) => {
  controlBtn.addEventListener("click", () => {
    console.log("clicked");
    for (let i = 0; i < controlBtns.length; i++) {
      if (i == index) {
        controlBtns[i].classList.add("active");
      } else {
        controlBtns[i].classList.remove("active");
      }
    }
  });
});

//walk into demo pages --------------------------------url
function intoDemo(str) {
  const name = "_blank";
  const width = 1280;
  const height = 830;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes`;

  // const url = "demos/April/April.html";
  const url = `demos/${str}/${str}.html`;

  const newWindow = window.open(url, name, features);
  if (newWindow) {
    newWindow.focus();
  } else {
    alert("浏览器阻止了弹出窗口，请允许弹窗或关闭拦截器。");
  }
  // window.open("demos/April/April.html", "_blank");
}

//no draggable img
const imgs = document.querySelectorAll("img");
imgs.forEach((img) => {
  img.draggable = false;
});
