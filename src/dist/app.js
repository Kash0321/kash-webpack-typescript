"use strict";
var greeter_1 = require('./greeter');
var $ = require('jquery');
$(function () {
    var g = new greeter_1.Greeter();
    $('#title-text').html(g.greet('Kash'));
});
//# sourceMappingURL=app.js.map