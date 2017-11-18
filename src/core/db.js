/**
 * @file db.js database api
 * @author ycy
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import {tip, warn} from '../core/util';

const filePath = path.resolve(os.homedir(), '.cy');
const encode = 'utf8';

const DB = Symbol('db');

class DataBase {
    constructor() {
        if (fs.existsSync(filePath)) {
            try {
                this[DB] = new Set(
                    JSON.parse(fs.readFileSync(filePath, encode))
                );
            }
            catch (error) {
                this[DB] = new Set();
            }
        }
        else {
            this[DB] = new Set();
        }
    }

    get length() {
        return this[DB].size;
    }

    add(...files) {
        files.forEach(file => this[DB].add(file));
    }

    reset() {
        this[DB] = new Set();
    }

    copy(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirp(dir);
        }

        let stat = fs.lstatSync(dir);
        if (!stat.isDirectory()) {
            warn('Target must be directory');
            return;
        }

        this.dump().map(file => {
            try {
                let target = path.resolve(dir, path.basename(file));
                tip(`Copying file "${file}" to "${target}"`);
                fs.copySync(file, target);
            }
            catch (error) {
                warn(
                    `Fail to copy "file: ${file}" to "dir: ${dir}", reason is ${error.message}`
                );
            }
        });
    }

    move(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirp(dir);
        }

        let stat = fs.lstatSync(dir);
        if (!stat.isDirectory()) {
            warn('Target must be directory');
            return;
        }

        this.dump().map(file => {
            try {
                let target = path.resolve(dir, path.basename(file));
                tip(`Moving file "${file}" to "${target}"`);
                fs.moveSync(file, target);
            }
            catch (error) {
                warn(
                    `Fail to move "file: ${file}" to "dir: ${dir}", reason is ${error.message}`
                );
            }
        });
    }

    dump() {
        return Array.from(this[DB]);
    }

    commit() {
        try {
            fs.writeFileSync(
                filePath,
                JSON.stringify(Array.from(this[DB])),
                encode
            );
        }
        catch (error) {
            warn(`Fail to commit record, reason is ${error.message}`);
        }
    }
}

export default new DataBase();
