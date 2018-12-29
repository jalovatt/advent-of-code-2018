const fs = require("fs");
const input = require("./input.js");

const example = `/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/`;


class Cart {

  constructor(x, y, dir, map) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.map = map;
    this.turns = 0;
    this.alive = true;
  }

  move() {
    if (!this.alive) return;

    const d = Cart.dirs[this.dir];

    this.x += d[0];
    this.y += d[1];
    this.updateDir();
  }

  updateDir() {

    const cell = this.map[this.y][this.x];
    if (cell === "+") {
      (Cart.turns[this.turns]) && (this.dir = Cart.turns[this.turns][this.dir]);
      this.turns = (this.turns + 1) % 3;
    } else if (Cart.corners[cell]) {
      this.dir = Cart.corners[cell][this.dir];
    }
  }

  posEquals(other) {
    return (this.x === other.x && this.y === other.y);
  }

}

Cart.dirs = {
  "^": [0, -1],
  "v": [0, 1],
  ">": [1, 0],
  "<": [-1, 0]
};

Cart.corners = {
  "\\": {
    "^": "<",
    "v": ">",
    "<": "^",
    ">": "v"
  },
  "/": {
    "^": ">",
    "v": "<",
    "<": "v",
    ">": "^"
  }
};

Cart.turns = {
  // Left
  [0]: {
    "^": "<",
    "v": ">",
    "<": "v",
    ">": "^"
  },

  // Right
  [2]: {
    "^": ">",
    "v": "<",
    "<": "^",
    ">": "v"
  }
};

function parseInput(input) {

  const map = input
    .split("\n")
    .map((row) => row.split(""));

  const carts = [];

  map
    .forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.match(/[<>^v]/)) {
          carts.push(new Cart(x, y, cell, map));
          map[y][x] = (cell === ">" || cell === "<") ? "-" : "|";
        }
      });
    });

  return [map, carts];
}

function orderCarts(carts) {
  return carts
    .filter((cart) => cart.alive)
    .sort((a, b) => {
      const rows = a.y - b.y;
      if (rows) return rows;
      return a.x - b.x;
    });
}

function moveCarts(carts) {
  carts.forEach((cart) => cart.move());
}

function printState(map, carts) {

  let out = map.map((row) => [...row]);
  carts.forEach((cart) => {
    out[cart.y][cart.x] = cart.dir;
  });

  console.log(out.map((row) => row.join("")).join("\n"));
  console.log();
}

function checkCollisions(carts) {
  for (let i = 0; i < carts.length - 1; i++) {
    for (let j = i + 1; j < carts.length; j++) {
      if (carts[i].alive && carts[j].alive && carts[i].posEquals(carts[j])) {
        carts[i].alive = false;
        carts[j].alive = false;
        console.log("Collision @ " + carts[i].x + ", " + carts[i].y);
      }
    }
  }
}

function printCarts(carts) {
  carts.forEach((cart) => {
    console.log(cart.x, cart.y, cart.dir, cart.turns, (cart.alive ? "ALIVE" : "DEAD"));
  });
}

function runStep(carts) {
  const ordered = orderCarts(carts);
  if (ordered.length === 1) return ordered;
  ordered.forEach((cart) => {
    cart.move();
    checkCollisions(ordered);
  });

}

function runSteps(map, carts, n) {
  for (let i = 0; i < n; i++) {
    const final = runStep(carts);
    if (final) {
      console.log("\nLast cart (tick " + i + "):");
      printCarts(final);
      return;
    }
  }
}


const [map, carts] = parseInput(input);
runSteps(map, carts, 15000);
