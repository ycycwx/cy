#!/usr/bin/env node

var cac = require('cac');
var install = require('../lib/core/util').install;

var Default = require('../lib/command/Default');
var Add = require('../lib/command/Add');
var Reset = require('../lib/command/Reset');
var List = require('../lib/command/List');
var Move = require('../lib/command/Move');
var Copy = require('../lib/command/Copy');

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
