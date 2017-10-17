/**
 * @file copy.js
 * @author ycy
 */

const path = require('path');
const {warn} = require('../core/util');
let db = require('../core/db');

module.exports = input => {
    if (input.length !== 1) {
        warn('You must add file or folder at least one');
        return;
    }

    if (db.length <= 0) {
        warn('No file to commit');
        return;
    }

    db.copy(path.resolve(process.cwd(), input[0]));
    db.commit();
};

