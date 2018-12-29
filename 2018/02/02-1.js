/*
To make sure you didn't miss any, you scan the likely candidate boxes again,
counting the number that have an ID containing exactly two of any letter and
then separately counting those with exactly three of any letter. You can
multiply those two counts together to get a rudimentary checksum and compare
it to what your device predicts.

For example, if you see the following box IDs:

abcdef contains no letters that appear exactly two or three times.
bababc contains two a and three b, so it counts for both.
abbcde contains two b, but no letter appears exactly three times.
abcccd contains three c, but no letter appears exactly two times.
aabcdd contains two a and two d, but it only counts once.
abcdee contains two e.
ababab contains three a and three b, but it only counts once.

Of these box IDs, four of them contain a letter which appears exactly twice,
and three of them contain a letter which appears exactly three times.
Multiplying these together produces a checksum of 4 * 3 = 12.

What is the checksum for your list of box IDs?
*/

const {assert} = require("chai");
const input = require("./02.input.js");

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
