
/// <reference path="../../../lib/tc_schemas_parsers.js" />
/// <reference path="../../utility/Utils.js" />
/// <reference path="../Source.js" />

SOS.source.XML = function (options) {
    var _src = this;

    _src.initialize(_src);
};
SOS.inherit(SOS.source.XML, SOS.Source);

SOS.source.XML.prototype.initialize = function (src) {
    src.reader = new XML.XTree();
};

SOS.source.XML.prototype.read = function (text) {
    var _src = this;
    return _src.reader.getJson(text);
};

SOS.source.XML.prototype.write = function (params, allowedFilters) {
    var _src = this;

    for (var k in params) {
        var expression = '(\\b' + k + '\\b)';
        var regex = new RegExp(expression, 'g');

        if (!regex.test(allowedFilters.join(',')))
            throw Error(SOS.Const.ErrorText.XML.UNKNOWN_PARAM + ': ' + k);
        else if (!(params[k]) || params[k] && params[k].toString().trim().length == 0)
            throw Error(SOS.Const.ErrorText.XML.EMPTY_PARAM);
    }    
};
