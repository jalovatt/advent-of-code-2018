const {assert} = require("chai");
const input = require("./input.js");

const example = [
  "abcdef",
  "bababc",
  "abbcde",
  "abcccd",
  "aabcdd",
  "abcdee",
  "ababab",
];

function scanBox(box) {

  const replaced = box
    .split("")
    .sort()
    .join("")
    .replace(RegExp("(.)\\1{" + 2 + "}", "g"), "#")
    .replace(RegExp("([^#])\\1{" + 1 + "}", "g"), "@");

  return [replaced.match("@") ? 1 : 0, replaced.match("#") ? 1 : 0];
}

function checkSum(arr) {
  const checks = arr
    .map((box) => scanBox(box))
    .reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0]);

  return checks[0] * checks[1];
}

describe("Examples", () => {

  it("Should find no matches", () => {
    assert.deepEqual(scanBox(example[0]), [0, 0])
  });

  it("Should find both", () => {
    assert.deepEqual(scanBox(example[1]), [1, 1])
  });

  it("Should find 2", () => {
    assert.deepEqual(scanBox(example[2]), [1, 0])
  });

  it("Should find 3", () => {
    assert.deepEqual(scanBox(example[3]), [0, 1])
  });

  it("Should find 2, but only count once", () => {
    assert.deepEqual(scanBox(example[4]), [1, 0])
  });

  it("Should find 2", () => {
    assert.deepEqual(scanBox(example[5]), [1, 0])
  });

  it("Should find 3, but only count once", () => {
    assert.deepEqual(scanBox(example[6]), [0, 1])
  });

  it("Should produce a checksum of 4 * 3 = 12", () => {
    assert.equal(checkSum(example), 12);
  });
});

describe("Puzzle Solution", () => {

  const answer = checkSum(input);
  it(answer.toString(), () => {
    assert.exists(answer);
  });

});
