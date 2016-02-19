var SOS = SOS || {};

SOS.method = SOS.method || {};

SOS.Method = function () {
    var _med = this;
};
SOS.inherit(SOS.Method, SOS.Source);
 
SOS.method.GET = function (scope) {
    var _meth = this;
    _meth.scope = scope;
};
SOS.inherit(SOS.method.GET, SOS.Method);

SOS.method.GET.prototype.read = function (data) {
    var _method = this;
    if (_method.scope.sources && _method.scope.sources[_method.scope.defaultSource])
        _method.scope.data = _method.scope.sources[_method.scope.defaultSource].read(data);
    else _method.scope.data = _method.scope.sources.xml.read(data);
};

SOS.method.GET.prototype.write = function (options) {
    var _method = this;
    if (_method.scope.sources && _method.scope.sources[_method.scope.defaultSource])
        return _method.scope.sources[_method.scope.defaultSource].write(options);
    else return _method.scope.sources.xml.write(options);
};


