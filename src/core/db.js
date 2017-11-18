/**
 * @file db.js database api
 * @author ycy
 */

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const {warn} = require('../core/util');

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
                fs.copySync(file, path.resolve(dir, path.basename(file)));
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
                fs.moveSync(file, path.resolve(dir, path.basename(file)));
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

module.exports = new DataBase();
