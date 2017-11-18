/**
 * @file List.js
 * @author ycy
 */

import db from '../core/db';
import {print} from '../core/util';
import Base from './Base';

export default class List extends Base {

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
            .map(print);
    }
}
