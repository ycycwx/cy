/**
 * @file default.js
 * @author ycy
 */

const fs = require('fs');
const {warn} = require('../core/util');
let db = require('../core/db');

module.exports = input => {
    if (input.length <= 0) {
        warn('You must add file or folder at least one');
        return;
    }

    db.reset();

    input
        .filter(file => {
            let exist = fs.existsSync(file);
            !exist && warn(`"${file}" is not exist`);
            return exist;
        })
        .map(file => fs.realpathSync(file))
        .map(file => db.add(file));

    db.commit();
};

