/**
 * @file Add.js
 * @author ycy
 */

import * as fs from 'fs';
import {warn} from '../core/util';
import db from '../core/db';
import Base from './Base';

export default class Add extends Base {

    static get name() {
        return 'add';
    }

    static get alias() {
        return ['a'];
    }

    static get desc() {
        return 'add select files';
    }

    commandHandler() {
        let input = this.input;

        if (input.length <= 0) {
            warn('You must add file or folder at least one');
            return;
        }

        let valid = input.every(file => {
            let exist = fs.existsSync(file);
            !exist && warn(`"${file}" is not exist`);
            return exist;
        });

        if (!valid) {
            warn('You must input existing path');
            return;
        }

        input
            .map(file => fs.realpathSync(file))
            .map(file => db.add(file));

        db.commit();
    }
}

