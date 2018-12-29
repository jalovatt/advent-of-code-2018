/*
*/

const {assert} = require("chai");
const input = require("./input.js");

const exampleInput = [

  "[1518-11-01 00:30] falls asleep",
  "[1518-11-03 00:05] Guard #10 begins shift",
  "[1518-11-01 23:58] Guard #99 begins shift",
  "[1518-11-02 00:40] falls asleep",
  "[1518-11-05 00:45] falls asleep",
  "[1518-11-01 00:55] wakes up",
  "[1518-11-04 00:02] Guard #99 begins shift",
  "[1518-11-04 00:36] falls asleep",
  "[1518-11-02 00:50] wakes up",
  "[1518-11-03 00:29] wakes up",
  "[1518-11-05 00:03] Guard #99 begins shift",
  "[1518-11-01 00:00] Guard #10 begins shift",
  "[1518-11-05 00:55] wakes up",
  "[1518-11-01 00:05] falls asleep",
  "[1518-11-03 00:24] falls asleep",
  "[1518-11-01 00:25] wakes up",
  "[1518-11-04 00:46] wakes up",
];

function parseInput(lines) {

  const out = [];
  lines.forEach((line) => {
    const v = line.match(/\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.+)/).slice(1);
    out.push({Y: parseInt(v[0]), M: parseInt(v[1]), D: parseInt(v[2]), h: parseInt(v[3]), m: parseInt(v[4]), msg: v[5]});
  });

  return out;
}

function sortInput(arr) {

  return arr.sort((a,b) => {
    return  ((a.Y !== b.Y) && (a.Y - b.Y)) ||
            ((a.M !== b.M) && (a.M - b.M)) ||
            ((a.D !== b.D) && (a.D - b.D)) ||
            ((a.h !== b.h) && (a.h - b.h)) ||
            ((a.m !== b.m) && (a.m - b.m));
  });

}


const data = sortInput( parseInput(input) );

function makeSchedule(data) {

  const schedule = [];
  let shiftIdx = -1;

  const ASLEEP = 1;
  const AWAKE = 0;

  let status;
  let currentMinute;

  function fillMinutes(end) {
    while (currentMinute < end) {
      schedule[shiftIdx].mins.push(status);
      currentMinute++;
    }
  }

  data.forEach( (row) => {

    const msgType = row.msg.match(/^([^\s]+)/);

    switch (msgType[0]) {
    case "Guard":

      fillMinutes(60);

      schedule.push({id: parseInt(row.msg.match(/#(\d+)/)[1]), mins: []});
      currentMinute = 0;
      status = AWAKE;
      shiftIdx++;
      break;

    case "falls":
      fillMinutes(row.m);
      status = ASLEEP;
      break;

    case "wakes":
      fillMinutes(row.m);
      status = AWAKE;
      break;
    }

  });

  fillMinutes(60);

  return schedule;

}

function printSchedule(sched) {

  // Make the minute header
  let head = [[],[]];
  for (let i = 0; i < 60; i++) {
    head[0].push( Math.floor(i / 10) );
    head[1].push( i % 10 );
  }
  head = head.map((arr) => "\t\t" + arr.join("")).join("\n");

  sched.forEach((row) => {

    console.log( "\n" + head + `\n${row.id}\t\t` + row.mins.join("") );

  });

}

const sched = makeSchedule(data);

// printSchedule(sched);



// const shiftTotals = sched.map((shift) => {
//   return {id: shift.id, total: shift.mins.reduce((a,b) => a + b) }
// });

// function sleepTotals(shiftTotals) {

//   const out = {};
//   shiftTotals.forEach((shift) => {
//     if (out[shift.id]) {
//       out[shift.id] += shift.total;
//     } else {
//       out[shift.id] = shift.total;
//     }
//   });

//   return out;

// }

// function sleepiestGuard(totals) {

//   let id;
//   Object.keys(totals).forEach((guard) => {
//     if (!id || totals[guard] > totals[id]) id = guard;
//   });

//   return parseInt(id);

// }

// const mostTimeAsleep = sleepiestGuard(sleepTotals(shiftTotals));
// console.log(`Guard ${mostTimeAsleep} spends the most time asleep`);

function sumSleepMinutes(sched) {

  const out = {};
  sched.forEach((shift) => {

    if (!out[shift.id]) out[shift.id] = Array(60).fill(0);
    shift.mins.map((val, idx) => out[shift.id][idx] += val);

  });

  return out;

}

const summed = sumSleepMinutes(sched);

function findMax(summed) {

  let max;
  Object.keys(summed).forEach((guard) => {

    const guardMax = Math.max(...summed[guard]);
    const idx = summed[guard].indexOf(guardMax);

    if (!max || guardMax > max.val) {
      max = {id: guard, val: guardMax, idx};
    }

  });

  return {id: parseInt(max.id), val: max.val, idx: max.idx};

}

const sleepiest = findMax(summed);

// const sum = sumSleepMinutes(sched, mostTimeAsleep);

// const likeliest = sum.indexOf(Math.max(...sum));
console.log(`Guard ${sleepiest.id} is most likely to be asleep at minute ${sleepiest.idx}`);
console.log("Solution: " + (sleepiest.id * sleepiest.idx) );
