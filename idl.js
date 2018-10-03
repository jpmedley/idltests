'use strict';

const utils = require('./utils.js');
const webidl2 = require('webidl2');

class Interface() {
  constructor(sourceFile) {
    this._loadTree(sourceFile);
  }

  _loadTree(fileName) {
    this.sourceContents = utils.getIDLFile(fileName);
    let tree = webidl2.parse(idl);
    for (let t in tree) {
      if (tree[t].type == 'interface') {
        this.interface = tree[t];
        break;
      }
    }
    if (!this.inerface) {
      throw "The supplied file does not contain an interface structure.";
    }
  }

  _loadMembers() {
    this.members;
    this.properties;
    let mems = this.interface.members;
    for (let m in mems) {
      switch (mems[m].type) {
        case 'attribute':
          // do
          break;
        case 'operation':
          // do
          break;
      }
    }
  }

  get methods() {
    // process both properties and methods, then delete this.interface.members
    if (this.interface.members) {

    } else {
      return this.methods;
    }
  }

  get properties() {
    // process both properties and methods, then delete this.interface.members
    if (this.interface.members) {

    } else {
      return this.properties;
    }
  }

  get sourceContents() {
    return this.sourceContents;
  }

  get tree() {
    return this.tree;
  }

// delete object.member

  hasConstructor() {
    // extAttrs.items[e].name
    let has = false;
    let items = this.tree.extAttrs.items;
    for (let i in items) {
      if (items[i].name === 'Constructor') {
        has = true;
      }
    }
    return has;
  }
}

module.exports.Interface = Interface;
