/**
 * @file List.js
 * @author ycy
 */

const db = require('../core/db');
const {tip} = require('../core/util');
const Base = require('./Base');

module.exports = class List extends Base {

    static get name() {
        return 'list';
    }

    static get alias() {
        return ['l', 'ls', 'show'];
    }

    static get desc() {
        return 'show files list';
    }

    commandHandler() {
        db
            .dump()
            .map((file, index) => `${index + 1}. ${file}`)
            .map(tip);
    }
}
