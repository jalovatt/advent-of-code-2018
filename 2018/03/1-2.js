const {assert} = require("chai");
const input = require("./input");

const fabric = new Array(1000).fill(null).map(() => new Array(1000).fill(0));

Object.values(input).forEach( (claim) => {

  for (let y = claim.y, b = claim.y + claim.h; y < b; y++) {
    for (let x = claim.x, r = claim.x + claim.w; x < r; x++) {

      fabric[y][x] += 1;

    }
  }

});

const overlaps = fabric.reduce((total, row) => {

  return total + row.reduce((sum, cell) => sum + ((cell > 1) ? 1 : 0), 0);

}, 0);

console.log("Contested squares: " + overlaps);



Object.keys(input).forEach( (id) => {

  const claim = input[id];

  let sole = true;

  for (let y = claim.y, b = claim.y + claim.h; y < b; y++) {
    for (let x = claim.x, r = claim.x + claim.w; x < r; x++) {

      if (fabric[y][x] > 1) {
        sole = false;
        break;
      }
    }

    if (!sole) break;

  }

  if (sole) {
    console.log("Claim #" + id + " has no overlaps");
    return;
  };

});
