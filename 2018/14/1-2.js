const input = 580741;
const example = "37";

function newRecipes(state) {
  const sum =
    parseInt(state.recipes[state.elves[0]]) +
    parseInt(state.recipes[state.elves[1]]);

  return sum.toString().split("");
}


function runStep(state) {
  const add = newRecipes(state);
  add.forEach((val) => state.buffer.add(val));
  state.recipes.push(...add);

  state.elves[0] = (state.elves[0] + parseInt(state.recipes[state.elves[0]]) + 1) % (state.recipes.length);
  state.elves[1] = (state.elves[1] + parseInt(state.recipes[state.elves[1]]) + 1) % (state.recipes.length);
}

class Ring {
  constructor(n) {
    this.size = n + 1;
    this.idx = 0;
    this.arr = [];
  }

  add(val) {
    this.arr[this.idx] = val;
    this.idx = (this.idx + 1) % this.size;
  }

  read() {
    const out = [];
    for (let i = 0; i < this.size; i++) {
      out.push(this.arr[(this.idx + i) % this.size]);
    }

    return out;
  }
}


function printState(state) {
  console.log(state.recipes
    .map((score, idx) => {
      if (state.elves[0] === idx) {
        return `(${score})`;
      } else if (state.elves[1] === idx) {
        return `[${score}]`;
      } else {
        return ` ${score} `;
      }
    })
    .join(" "));
}

function runSteps(initState, n, check) {
  const state = {
    elves: [0, 1],
    recipes: initState.split("")
  };

  const checkLen = (check && check.length);
  state.buffer = new Ring(checkLen);

  while (state.recipes.length < (n + 10)) {

    runStep(state);

    if (check && state.buffer.read().join("").match(check)) {
      console.log(state.buffer.read().join(" "));

      return state.recipes.length - checkLen;
    }
  }

  if (!check) return state.recipes.slice(n, n + 10).join("");
}

console.log("Part 1:");

console.log("After 9 recipes: " + runSteps(example, 9) + " =? 5158916779");
console.log("After 5 recipes: " + runSteps(example, 5) + " =? 0124515891");
console.log("After 18 recipes: " + runSteps(example, 18) + " =? 9251071085");
console.log("After 2018 recipes: " + runSteps(example, 2018) + " =? 5941429882");
console.log(`After ${input} recipes: ` + runSteps(example, input));

console.log("\nPart 2:");
console.log("NOTE: If the output string starts at [0] in the printed array, subtract 1 from the final answer.");

console.log("51589 first appears after " + runSteps(example, 10000, "51589") + " recipes");
console.log("01245 first appears after " + runSteps(example, 10000, "01245") + " recipes");
console.log("92510 first appears after " + runSteps(example, 10000, "92510") + " recipes");
console.log("59414 first appears after " + runSteps(example, 10000, "59414") + " recipes");

console.log("Will take a few minutes...");
console.log(`${input} first appears after ` + runSteps(example, 50000000, `${input}`) + " recipes");
