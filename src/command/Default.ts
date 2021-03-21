/**
 * @file Default.js
 * @author ycy
 */

import Base from './Base';

export default class Default extends Base {

    static get command() {
        return '*';
    }

    static get desc() {
        return 'select files';
    }
}
