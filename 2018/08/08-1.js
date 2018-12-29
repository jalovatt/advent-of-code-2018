
const {assert} = require("chai");
const input = require("./08-input.js");

const example = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";


class Node {

  constructor() {
    this.parent = nil;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    node.addParent(this);
  }

  addParent(node) {
    this.parent = node;
  }

}


const root = new Node;
const currentParent = root;

function parse(data) {


}

const tree = parse(example);
