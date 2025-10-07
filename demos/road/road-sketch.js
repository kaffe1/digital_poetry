const images = document.querySelectorAll(".floating-image");
const background = document.querySelector(".background");

const WIDTH = window.innerWidth - 200,
  HEIGHT = window.innerHeight - 200;
let backRect = background.getBoundingClientRect();

//initial the img position--------------------
images.forEach((image, index) => {
  let r = 50 + Math.random() * 100;

  image.style.width = `${r}px`;
  image.style.height = `${r}px`;

  let x = ((Math.random() + index) * WIDTH) / 6;
  let y = Math.random() * HEIGHT;

  if (x > backRect.left - 100 && x < backRect.right) {
    while (y > backRect.top - 100 && y < backRect.bottom) {
      y = Math.random() * HEIGHT;
    }
  }

  image.style.top = `${y}px`;
  image.style.left = `${x}px`;
});

//add mouse listener for img scaling--------------------
images.forEach((image) => {
  image.addEventListener("mouseover", () => {
    let imgRect = image.getBoundingClientRect();
    let scale = ((WIDTH + 200) / imgRect.width) * 2;
    image.style.transform = `scale(${scale})`;
    image.style.zIndex = 10;
  });

  image.addEventListener("mouseleave", () => {
    image.style.transform = "scale(1)";
    image.style.opacity = 1;
    image.style.zIndex = 1;
  });
});

//record start position
let startPosition = [];
images.forEach((image) => {
  let position = {
    left: image.offsetLeft,
    top: image.offsetTop,
    phaseShift: Math.random() * 6,
  };
  startPosition.push(position);
});
let frameCount = 0;

//make images floating--------------------
animate();
function animate() {
  frameCount++;
  images.forEach((image, index) => {
    floatImage(image, index);
  });

  requestAnimationFrame(animate);
}

function floatImage(image, index) {
  // 更新位置
  positionX =
    startPosition[index].left +
    30 * Math.cos(frameCount / 120 + startPosition[index].phaseShift);
  positionY =
    startPosition[index].top +
    30 * Math.sin(frameCount / 100 + startPosition[index].phaseShift);

  // 更新css元素的位置
  image.style.left = positionX + "px";
  image.style.top = positionY + "px";
}

//switch en & cn when click--------------------
const enButton = document.querySelector(".en-button");
const cnButton = document.querySelector(".cn-button");
const enPoem = document.querySelector(".en-background");
const cnPoem = document.querySelector(".cn-background");
let isEnBtnClicked = false;
let isCnBtnClicked = false;

enButton.addEventListener("click", () => {
  enPoem.style.display = "block";
  cnPoem.style.display = "none";
  enButton.style.backgroundColor = "rgba(199, 199, 199, 0.3)";
  enButton.style.boxShadow = "0px 1px 0px rgba(106, 106, 106, 0.112)";
  cnButton.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  cnButton.style.boxShadow = "0px 1px 6px rgba(106, 106, 106, 0.112)";

  isEnBtnClicked = true;
  isCnBtnClicked = false;
});
cnButton.addEventListener("click", () => {
  cnPoem.style.display = "block";
  enPoem.style.display = "none";
  cnButton.style.backgroundColor = "rgba(199, 199, 199, 0.3)";
  cnButton.style.boxShadow = "0px 1px 0px rgba(106, 106, 106, 0.112)";
  enButton.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  enButton.style.boxShadow = "0px 1px 6px rgba(106, 106, 106, 0.112)";

  isCnBtnClicked = true;
  isEnBtnClicked = false;
});
//en & cn button hover style--------------------
enButton.addEventListener("mouseenter", () => {
  if (!isEnBtnClicked) {
    enButton.style.backgroundColor = "rgba(199, 199, 199, 0.3)";
    enButton.style.boxShadow = "0px 1px 0px rgba(106, 106, 106, 0.112)";
  }
});

enButton.addEventListener("mouseleave", () => {
  if (!isEnBtnClicked) {
    enButton.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    enButton.style.boxShadow = "0px 1px 6px rgba(106, 106, 106, 0.112)";
  }
});

cnButton.addEventListener("mouseenter", () => {
  if (!isCnBtnClicked) {
    cnButton.style.backgroundColor = "rgba(199, 199, 199, 0.3)";
    cnButton.style.boxShadow = "0px 1px 0px rgba(106, 106, 106, 0.112)";
  }
});

cnButton.addEventListener("mouseleave", () => {
  if (!isCnBtnClicked) {
    cnButton.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    cnButton.style.boxShadow = "0px 1px 6px rgba(106, 106, 106, 0.112)";
  }
});
