/**
 * @file reset.js
 * @author ycy
 */

let db = require('../core/db');

module.exports = () => {
    db.reset();
    db.commit();
};

