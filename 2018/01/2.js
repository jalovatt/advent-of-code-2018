const input = require("./input");

function findDuplicateFreq(arr) {

  let i = 0;
  let l = arr.length;
  let current = 0;

  const freqs = [];

  while (freqs.indexOf(current) === -1) {
    freqs.push(current);
    current += arr[i];
    i = (i + 1) % l;
  }

  return current;

}

const tests = [
  {arr: [1,-1], ans: 0},
  {arr: [3,3,4,-2,-4], ans: 10},
  {arr: [-6,3,8,5,-6], ans: 5},
  {arr: [7,7,-2,-7,-4], ans: 14}
];

tests.forEach((test) => {
  console.log(test.arr + " = " + test.ans + ", got " + findDuplicateFreq(test.arr));
});

// *TAKES A WHILE*
console.log("freq: " + findDuplicateFreq(input));
