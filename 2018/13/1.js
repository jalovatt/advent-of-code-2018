/*
*/

const input = require("./input.js");

const example = `/->-\
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/`;


class Cart {

  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }

  move() {
    const d = this.dirs[this.dir];
    this.x += d[0];
    this.y += d[1];
  }
}

Cart.dirs = {
  "^": [0, -1],
  "v": [0, 1],
  ">": [1, 0],
  "<": [-1, 0]
};

function parseInput(input) {

  const map = input.split("\n");
  const carts = [];

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.match(/[<>^v]/)) {
        const cart = new Cart(x, y, cell);
      }
    });
  });

  return map, carts;
}
