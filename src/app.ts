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

import { IndexController } from './indexController';
import { FooManagerDirective, FooManagerController, IFooManagerVM } from './fooManagerDirective';
import { MessageModalDirective, MessageModalController } from './messageModalDirective';

angular.module('app', []);

angular
    .module('app')
    .controller('indexController', IndexController);   

angular
    .module('app')
    .directive('fooManager', FooManagerDirective.Factory())
    .controller('fooManagerController', FooManagerController);

angular
    .module('app')
    .directive('messageModal', MessageModalDirective.Factory())
    .controller('messageModalController', MessageModalController);