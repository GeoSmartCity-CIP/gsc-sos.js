
/// <reference path="../../../lib/tc_schemas_parsers.js" />
/// <reference path="../../utility/Utils.js" />
/// <reference path="../Source.js" />

SOS.source.JSON = function (options) {
    var _src = this;
};
SOS.inherit(SOS.source.JSON, SOS.Source);

SOS.source.JSON.prototype.write = function (data) {
    var _src = this;
    return JSON.stringify(data);
};

SOS.source.JSON.prototype.read = function (data) {
    var _src = this;
    return JSON.parse(data);
};

