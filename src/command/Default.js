/**
 * @file Default.js
 * @author ycy
 */

import * as fs from 'fs';
import {warn} from '../core/util';
import db from '../core/db';
import Base from './Base';

export default class Default extends Base {

    static get name() {
        return '*';
    }

    static get desc() {
        return 'select files';
    }
}
