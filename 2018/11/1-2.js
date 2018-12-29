const input = 2187;
const example = 42;

const squareSize = 3;

function cellLevel(x, y, serial) {
  const rackId = x + 10;
  return Math.floor(((rackId * y + serial) * rackId) / 100) % 10 - 5;
}

// console.log(cellLevel(3,5,8) + " =? " + 4);
// console.log(cellLevel(122,79,57) + " =? " + -5);
// console.log(cellLevel(217,196,39) + " =? " + 0);
// console.log(cellLevel(101,153,71) + " =? " + 4);

function findSquareSum(rack, x, y, size) {

  let sum = 0;
  for (let curY = y, maxY = y + size; curY < maxY; curY++) {
    for (let curX = x, maxX = x + size; curX < maxX; curX++) {
      const val = rack[curY] && rack[curY][curX] && rack[curY][curX].level;
      sum += (val) ? val : 0;
    }
  }

  return sum;
}

function updateMaxSum(x, y, sum, maxSum) {
  return (!maxSum || sum > maxSum.sum) ? {x, y, sum} : maxSum;
}

function findLargestSubsquare(serial, size) {

  let maxSum;

  const rack = [];

  for (let y = 299; y >= 0; y--) {
    for (let x = 299; x >= 0; x--) {
      if (!rack[y]) rack[y] = [];
      rack[y][x] = {level: cellLevel(x, y, serial)};
      const sum = findSquareSum(rack, x, y, size);
      maxSum = updateMaxSum(x, y, sum, maxSum);
    }
  }

  return maxSum;
}

const maxSum = findLargestSubsquare(example, squareSize);
console.log(maxSum);
console.log(maxSum.sum);

function findLargestVariableSubsquare(rack) {

  const sums = [];

  for (let i = 0; i < 20; i++) {
    const sum = findLargestSubsquare(rack, i);
    sum.size = i;
    console.log(`\tsum @ size ${i}: ` + JSON.stringify(sum));
    sums.push(sum);
  }

  return sums.sort((a,b) => b.level > a.level)[0];

}

findLargestVariableSubsquare(input);
