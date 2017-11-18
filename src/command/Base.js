/**
 * @file Base.js
 * @author ycy
 */

const fs = require('fs');
const {warn} = require('../core/util');
const db = require('../core/db');

module.exports = class Base {

    static get name() {
        return null;
    }

    static get alias() {
        return [];
    }

    static get desc() {
        return null;
    }

    constructor(input, flags) {
        this.input = input;
        this.flags = flags;

        this.handle();
    }

    handle() {
        let input = this.input;
        let flags = this.flags;
        if (flags.i) {
            this.handleIgnores();
            this.defaultHandler();
            return;
        }

        this.commandHandler();
    }

    handleIgnores() {
        let input = this.input;
        let flags = this.flags;

        if (flags.i !== true) {
            this.input.push(flags.i);
        }

        let cmd = process.argv[2];
        let {name, alias} = this.constructor;
        if (cmd === name || [].concat(alias).includes(cmd)) {
            this.input.push(cmd);
        }
    }

    defaultHandler() {
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

    commandHandler() {
    }
}
