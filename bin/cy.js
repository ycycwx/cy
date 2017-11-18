#!/usr/bin/env node

var cac = require('cac');
var install = require('../lib/core/util').install;

var Default = require('../lib/command/Default').default;
var Add = require('../lib/command/Add').default;
var Reset = require('../lib/command/Reset').default;
var List = require('../lib/command/List').default;
var Move = require('../lib/command/Move').default;
var Copy = require('../lib/command/Copy').default;

var cli = cac();
var wrap = install(cli);

var ignore = {alias: 'i', desc: 'ignore command'};

wrap(Default).option('ignore', ignore);
wrap(Add);
wrap(Reset);
wrap(List);
wrap(Move);
wrap(Copy);

cli.parse();
