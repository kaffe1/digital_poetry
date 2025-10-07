let time = [
  2.169, 3.836, 4.138, 4.373, 4.783, 6.303, 6.855, 7.165, 7.519, 7.957, 10.564,
  11.403, 11.669, 11.904, 12.3, 13.764, 14.014, 14.474, 14.734, 14.998, 15.448,
  16.946, 17.23, 17.628, 20.463, 21.832, 22.101, 22.334, 22.705, 24.128, 24.379,
  24.894, 25.278, 25.535, 25.965, 28.349, 28.571, 28.949, 30.304, 30.656,
  31.887, 32.098, 32.35, 32.739, 33.116, 35.064, 35.362, 36.439, 36.699, 37.167,
  37.464, 37.682, 38.014, 39.272, 39.509, 39.883, 43.174, 43.399, 43.645, 43.88,
  44.272, 45.905, 46.394, 46.704, 47.01, 47.428, 49.399, 49.722, 50.845, 51.098,
  51.512, 53.012, 53.217, 53.553, 55.028, 55.332, 56.462, 56.71, 57.051, 59.256,
  60.132, 60.615, 60.934, 61.252, 62.005, 62.332, 63.934, 64.251, 64.733,
  65.111, 65.468, 67.52, 67.803, 68.118, 68.367, 70.263, 70.553, 70.819, 71.215,
  71.45, 71.753, 73.111, 73.434, 73.803, 74.064, 74.364, 75.583, 76.229, 76.595,
  76.883, 77.28, 80.252, 80.481, 80.72, 81.014, 81.863, 82.265, 82.599, 82.866,
  83.164, 84.278, 84.522, 85.252, 85.495, 85.734, 85.945, 86.266, 87.267,
  88.102, 88.399, 88.698, 88.998, 89.305, 91.302, 92.026, 92.408, 92.785,
  94.599, 95.373, 96.636, 97.082,
];
// let time = [];
//---------------------------------to adjust the html

const poems = [".p1", ".p2", ".p3", ".p4", ".p5"];
const texts = []; //p innerText arr
//p element arr
const poemContainers = poems.map((selector) =>
  document.querySelector(selector)
);
poemContainers.forEach((poem, index) => {
  texts[index] = poem.innerText;
  poem.innerHTML = "";
});

let index = 0;

for (let i = 0; i < texts.length; i++) {
  for (let char of texts[i]) {
    if (!isChinesePunctuation(char)) {
      let span = document.createElement("span");
      span.classList.add(`char${index}`);
      span.classList.add(`char`);
      span.innerText = char;
      poemContainers[i].appendChild(span);
      time.push(index / 2);
      index++;
    } else {
      let span = document.createElement("span");
      span.innerText = "，";
      poemContainers[i].appendChild(span);
    }
  }
}

function isChinesePunctuation(char) {
  const regex = /[\u3000-\u303F\uFF00-\uFFEF]/;
  return regex.test(char);
}
//---------------------------------to read the poem
const buttonRead = document.querySelector(".start-button");
let tl = gsap.timeline();
const wordAppearTime = 0.5;

buttonRead.addEventListener("click", () => {
  for (let i = 0; i <= index; i++) {
    let deltTime;
    if (!timeRecords.length) {
      deltTime = i === 0 ? 0 : time[i] - time[i - 1] - wordAppearTime;
      // console.log("time");
    } else {
      deltTime =
        i === 0 ? 0 : timeRecords[i] - timeRecords[i - 1] - wordAppearTime;
      // console.log("timeRecords");
    }
    let deltTimeStr = deltTime > 0 ? `+=${deltTime}` : `-=${-deltTime}`;
    //timeline
    tl.from(
      `.char${i}`,
      {
        opacity: 0,
        y: -10,
        duration: wordAppearTime,
      },
      deltTimeStr
    );
  }
  console.log(timeRecords);
});

//---------------------------------to get the rhythm
const buttonRecord = document.querySelector(".record-button");
let startTime = null;
let timeRecords = [];
let wordFlag;

buttonRecord.addEventListener("click", function () {
  startTime = performance.now();
  timeRecords = [];
  // console.log("计时开始！");
  wordFlag = 0;
});

document.addEventListener("keydown", function (event) {
  if (startTime && event.code === "Space") {
    event.preventDefault();
    let elapsedTime = (performance.now() - startTime) / 1000; // 转换为秒
    timeRecords.push(Number(elapsedTime.toFixed(3)));

    changeConnectedWord(wordFlag);
    wordFlag++;

    // console.log(`按键时间: ${elapsedTime.toFixed(3)} 秒`);
  }
});

function changeConnectedWord(i) {
  gsap.to(`.char${i}`, {
    duration: 0.25,
    y: -10,
    color: "red",
    ease: "ease.out",
    onComplete: () => {
      gsap.to(`.char${i}`, {
        duration: 0.25,
        y: 0,
        color: "black",
        ease: "ease.out",
      });
    },
  });
}

//refresh button hover
const refreshButton = document.querySelector(".refresh-button");
const backImage = document.querySelector(".refresh-img");
const whiteImage = document.querySelector(".refresh-hover-img");
if (refreshButton && backImage && whiteImage) {
  refreshButton.addEventListener("mouseenter", () => {
    backImage.style.display = "none";
    whiteImage.style.display = "inline-block";
  });

  refreshButton.addEventListener("mouseleave", () => {
    backImage.style.display = "inline-block";
    whiteImage.style.display = "none";
  });
}
