#!/usr/bin/env node
const process = require('process')
const varName = process.argv[2]
const pathName = process.argv[3]

const Directory = require('../index.js')

const dir = new Directory(pathName ? pathName : '.')
dir.read()
dir.write(varName)
