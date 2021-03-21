/**
 * @file Base.js
 * @author ycy
 */

import * as fs from 'fs';
import {warn} from '../core/util';
import db from '../core/db';

export default class Base {

    input: string[];

    flags: {[k: string]: any};

    static get command(): string {
        return null;
    }

    static get alias(): string[] | string {
        return [];
    }

    static get desc(): string {
        return null;
    }

    constructor(input: string[], flags: {[k: string]: any}) {
        this.input = input;
        this.flags = flags;

        this.handle();
    }

    handle() {
        if (this.flags.i) {
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
            input.push(flags.i);
        }

        let cmd = process.argv[2];
        let {command, alias} = this.constructor as any;
        if (cmd === command || [].concat(alias).includes(cmd)) {
            input.push(cmd);
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
                const key: 'valid' | 'invalid' = fs.existsSync(file) ? 'valid' : 'invalid';
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
        this.defaultHandler();
    }
}
