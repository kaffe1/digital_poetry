let [WIDTH, HEIGHT] = [window.innerWidth, 430];
let COLOR_BG = [240, 232, 220, 200];
// let COLOR_BG = [230, 222, 210];
let COLOR_STROKE = [150, 135, 130, 60];
let COLOR_FILL = [255, 250, 245, 130];
// let COLOR_FILL = [255, 250, 235, 100];
let STROKE_WEIGHT = 3;
let [STATE_MOVE, STATE_WHIRL] = [0, 1];
let N_PEN = 1;
let pens = [];
let poem = "去留无意漫随天外云卷云舒   ";
let poemPointer = 0;
let textR;
const button = document.querySelector(".read");
let isPressed = false;
let myFont;

button.addEventListener("click", () => {
  isPressed = true;
});

//----------------------------------------------

function setup() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("myCanvas");
  canvas.position(0, 200);
  textFont(myFont, 32);

  background(COLOR_BG);
  noStroke();
  //   frameRate(20);
  poem = poem.split("");
  console.log(poem);
  for (let i = 0; i < N_PEN; i++) {
    pens.push(
      new_pen.apply(
        null,
        i == 0
          ? [WIDTH / 8, HEIGHT / 2]
          : [Math.random() * WIDTH, Math.random() * HEIGHT]
      )
    );
  }
}
function draw() {
  if (isPressed) {
    if (frameCount % 3 == 0) pens.map(update_pen);
  }
}

//----------------------------------------------
function preload() {
  myFont = loadFont("assets/LongCang-Regular.ttf");
}
function new_pen(x, y) {
  return {
    state: STATE_MOVE,
    x: x,
    y: y,
    px: x,
    py: y,
    radius: 80,
    speed: 0.5,
    ratio: 1,
    step: 0,
    center: [0, 0],
  };
}

function update_pen(pen) {
  let multiplier = 1;

  //decide move state
  if (pen.state == STATE_MOVE) {
    pen.x += 20 * pen.speed;
    pen.y += (noise(frameCount, 2) - 0.5) * 50;
    pen.step += pen.speed;
    if (pen.step > pen.radius / 8) {
      pen.state = STATE_WHIRL;
      pen.step = 0;
      pen.center = [pen.x, pen.y - pen.radius / 3];
      pen.ratio = Math.random() * 0.5 + 0.3;
    }
    multiplier = pen.step / 5;
  } else if (pen.state == STATE_WHIRL) {
    let rr =
      (pen.radius - pen.step * 2) * (noise(frameCount * 0.5) * 0.6 + 0.4);
    let a = -pen.step * 0.5 + Math.PI / 2;
    pen.x = Math.cos(a) * rr + pen.center[0];
    pen.y = Math.sin(a) * rr * pen.ratio + pen.center[1];
    pen.step += 1;
    if (rr <= 1) {
      pen.state = STATE_MOVE;
      pen.speed = Math.random() * 0.8 + 0.2;
      pen.radius = Math.random() * 60 + 20;
      pen.step = 0;
    }
    multiplier = 2;
    textR = rr;
  }

  //draw circle
  let v = [pen.x - pen.px, pen.y - pen.py];
  let m = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  let n = [v[0] / m, v[1] / m];

  let r = m * multiplier;
  n = [-n[1], n[0]];

  let mod_x = (x) => (x + width * 100) % width;
  let mod_y = (y) => (y + height * 100) % height;

  fill(COLOR_STROKE);
  ellipse(
    mod_x(pen.px) + n[0] * STROKE_WEIGHT,
    mod_y(pen.py) + n[1] * STROKE_WEIGHT,
    r,
    r
  );
  fill(COLOR_FILL);
  ellipse(mod_x(pen.px), mod_y(pen.py), r, r);

  //draw peom
  if (frameCount % 60 == 0 && pen.state == STATE_WHIRL)
    drawPoem(mod_x(pen.px), mod_y(pen.py));

  pen.px = pen.x;
  pen.py = pen.y;
}

function drawPoem(x, y) {
  fill(0);
  let size = textR > 20 ? textR : 20;
  size = size > 40 ? 40 : size;
  textSize(size);

  text(poem[poemPointer % poem.length], x, y);
  poemPointer++;
}
