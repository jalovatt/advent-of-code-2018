const input = require("./10-input.js");

const example = [
  "position=< 9,  1> velocity=< 0,  2>",
  "position=< 7,  0> velocity=<-1,  0>",
  "position=< 3, -2> velocity=<-1,  1>",
  "position=< 6, 10> velocity=<-2, -1>",
  "position=< 2, -4> velocity=< 2,  2>",
  "position=<-6, 10> velocity=< 2, -2>",
  "position=< 1,  8> velocity=< 1, -1>",
  "position=< 1,  7> velocity=< 1,  0>",
  "position=<-3, 11> velocity=< 1, -2>",
  "position=< 7,  6> velocity=<-1, -1>",
  "position=<-2,  3> velocity=< 1,  0>",
  "position=<-4,  3> velocity=< 2,  0>",
  "position=<10, -3> velocity=<-1,  1>",
  "position=< 5, 11> velocity=< 1, -2>",
  "position=< 4,  7> velocity=< 0, -1>",
  "position=< 8, -2> velocity=< 0,  1>",
  "position=<15,  0> velocity=<-2,  0>",
  "position=< 1,  6> velocity=< 1,  0>",
  "position=< 8,  9> velocity=< 0, -1>",
  "position=< 3,  3> velocity=<-1,  1>",
  "position=< 0,  5> velocity=< 0, -1>",
  "position=<-2,  2> velocity=< 2,  0>",
  "position=< 5, -2> velocity=< 1,  2>",
  "position=< 1,  4> velocity=< 2,  1>",
  "position=<-2,  7> velocity=< 2, -2>",
  "position=< 3,  6> velocity=<-1, -1>",
  "position=< 5,  0> velocity=< 1,  0>",
  "position=<-6,  0> velocity=< 2,  0>",
  "position=< 5,  9> velocity=< 1, -2>",
  "position=<14,  7> velocity=<-2,  0>",
  "position=<-3,  6> velocity=< 2, -1>"
];


const lights = input;



function lightFromStr(str) {
  const values = str.match(/n\=\< ?([-\d]+), +([-\d]+)\> v.+y\=\< ?([-\d]+), +([-\d]+)\>/);
  return {x: parseInt(values[1]), y: parseInt(values[2]), dx: parseInt(values[3]), dy: parseInt(values[4])};
}

class Light {

  constructor({x, y, dx, dy}) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  unmove() {
    this.x -= this.dx;
    this.y -= this.dy;
  }

}

function parseLights(lights) {

  const out = [];
  lights.forEach((line) => out.push(new Light(lightFromStr(line))));

  return out;
}

const parsed = parseLights(lights);

function minMaxX(lights) {

  let min, max;
  lights.forEach((light) => {
    min = ((!min && min !== 0) || light.x < min) ? light.x : min;
    max = ((!max && max !== 0) || light.x > max) ? light.x : max;
  });

  return {min, max};

}

function minMaxY(lights) {

  let min, max;
  lights.forEach((light) => {
    min = ((!min && min !== 0) || light.y < min) ? light.y : min;
    max = ((!max && max !== 0) || light.y > max) ? light.y : max;
  });

  return {min, max};

}

let smallest;

function msgIsReadable(lights) {
  const {min, max} = minMaxY(lights);
  if (smallest && (max - min) > smallest) {
    return true;
  } else {
    smallest = (max - min);
    return false;
  }
}

function runLights(lights) {

  let smallest;
  let time = -1;

  while (!msgIsReadable(lights)) {
    lights.forEach((light) => light.move());
    time++;
  }

  lights.forEach((light) => light.unmove());

  return {lights, time};

}


function printLights(lights) {

  // console.log(lights);

  const {min: minX, max: maxX} = minMaxX(lights);
  const {min: minY, max: maxY} = minMaxY(lights);

  // console.log(minX, maxX, minY, maxY);

  const out = Array(1 + maxY - minY).fill().map((row) => Array(1 + maxX - minX).fill("."));

  lights.forEach((light) => {
    const y = light.y - minY;
    const x = light.x - minX;

    !out[y] && (out[y] = []);
    out[y][x] = "#";
  });
  console.log(out.map((row) => row.join("")).join("\n"));
}

const {lights: finished, time} = runLights(parsed);
console.log("Lights are in phase @ " + time);
printLights(finished);
