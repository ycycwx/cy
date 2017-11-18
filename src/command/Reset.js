/**
 * @file Reset.js
 * @author ycy
 */

const db = require('../core/db');
const Base = require('./Base');

module.exports = class Reset extends Base {

    static get name() {
        return 'reset';
    }

    static get alias() {
        return 'clear';
    }

    static get desc() {
        return 'reset files';
    }

    commandHandler() {
        db.reset();
        db.commit();
    }
}

