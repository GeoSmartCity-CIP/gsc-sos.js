
var SOS = SOS || {};

SOS.Source = function () { };

SOS.Source.prototype.reader = { };

SOS.Source.prototype.read = function (text) {
    throw new Error('Read not implemented.');
};

SOS.Source.prototype.write = function (obj) {
    throw new Error('Write not implemented.');
};

SOS.source = SOS.source || { };