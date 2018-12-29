/*
*/

const input = require("./input.js");

const example = {
  state: "#..#.#..##......###...###",
  final: ".#....##....#####...#######....#.#..##.",
  notes: {
    "...##": "#",
    "..#..": "#",
    ".#...": "#",
    ".#.#.": "#",
    ".#.##": "#",
    ".##..": "#",
    ".####": "#",
    "#.#.#": "#",
    "#.###": "#",
    "##.#.": "#",
    "##.##": "#",
    "###..": "#",
    "###.#": "#",
    "####.": "#",
  }
};

function sumState(state, min, max) {
  let sum = 0;
  for (let i = min; i <= max; i++) {
    (state[i] === "#") && (sum += i);
  }

  return sum;
}

function afterGenerations(state, notes, n) {
  let states = state.split("");
  let curMin = 0;
  let curMax = states.length;
  // console.log(pots.join(""));

  let lastSum = 0;

  let gen = 1;
  while (gen < (n + 1)) {
    const nextPots = [];



    for (let i = curMin; i <= curMax; i++) {
      const sub = [
        states[i - 2],
        states[i - 1],
        states[i],
        states[i + 1],
        states[i + 2]
      ]
        .map((pot) => pot || ".")
        .join("");

      nextPots[i] = notes[sub] || ".";

    };


    states = nextPots;

    const sum = sumState(states, curMin, curMax);
    console.log(gen + "\t" + sum + " " + (sum - lastSum));
    lastSum = sum;
    gen++;
    curMin = curMin - 5;
    curMax = curMax + 5;
  }

  return [states, curMin + 5, curMax - 5];
}

const part1 = sumState(...afterGenerations(input.state, input.notes, 120));
// console.log(state);

console.log(part1);
console.log("=========================");

const diff = 78;
const sum100 = 10267;

const part2 = (50000000000 - 100) * diff + sum100;
console.log("Part 2 (sum after 50b generations): " + part2);
