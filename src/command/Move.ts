/**
 * @file Move.js
 * @author ycy
 */

import * as path from 'path';
import {warn} from '../core/util';
import db from '../core/db';
import Base from './Base';

export default class Move extends Base {

    static get command() {
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

        db.move(path.resolve(process.cwd(), this.input[0]));

        // reset db after move
        db.reset();

        db.commit();
    }
}
