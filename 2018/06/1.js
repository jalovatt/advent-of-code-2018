console.log("DOES NOT WORK");

const input = require("./input.js");
const example = [
  {x: 1, y: 1},
  {x: 1, y: 6},
  {x: 8, y: 3},
  {x: 3, y: 4},
  {x: 5, y: 5},
  {x: 8, y: 9}
];

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function closestPoint(coord, points) {

  let closestPoint;
  for (let i = 0, l = points.length; i < l; i++) {

    const dist = distance(coord, points[i]);

    if (!closestPoint || dist < closestPoint.dist) {
      closestPoint = {idx: i, x: points[i].x, y: points[i].y, dist};
    } else if (dist === closestPoint.dist) {
      closestPoint = {idx: -1, dist};
    }

  }

  return closestPoint;

}

let bounds;

function buildGraph(input) {

  let xMin, yMin, xMax, yMax;
  input.forEach((coord) => {
    (!xMin || coord.x < xMin) && (xMin = coord.x);
    (!yMin || coord.y < yMin) && (yMin = coord.y);
    (!xMax || coord.x > xMax) && (xMax = coord.x);
    (!yMax || coord.y > yMax) && (yMax = coord.y);
  });



  const graph = [];
  for (let y = yMin; y <= yMax; y++) {
    graph[y] = [];
    for (let x = xMin; x <= xMax; x++) {
      graph[y].push( closestPoint({x, y}, input).idx );
    }
  }

  bounds = {xMin, yMin, xMax, yMax};
  return graph;

}

const graph = buildGraph(input);
// console.log( graph.map((row) => row.join("\t")).join("\n") );

function touchesEdge(idx, graph) {

  if (graph[bounds.yMin].indexOf(idx) > -1 ||
      graph[bounds.yMax].indexOf(idx) > -1 ||
      graph.reduce((acc, row) => acc.concat(row[bounds.xMin-1]), []).indexOf(idx) > -1 ||
      graph.reduce((acc, row) => acc.concat(row[bounds.xMax]), []).indexOf(idx) > -1
  ) return true;

  return false;
}

function stripInfinites(points, graph) {
  return points.map((point, idx) => {
    point.idx = idx;
    return point;
  }).filter((point, idx) => !touchesEdge(idx, graph));
}


const possible = stripInfinites(input, graph);
// console.log(possible);

function countCells(idx, graph) {

  return graph.reduce((acc, row) => {
    return acc + row.reduce((acc, cur) => {
      return acc + ((cur === idx) ? 1 : 0);
    }, 0);
  }, 0);

}


function findMaxArea(possible, graph) {

  let max;
  possible.forEach((point) => {
    const val = countCells(point.idx, graph);
    if (!max || val > max.val) {
      max = {...point, val};
    }
  });

  return max;

}

console.log(findMaxArea(possible, graph));
