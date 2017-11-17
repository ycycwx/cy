/**
 * @file Copy.js
 * @author ycy
 */

const path = require('path');
const {warn} = require('../core/util');
const db = require('../core/db');
const Base = require('./Base');

module.exports = class Copy extends Base {

    static get name() {
        return 'copy';
    }

    static get alias() {
        return ['cp', 'c'];
    }

    static get desc() {
        return 'copy files';
    }

    commandHandler() {
        if (this.input.length !== 1) {
            warn('You must add file or folder at least one');
            return;
        }

        if (db.length <= 0) {
            warn('No file to commit');
            return;
        }

        db.copy(path.resolve(process.cwd(), input[0]));
        db.commit();
    }
}

