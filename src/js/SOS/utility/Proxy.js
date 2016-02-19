

/// <reference path="Utils.js" />

var SOS = SOS || {};

SOS.Const.PROXY_HOST = "Proxy/proxy.ashx?";

(function () {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    SOS.sosLocation = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}());


SOS.Proxy = {    
    use: false,
    url: SOS.sosLocation + SOS.Const.PROXY_HOST,

    /**
     * Initialise the proxy for communicating to the SOS
     */
    init: function (options) {
        var prx = this;
        // We can optionally modify the proxy settings here
        if (SOS.Utils.isValidObject(options)) {
            for (var p in options) {
                prx[p] = options[p];
            }
        }
        /* Initialise the proxy, based on the "use" flag */
        if (prx.use) {
            prx.enable();
        } else {
            prx.disable();
        }
    },

    /**
     * Enable the proxy for communicating to the SOS
     */
    enable: function (options) {
        var prx = this;
        // We can optionally modify the proxy settings here
        if (SOS.Utils.isValidObject(options)) {
            for (var p in options) {
                prx[p] = options[p];
            }
        }
        if (prx.url) {
            SOS.ProxyHost = prx.url;
        }

        return prx.url;
    },

    /**
     * Disable the proxy for communicating to the SOS
     */
    disable: function () {
        SOS.ProxyHost = null;
    }
};