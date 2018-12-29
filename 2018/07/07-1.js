/*
*/

const input = require("./07-input.js");

const example = [
  "Step C must be finished before step A can begin.",
  "Step C must be finished before step F can begin.",
  "Step A must be finished before step B can begin.",
  "Step A must be finished before step D can begin.",
  "Step B must be finished before step E can begin.",
  "Step D must be finished before step E can begin.",
  "Step F must be finished before step E can begin.",
];

// s.b. XIJACQ, not XIJAQC
const example2 = [
  "Step J must be finished before step C can begin.",
  "Step I must be finished before step J can begin.",
  "Step J must be finished before step A can begin.",
  "Step A must be finished before step Q can begin.",
  "Step X must be finished before step I can begin.",
]

function parseSteps(data) {

  return data.map((line) => {
    return line.match(/Step (.) .+ step (.) can/).slice(1);
  });

}

const parsed = parseSteps(input);


class Node {

  constructor(char) {
    this.char = char;
    this.children = [];
    this.parents = [];
  }

  hasParent(char) {
    this.parents.push(char);
  }

  hasChild(char) {
    this.children.push(char);
  }

}

function constructTree(data) {

  const nodes = {};

  parsed.forEach((step) => {
    if (!nodes[step[1]]) nodes[step[1]] = new Node(step[1]);
    if (!nodes[step[0]]) nodes[step[0]] = new Node(step[0]);

    nodes[step[1]].hasParent(nodes[step[0]]);
    nodes[step[0]].hasChild(nodes[step[1]]);
  });

  return nodes;

}

const nodes = constructTree(parsed);

function findRoots(nodes) {

  const sources = [];
  Object.values(nodes).forEach((node) => {
    if (!node.parents.length) sources.push(node);
  });

  return sources.sort((a,b) => b.char < a.char);

}

const available = findRoots(nodes);
console.log(`Sources: ${available.map((src) => src.char)}`);


// Attempt #1 - Recursively walk the graph

// function resolveChildren(node, resolved = []) {

//   const parents = node.parents.map((parent) => parent.char);
//   const children = node.children.map((child) => child.char);

//   console.log(`[${parents.join(",")}] -> ${node.char} -> [${children.join(",")}]`);
//   node.children.length && node.children
//     .sort((a,b) => b.char < a.char)
//     .forEach((dep) => {
//       if (dep.parents.every((parent) => resolved.indexOf(parent.char) === -1)) {
//         resolveChildren(dep, resolved);
//       }
//     });

//   if (resolved.indexOf(node.char) === -1) {
//     resolved.push(node.char);
//   }

//   return resolved;
// }


// Attempt #2 - Have a queue of tasks and push more into it
// as parents are completed

let iterations = 0;

function resolveChildren(available) {

  const resolvedOrder = [];

  do {

    iterations++;

    const current = available.sort((a,b) => a.char > b.char).shift();

    resolvedOrder.push(current.char);
    current.resolved = true;

    current.children.forEach((child) => {
      if (child.parents.every((parent) => parent.resolved)) {
        available.push(child);
      }
    });

  } while (available.length);

  return resolvedOrder.join("");

}

const output = resolveChildren(available);

console.log(output);
console.log(`Took ${iterations} iterations`);
