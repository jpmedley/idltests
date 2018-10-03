'use strict';

const fs = require('fs');
const utils = require('./utils.js');
const webidl2 = require('webidl2');

// const testFile = './idl/modules/xr/xr_device.idl';
// const someIDL = utils.getIDLFile(testFile);
// const tree = webidl2.parse(someIDL);
// const text = webidl2.write(tree);

// let directories = [];
let files = [];

processDirectory(utils.IDL_FILES);
for (let f in files) {
  console.log(files[f].path());
}

// Test 1: Properties
let someIDL = getTree(files[0].path());
console.log(someIDL.string);
let command = 'interface -n ';
// Note: Interface is not necessarily at tree[0].
// Note: Item at tree[0] is not necessarily an interface (see enum, dictionary).
command += someIDL.tree[0].name + " -i -o -pr ";
command += someIDL.tree[0].members[0].escapedName;
console.log(command);
console.log();

// Test 2: Methods and Properties
someIDL = getTree(files[2].path());
console.log(someIDL.string);
// interface -n DataView -i -o -m octet()
command = 'interface -n ';
command += someIDL.tree[0].name + " -i -o";
let mems = someIDL.tree[0].members;
for (let m in mems) {
  let name;
  if (mems[m].type === 'attribute') { name = mems[m].escapedName; }
  else if (mems[m].type == 'operation') { name = mems[m].body.name.escaped; }
  command += " -m " + name;
}
console.log(command);
console.log();

// Test 3: Methods, Properties, and Constructors.
someIDL = getTree(files[19].path());
console.log(someIDL.string);
command = 'interface -n ';
let iStruct;
for (let l in someIDL.tree) {
  if (someIDL.tree[l].type === 'interface') {
    iStruct = someIDL.tree[l];
    break;
  }
}
if (iStruct) {
  command += iStruct.name + " -i -o";
  if (iStruct.extAttrs) {
    for (let e in iStruct.extAttrs.items) {
      if (iStruct.extAttrs.items[e].name === 'Constructor') {
        command += " -c";
        break;
      }
    }
  }
  mems = iStruct.members
  // for (let m in mems) {
  //   command += " -m " + mems[m].body.name.value + "()";
  // }
  for (let m in mems) {
    let name;
    if (mems[m].type === 'attribute') {
      command += " -p " + mems[m].escapedName;
    } else if (mems[m].type == 'operation') {
      command += " -m " + mems[m].body.name.escaped + "()";
    }
  }
}
console.log(command);


function getTree(fileName) {
  console.log(fileName);
  const idl = utils.getIDLFile(fileName);
  const tree = webidl2.parse(idl);
  const str = webidl2.write(tree);
  return {
    "tree": tree,
    "string": str
  }
}

function processDirectory(directory) {
  let contents = fs.readdirSync(directory, {withFileTypes: true});
  for (let c in contents) {
    if (contents[c].isDirectory()) {
      processDirectory(directory + contents[c].name + "/");
    } else if (contents[c].isFile()) {
      if (!contents[c].name.endsWith('.idl')) { continue; }
      if (contents[c].name.startsWith('test_')) { continue; }
      contents[c].directory = directory;
      function path() {
        return this.directory + this.name;
      }
      contents[c].path = path;
      path.bind(contents[c]);
      files.push(contents[c]);
    }
  }
}
