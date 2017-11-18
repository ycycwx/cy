/**
 * @file Reset.js
 * @author ycy
 */

import db from '../core/db';
import Base from './Base';

export default class Reset extends Base {

    static get name() {
        return 'reset';
    }

    static get alias() {
        return 'clear';
    }

    static get desc() {
        return 'reset files';
    }

    commandHandler() {
        db.reset();
        db.commit();
    }
}

