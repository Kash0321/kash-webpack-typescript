"use strict";
var Greeter = (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function (name) {
        return 'Hello ' + name;
    };
    return Greeter;
}());
exports.Greeter = Greeter;
//# sourceMappingURL=greeter.js.map