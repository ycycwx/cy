/**
 * @file Move.js
 * @author ycy
 */

const path = require('path');
const {warn} = require('../core/util');
const db = require('../core/db');
const Base = require('./Base');

module.exports = class Move extends Base {

    static get name() {
        return 'move';
    }

    static get alias() {
        return ['m', 'mv'];
    }

    static get desc() {
        return 'move files';
    }

    commandHandler() {
        if (this.input.length !== 1) {
            warn('You must choose only one directory');
            return;
        }

        if (db.length <= 0) {
            warn('No file to commit');
            return;
        }

        db.move(path.resolve(process.cwd(), input[0]));
        db.commit();
    }
}

