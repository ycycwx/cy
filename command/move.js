/**
 * @file move.js
 * @author ycy
 */

const path = require('path');
const {warn} = require('../core/util');
let db = require('../core/db');

module.exports = input => {
    if (input.length !== 1) {
        warn('You must choose only one directory');
        return;
    }

    if (db.length <= 0) {
        warn('No file to commit');
        return;
    }

    db.move(path.resolve(process.cwd(), input[0]));
    db.commit();
};

