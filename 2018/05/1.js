/*
*/

const input = require("./input.js");
const example = "dabAcCaCBAcCcaDA";

function stripReactions(input) {

  let output = input;
  let removed;

  do {

    removed = false;

    let idx = 0;
    while (idx < (output.length - 1)) {
      if (output[idx].toLowerCase() === output[idx+1].toLowerCase() &&
          output[idx] !== output[idx+1]) {

        output = output.slice(0, idx) + output.slice(idx+2);
        removed = true;
      }
      idx++;
    }

  } while (removed);

  return output;

}

const result = stripReactions(example);
console.log(result);
console.log(result.length);
