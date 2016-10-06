import { Greeter } from './greeter'
import * as $ from 'jquery';
import bootStrap = require('bootstrap');
let bs = bootStrap;

$(() => {
    var g = new Greeter();
    $('#title-text').html(g.greet('Kash'));
    $('#myModal').modal();
});