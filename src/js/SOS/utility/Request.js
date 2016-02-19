
/// <reference path="Utils.js" />
/// <reference path="Events.js" />
/// <reference path="Proxy.js" />


SOS.Request = {
    DEFAULT_CONFIG: {
        method: "GET",
        url: window.location.href,
        async: true,
        user: undefined,
        password: undefined,
        params: null,
        proxy: SOS.ProxyHost,
        headers: {},
        data: null,
        callback: function () { },
        success: null,
        failure: null,
        scope: null
    },

    events: new SOS.Events(),

    _getXMLHttpRequest: function () {
        try { return new XMLHttpRequest(); } catch (e) { console.log('XMLHttpRequest missing'); };
    },

    createXMLHttpRequest: function (config) {
        var _req = this;

        var defaultConfig = SOS.Utils.extend(_req.DEFAULT_CONFIG, { proxy: SOS.ProxyHost });
        config = SOS.Utils.applyDefaults(config, defaultConfig);

        var request = _req._getXMLHttpRequest();
        if (request) {
            var url = SOS.Utils.urlAppend((SOS.ProxyHost || '') + config.url, SOS.Utils.getParameterString(config.params || {}));
            request.open(config.method, url, config.async, config.user, config.password);

            for (var header in config.headers) {
                request.setRequestHeader(header, config.headers[header]);
            }

            request.onreadystatechange = function () {
                if (request.readyState == request.DONE) {
                    config.callback.apply(config.scope, [request]);

                    var controlException = function (request) {
                        if (request) {                            
                            var match = /<ows:ExceptionText>([\s\S]*?)<\/ows:ExceptionText>/g.exec(request.responseText);
                            if (match) return match[1];
                        }

                        return null;
                    };

                    if (!request.status || (request.status >= 200 && request.status < 300)) {
                        _req.events.triggerEvent("success", {}); // options
                        if (config.success) {
                            var exception = controlException(request);
                            if (exception == null)
                                config.success.apply(config.scope, [request]);
                            else {
                                if (config.failure) {
                                    config.failure.apply(config.scope, [exception]);
                                }
                            }
                        }
                    }
                    if (request.status && (request.status < 200 || request.status >= 300)) {
                        _req.events.triggerEvent("failure", {}); // options
                        if (config.failure) {
                            config.failure.apply(config.scope, [request]);
                        }
                    }
                }
            };

            if (config.async === false) {
                request.send(config.data);
            } else {
                window.setTimeout(function () {
                    if (request.readyState !== 0) {
                        request.send(config.data);
                    }
                }, 0);
            }
        }
    },

    GET: function (params) {
        var _req = this;
        params = SOS.Utils.extend(params, { method: "GET" });
        return _req.createXMLHttpRequest(params);
    },

    POST: function (params) {
        var _req = this;
        params = SOS.Utils.extend(params, { method: "POST" });
        return _req.createXMLHttpRequest(params);
    }
};