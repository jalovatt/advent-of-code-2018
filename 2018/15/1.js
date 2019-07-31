

class Unit {
  constructor(team) {
    this.hp = 200;
  }


}

Unit.ap = 3;


function parseInput(input) {


}

function runRound(state) {

  // Get initiative order

  // Process each unit

  // Check if one team has been eliminated
    // Return (rounds * survivors' total hp)


}

function runCombat(state) {
  let rounds = 0;
  let fighting = true;

  while (fighting) {
    fighting = runRound(state)
    rounds++;
  }

  return rounds * currentHp(state);
}
