/**
 * @file Copy.js
 * @author ycy
 */

import * as path from 'path';
import {warn} from '../core/util';
import db from '../core/db';
import Base from './Base';

export default class Copy extends Base {

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

        db.copy(path.resolve(process.cwd(), this.input[0]));
        db.commit();
    }
}

