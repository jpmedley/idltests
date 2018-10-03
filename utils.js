'use strict';

const fs = require('fs');

// const IDL_FILES = '../blink/Source/';
const IDL_FILES = './idl/';

function _getIDLFile(name) {
  if (!name.endsWith(".idl")) { name += ".idl"; }
  // let filePath = IDL_FILES + name;
  let filePath = name;
  let buffer = fs.readFileSync(filePath);
  return buffer.toString();
}

module.exports.IDL_FILES = IDL_FILES;
module.exports.getIDLFile = _getIDLFile;
