/*
*/

const input = require("./05-input.js");
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


function findProblematicUnit(input) {

  let shortest;
  for (let i = 97; i < 123; i++) {
    const char = String.fromCharCode(i);
    const exp = RegExp("[" + char + char.toUpperCase() + "]", "g");

    const result = stripReactions(input.replace(exp, ""));
    if (!shortest || result.length < shortest.result.length) {
      shortest = {char, result};
    }

  }

  return shortest;
}

const shortest = findProblematicUnit(input);
console.log(shortest);
console.log(shortest.char + " => " + shortest.result.length);
