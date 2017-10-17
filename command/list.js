/**
 * @file list.js
 * @author ycy
 */

let db = require('../core/db');
const {tip} = require('../core/util');

module.exports = input => db
    .dump()
    .map((file, index) => `${index + 1}. ${file}`)
    .map(tip);
