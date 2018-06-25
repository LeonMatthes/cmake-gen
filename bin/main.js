#!/usr/bin/env node
const process = require('process')
const varName = process.argv[2]
const pathName = process.argv[3] ? process.argv[3] : '.' 

const Directory = require('../index.js')

console.log('----------------- cmake-gen -----------------')
console.log('Invoked in directory: ' + pathName + '\n')

const dir = new Directory(pathName)
dir.write(varName)

console.log('\n----------------- cmake-gen -----------------')
console.log('Finished successfully\n')
