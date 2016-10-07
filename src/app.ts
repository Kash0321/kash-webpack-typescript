declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

import * as $ from 'jquery';

require('./node_modules/bootstrap/dist/css/bootstrap.css');
require('./node_modules/bootstrap/dist/css/bootstrap-theme.css');
require('./css/style.css');

import bootStrap = require('bootstrap');
let bs = bootStrap;

import angular = require('angular');

angular.module('app', []);