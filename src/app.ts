declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

import { Greeter } from './greeter'
import * as $ from 'jquery';

require('./node_modules/bootstrap/dist/css/bootstrap.css');
require('./node_modules/bootstrap/dist/css/bootstrap-theme.css');
require('./css/style.css');

import bootStrap = require('bootstrap');
let bs = bootStrap;

$(() => {
    var g = new Greeter();
    $('#launchBtn').click(function() {
        $('#myModal').modal();
    });
    $('#title-text').html(g.greet('Kash'));
});