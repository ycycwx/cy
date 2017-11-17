/**
 * @file Default.js
 * @author ycy
 */

const fs = require('fs');
const {warn} = require('../core/util');
const db = require('../core/db');
const Base = require('./Base');

module.exports = class Default extends Base {

    static get name() {
        return '*';
    }

    static get desc() {
        return 'select files';
    }

    commandHandler() {
        let input = this.input;

        if (input.length <= 0) {
            warn('You must add file or folder at least one');
            return;
        }

        let {valid, invalid} = input.reduce(
            (group, file) => {
                let key = fs.existsSync(file) ? 'valid' : 'invalid';
                group[key].push(file);
                return group;
            },
            {valid: [], invalid: []}
        );

        if (invalid.length > 0) {
            warn(`Files ${invalid.join()} are not existed.`);
        }

        db.reset();

        valid
            .map(file => fs.realpathSync(file))
            .map(file => db.add(file));

        db.commit();
    }
}
