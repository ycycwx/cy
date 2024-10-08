/**
 * @file db.js database api
 * @author ycy
 */

import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';
import {tip, warn} from '../core/util';

const filePath = path.resolve(os.homedir(), '.cy');
const encode = 'utf8';

const DB = Symbol('db');

class DataBase {
    [DB]: Set<string>;

    constructor() {
        if (fs.existsSync(filePath)) {
            try {
                this[DB] = new Set(
                    JSON.parse(fs.readFileSync(filePath, encode))
                );
            }
            catch {
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

    add(...files: string[]) {
        files.forEach(file => this[DB].add(file));
    }

    reset() {
        this[DB] = new Set();
    }

    copy(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirpSync(dir);
        }

        const stat = fs.lstatSync(dir);
        if (!stat.isDirectory()) {
            warn('Target must be directory');
            return;
        }

        this.dump().forEach(file => {
            try {
                const target = path.resolve(dir, path.basename(file));
                tip(`Copying file "${file}" to "${target}"`);
                fs.copySync(file, target);
            }
            catch (error: any) {
                warn(
                    `Fail to copy "file: ${file}" to "dir: ${dir}", reason is ${error.message}`
                );
            }
        });
    }

    move(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirpSync(dir);
        }

        const stat = fs.lstatSync(dir);
        if (!stat.isDirectory()) {
            warn('Target must be directory');
            return;
        }

        this.dump().forEach(file => {
            try {
                const target = path.resolve(dir, path.basename(file));
                tip(`Moving file "${file}" to "${target}"`);
                fs.moveSync(file, target);
            }
            catch (error: any) {
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
        catch (error: any) {
            warn(`Fail to commit record, reason is ${error.message}`);
        }
    }
}

export default new DataBase();
