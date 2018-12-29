const input = require("./input");

let freq = input.reduce( (acc, cur) => acc + cur, 0);
console.log("freq: " + freq);
