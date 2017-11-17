#!/usr/bin/env node

const cac = require('cac');
const {install} = require('../core/util');

const Default = require('../command/Default');
const Add = require('../command/Add');
const Reset = require('../command/Reset');
const List = require('../command/List');
const Move = require('../command/Move');
const Copy = require('../command/Copy');

const cli = cac();
const wrap = install(cli);

const ignore = {alias: 'i', desc: 'ignore command'};

wrap(Default).option('ignore', ignore);
wrap(Add);
wrap(Reset);
wrap(List);
wrap(Move);
wrap(Copy);

cli.parse();
