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

function findEndTime(node, time, stepDuration) {
  return time + stepDuration + (node.char.charCodeAt(0) - 64)
}

class Worker {
  constructor(node, endTime) {
    this.node = node;
    this.endTime = endTime;
  }
}

function timeToComplete(nodes, available, numWorkers, stepDuration) {

  let time = 0;
  const resolved = [];
  const nodeCount = Object.values(nodes).length;
  const workers = Array(numWorkers).fill().map(() => new Worker());

  while (resolved.length < nodeCount) {

    workers.forEach((worker) => {
      if (worker && worker.node && time >= worker.endTime) {

        worker.node.resolved = true;
        resolved.push(worker.node);

        worker.node.children.forEach((child) => {
          if (child.parents.every((parent) => parent.resolved)) {
            available.push(child);
          }
        });

        worker.node = null;
        worker.endTime = null;

      }
    });

    // Find available workers
    const freeWorkers = workers.filter((worker) => {
      return !worker.node;
    });

    // Find available tasks (reverse-sorted so we can pop in alphabetical order)
    const sorted = available.sort((a,b) => b.char > a.char);

    // Assign a task to all free workers
    freeWorkers.forEach((worker) => {
      if (sorted.length) {
        worker.node = sorted.pop();
        worker.endTime = findEndTime(worker.node, time, stepDuration);
      }
    });

    // Advance time to the next time a task will end
    if (workers.some((worker) => worker.node)) {
      time = Math.min(...(workers.filter((worker) => worker.endTime).map((worker) => worker.endTime)));
    }

  }

  return time;
}

console.log(timeToComplete(nodes, available, 50, 60));
