const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Events,
  Body,
  Query,
} = Matter;
const engine = Engine.create();
const applyForceRate = 0.001;
const world = engine.world;
const poemStr = "山一程水一程身向榆关那畔行夜深千帐灯";
const poemArr = poemStr.split("");
let flag = 0;

//-------------------------------------create physical word
const w = window.innerWidth * 2;
const h = window.innerHeight;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: w,
    height: h,
    wireframes: false,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);
const mouse = Mouse.create(render.canvas);

//-------------------------------------water
const waterLevel = (2 / 3) * h;
const waterHeight = h - waterLevel;
const water = Bodies.rectangle(w / 2, (waterLevel + h) / 2, w, (1 / 3) * h, {
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "rgba(36, 36, 157, 0.4)" },
});
World.add(world, water);
//-------------------------------------water bubbles
const waterDrops = [];
const dropCount = 150;
let bubblePos = [];
for (let i = 0; i < dropCount; i++) {
  let drop = Bodies.circle(
    Math.random() * w,
    waterLevel + 10 + Math.random() * waterHeight,
    1 + Math.random() * 10,
    {
      density: 0.001,
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: `rgba(10, 100, ${100 + Math.random() * 155}, 0.5)`,
      },
    }
  );
  waterDrops.push(drop);
  let pos = {
    x: drop.position.x,
    y: drop.position.y,
  };
  bubblePos.push(pos);
}
World.add(world, waterDrops);
// Events.on(engine, "beforeUpdate", () => {
//   waterDrops.forEach((drop) => {
//     const randomForceX = (Math.random() - 0.5) * 0.0005; // 随机水平力
//     const randomForceY = (Math.random() - 0.5) * 0.0005 - 0.0001; // 随机垂直力
//     Body.applyForce(drop, drop.position, { x: randomForceX, y: randomForceY });
//   });
// });

//-------------------------------------boxes
let boxes = [];
let boxOriginalR = [];
const boxFinalR = [
  39.5, 35, 35, 39.5, 35, 35, 30, 30, 30, 30, 39.8, 39.8, 39.8, 35, 37, 38.5,
  39, 39.5,
];
for (let i = 0; i < poemArr.length; i++) {
  let box = Bodies.circle(75 + i * 77, 200, 35, {
    density: 0.001,
    restitution: 0.6,
    isStatic: true,
  });
  boxes.push(box);
  boxOriginalR.push(20);
}
World.add(world, boxes);
//-------------------------------------texts
const ctx = render.context;
const fontSize = 30;
//------------------------------------------------------------------
//------------------------------------------------------------------
Events.on(engine, "beforeUpdate", () => {
  //bubbles move
  bubblesMove();
  //update boxes' states
  updateBoxState();
  //Buoyancy
  applyBuoyance();
  //text
  drawTexts();
  flag++;
});

function applyBuoyance() {
  boxes.forEach((body) => {
    let bottom = body.position.y + body.circleRadius;

    // calculate the wet area
    if (bottom > waterLevel) {
      let submergedHeight = Math.min(
        bottom - waterLevel,
        body.circleRadius * 2
      );
      let H = submergedHeight;
      let R = body.circleRadius;
      let theta = Math.acos((H - R) / R);
      let submergedRatio = 1 - (theta - Math.sin(2 * theta)) / (2 * Math.PI);

      // cal the buoyancy
      let boxS = Math.PI * Math.pow(R, 2);
      let buoyancyForce = 0.001 * 1 * submergedRatio * boxS * (8 / 7) * (8 / 7); //F = pgv

      Body.applyForce(body, body.position, {
        x: 0,
        y: -buoyancyForce * applyForceRate,
      });

      // 增加阻力，模拟水的粘滞性
      body.frictionAir = 0.12 * submergedRatio;
    } else {
      // 在空气中时减少空气阻力
      body.frictionAir = 0.01;
    }
  });
}
function drawTexts() {
  ctx.font = `${fontSize}px myFont`;
  ctx.fillStyle = "white";

  boxes.forEach((box, index) => {
    ctx.fillText(
      `${poemArr[index]}`,
      box.position.x - fontSize / 2,
      box.position.y + fontSize / 4
    );
  });
}
function updateBoxState() {
  boxes.forEach((body, index) => {
    if (body.isStatic) {
      const collisions = Query.point([body], mouse.position);
      if (collisions.length > 0) {
        Body.setStatic(body, false);
        // Body.setDensity(body, 0.001);
        Body.setMass(
          body,
          0.001 * Math.PI * boxFinalR[index] * boxFinalR[index]
        );
        // body.inertia = Body._inertiaScale * body.mass * 1;
        let b = mapRange(boxFinalR[index], 30, 40, 200, 0);
        body.render.fillStyle = `rgba(255, 250, ${b}, 0.5)`;
      }
    }
  });
}
function mapRange(x, a, b, c, d) {
  return c + ((x - a) * (d - c)) / (b - a);
}
function bubblesMove() {
  waterDrops.forEach((drop, index) => {
    drop.position.x = bubblePos[index].x + 3 * Math.cos(flag * 0.01 + index);
    drop.position.y = bubblePos[index].y + 3 * Math.sin(flag * 0.02 + index);
  });
}
