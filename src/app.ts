import { Greeter } from './greeter'
import * as $ from 'jquery';
import bootStrap = require('bootstrap');
let bs = bootStrap;

$(() => {
    var g = new Greeter();
    $('#launchBtn').click(function() {
        $('#myModal').modal();
    });
    $('#title-text').html(g.greet('Kash'));
});