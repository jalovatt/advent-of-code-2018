const {assert} = require("chai");
const input = require("./input.js");

const example = [
  "abcde",
  "fghij",
  "klmno",
  "pqrst",
  "fguij",
  "axcye",
  "wvxyz",
];


function compareBoxes(a, b) {

  const total = a.split("").reduce((acc, cur, i) => {
    return acc + ((cur !== b[i]) ? 1 : 0);
  }, 0);

  return total;
}

function findCommonBoxes(arr) {

  for (let i = 0, l = arr.length; i < l-1; i++) {
    for (let j = 1; j < l; j++) {
      if (compareBoxes(arr[i], arr[j]) === 1) return [arr[i], arr[j]];
    }
  }
}

function findCommonLetters(arr) {

  const boxes = findCommonBoxes(arr);
  if (!boxes) return false;

  return boxes[0]
    .split("")
    .reduce((acc, cur, i) => {
      return acc + ((cur === boxes[1][i]) ? cur : "");
    }, "");

}


describe("Examples", () => {

  it("Should find five differences", () => {
    assert.equal(compareBoxes(example[0], example[1]), 5);
  });

  it("Should find two differences", () => {
    assert.equal(compareBoxes(example[0], example[5]), 2);
  });

  it("Should find one difference", () => {
    assert.equal(compareBoxes(example[1], example[4]), 1);
  });

  it("Should find the correct boxes", () => {
    assert.deepEqual(findCommonBoxes(example), [example[1], example[4]]);
  });

  it("Should return the common letters", () => {
    assert.deepEqual(findCommonLetters(example), "fgij");
  });

});

describe("Puzzle Solution", () => {

  let answer = findCommonLetters(input);
  it(answer.toString(), () => {
    assert.exists(answer);
  });

});
