
var SOS = SOS || {};

SOS.Utils = {
    Geom: {
        // Crea bbox mediante centro y distancia al vértice, en unidades de mapa
        createBBox: function (originCoords, radius) {
            var angle = Math.PI * ((1 / 4) - (1 / 2));
            var rotatedAngle, x, y;
            var xPoints = [], yPoints = [];

            for (var i = 0; i < 4; ++i) {
                rotatedAngle = angle + (i * 2 * Math.PI / 4);
                x = originCoords[0] + (radius * Math.cos(rotatedAngle));
                y = originCoords[1] + (radius * Math.sin(rotatedAngle));
                xPoints.push(x);
                yPoints.push(y);
            }

            var bbox = {
                lowerCorner: [Math.min.apply(null, xPoints), Math.min.apply(null, yPoints)],
                upperCorner: [Math.max.apply(null, xPoints), Math.max.apply(null, yPoints)]
            };

            return bbox;
        }
    },
    Converter: {
        Types: {
            INT: 'int',
            FLOAT: 'float'
        },
        DataTypeConverter: function () {
            var _dtc = this;
            _dtc.createConverter = function (type) {
                var converter;

                switch (type) {
                    case SOS.Utils.Converter.Types.FLOAT:
                        converter = new SOS.Utils.Converter.CFloat();
                        break;
                    case SOS.Utils.Converter.Types.INT:
                        converter = new SOS.Utils.Converter.CInt();
                        break;
                }

                converter.type = type;

                if (!(converter.convert))
                    converter.convert = function () { throw Error('Missing convert function!!'); };

                return converter;
            }
        },
        CFloat: function () {
            // valida si se trata de un float
            this.is = function (value) {
                return value.toString().match(SOS.Utils.regExes.isFloatNumber) != null;
            };
            // convierte el valor pasado a float
            this.convert = function (value) {
                return parseFloat(value);
            };
        },
        CInt: function () {
            // valida si se trata de un int
            this.is = function (value) {
                return value.toString().match(SOS.Utils.regExes.isIntNumber) != null;
            };
            // convierte el valor pasado en un int
            this.convert = function (value) {
                return parseInt(value);
            };
        }
    },
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g),
        isIntNumber: (/^(\d+)/),
        isFloatNumber: (/-?\d+[\.\,]\d+/)        
    },
    getParameterString: function (a) { var b = [], c; for (c in a) { var d = a[c]; if (null != d && "function" != typeof d) { if ("object" == typeof d && d.constructor == Array) { for (var e = [], f, g = 0, h = d.length; g < h; g++) f = d[g], e.push(encodeURIComponent(null === f || void 0 === f ? "" : f)); d = e.join(",") } else d = encodeURIComponent(d); b.push(encodeURIComponent(c) + "=" + d) } } return b.join("&") },
    uomDisplayTitles: {
        "Cel": "&deg;C",
        "deg": "&deg;",
        "m/s": "m s<sup>-1</sup>"
    },

    nonPrintingCharacterLabels: {
        ' ': "(space)",
        '\t': "(tab)",
        '\n': "(newline)",
        '\r\n': "(carriage return/newline)",
        '\r': "(carriage return)"
    },

    fullyQualifiedNames: {
        url: { test: /^\s*http/i, re: /^.*\/(.+)$/, s: "$1" },
        urn: { test: /^\s*urn/i, re: /^.*:/, s: "" }
    },

    indexOf: function (a, b) { if ("function" == typeof a.indexOf) return a.indexOf(b); for (var c = 0, d = a.length; c < d; c++) if (a[c] == b) return c; return -1 },

    isValidObject: function (x) {
        return (typeof x !== "undefined" && x !== null);
    },

    isArray: function (x) {
        return (Object.prototype.toString.call(x) === "[object Array]");
    },

    isNumber: function (x) {
        return (!isNaN(parseFloat(x)) && isFinite(x));
    },

    getUniqueList: function (x) {
        var a = [];

        for (var i = 0, len = x.length; i < len; i++) {
            if (this.indexOf(a, x[i]) === -1) {
                a.push(x[i]);
            }
        }

        return a;
    },

    toTitleCase: function (x) {
        var y = x;

        if (typeof x == "string") {
            var a = x.split(/ /);

            for (var j = 0, len = a.length; j < len; j++) {
                a[j] = a[j].replace(/^(.)/, function (match, $1, offset, original) { return ($1).toUpperCase(); });
            }
            y = a.join(" ");
        } else if (this.isArray(x)) {
            y = [];

            for (var i = 0, len = x.length; i < len; i++) {
                y.push(this.toTitleCase(x[i]));
            }
        }

        return y;
    },

    toDisplayName: function (x) {
        var y = x;

        if (typeof x == "string") {
            y = x.replace(/_/g, " ");
        } else if (this.isArray(x)) {
            y = [];

            for (var i = 0, len = x.length; i < len; i++) {
                y.push(this.toDisplayName(x[i]));
            }
        }

        return y;
    },

    _fqnToName: function (x, re, s) {
        return x.replace(re, s);
    },

    _lookupFqnFromName: function (x, a, re, s) {
        var y = x;

        for (var i = 0, len = a.length; i < len; i++) {
            if (this._fqnToName(a[i], re, s) === x) {
                y = a[i];
                break;
            }
        }

        return y;
    },

    fqnToName: function (x, opts) {
        var y = x;
        var fqn = this.fullyQualifiedNames;

        if (this.isValidObject(fqn)) {
            if (typeof x == "string") {
                if (opts && opts.hasOwnProperty("re") && opts.hasOwnProperty("s")) {
                    // User-defined transform from fully-qualified name (FQN) to name
                    y = this._fqnToName(x, opts.re, opts.s);
                } else {
                    if ((fqn.url.test).test(x)) {
                        // FQN is a URL
                        y = this._fqnToName(x, fqn.url.re, fqn.url.s);
                    } else {
                        // FQN is a URN
                        y = this._fqnToName(x, fqn.urn.re, fqn.urn.s);
                    }
                }
            } else if (this.isArray(x)) {
                y = [];

                for (var i = 0, len = x.length; i < len; i++) {
                    y.push(this.fqnToName(x[i], opts));
                }
            }
        }

        return y;
    },

    lookupFqnFromName: function (x, a, opts) {
        var y = x;
        var fqn = this.fullyQualifiedNames;

        if (this.isValidObject(fqn)) {
            if (typeof x == "string") {
                if (opts && opts.hasOwnProperty("re") && opts.hasOwnProperty("s")) {
                    // User-defined transform from fully-qualified name (FQN) to name
                    y = this._lookupFqnFromName(x, a, opts.re, opts.s);
                } else {
                    if ((fqn.url.test).test(a[0])) {
                        // FQN is a URL
                        y = this._lookupFqnFromName(x, a, fqn.url.re, fqn.url.s);
                    } else {
                        // FQN is a URN
                        y = this._lookupFqnFromName(x, a, fqn.urn.re, fqn.urn.s);
                    }
                }
            } else if (this.isArray(x)) {
                y = [];

                for (var i = 0, len = x.length; i < len; i++) {
                    y.push(this.lookupFqnFromName(x[i], a, opts));
                }
            }
        }

        return y;
    },

    urlToName: function (x) {
        return this.fqnToName(x, this.fullyQualifiedNames.url);
    },

    lookupUrlFromName: function (x, a) {
        return this.lookupFqnFromName(x, a, this.fullyQualifiedNames.url);
    },

    urnToName: function (x) {
        return this.fqnToName(x, this.fullyQualifiedNames.urn);
    },

    lookupUrnFromName: function (x, a) {
        return this.lookupFqnFromName(x, a, this.fullyQualifiedNames.urn);
    },

    toDisplayUom: function (x) {
        var y = x;

        /* SOS units are encoded according to Unified Code for Units of Measure
           (UCUM).  See http://unitsofmeasure.org/ */
        if (this.isValidObject(this.uomDisplayTitles)) {
            if (typeof x == "string") {
                if (this.uomDisplayTitles[x]) {
                    y = this.uomDisplayTitles[x];
                }
            } else if (this.isArray(x)) {
                y = [];

                for (var i = 0, len = x.length; i < len; i++) {
                    y.push(this.toDisplayUom(x[i]));
                }
            }
        }

        return y;
    },

    nonPrintingCharacterToLabel: function (x) {
        var y = x;

        if (this.isValidObject(this.nonPrintingCharacterLabels)) {
            if (typeof x == "string") {
                if (this.nonPrintingCharacterLabels[x]) {
                    y = this.nonPrintingCharacterLabels[x];
                }
            } else if (this.isArray(x)) {
                y = [];

                for (var i = 0, len = x.length; i < len; i++) {
                    y.push(this.nonPrintingCharacterToLabel(x[i]));
                }
            }
        }

        return y;
    },

    newlineToBr: function (x) {
        var y = x;

        if (typeof x == "string") {
            y = x.replace(/(\r\n|\n|\r)/g, "<br/>");
        } else if (this.isArray(x)) {
            y = [];

            for (var i = 0, len = x.length; i < len; i++) {
                y.push(this.newlineToBr(x[i]));
            }
        }

        return y;
    },

    applyTemplate: function (x, template, reFlags) {
        var reFlags = reFlags || "gi";
        var t = template;

        // Can't test x is an object first, as an array is also an object
        if (this.isArray(x)) {
            t = [];

            for (var i = 0, len = x.length; i < len; i++) {
                t.push(this.applyTemplate(x[i], template, reFlags));
            }
        } else {
            if (t) {
                for (var p in x) {
                    var re = new RegExp("\\[%\\s*" + p + "\\s*%\\]", reFlags);
                    t = t.replace(re, x[p]);
                }
            }
        }

        return t;
    },

    isoToDateObject: function (x) {
        var y = x;

        // Example datetime string: 2012-01-01T01:00:00.000Z (or date only)
        if (typeof x == "string") {
            var a = x.split(/T/);
            if (a.length < 2) { a[1] = "00:00:00.000Z"; }
            var d = a[0].split(/-/);
            a[1] = a[1].replace(/Z$/, "");

            var tz = /([-+])(\d{2})[:]?(\d{2})?/.exec(a[1]);
            var tzMins = 0;
            if (tz) {
                if (tz.length > 2) { tzMins += parseInt(tz[2], 10) * 60; }
                if (tz.length > 3) { tzMins += parseInt(tz[3], 10); }
                if (tz.length > 1 && tz[1] === '+') { tzMins *= -1; }
            }
            a[1] = a[1].replace(/[-+].+$/, "");

            var t = a[1].split(/:/);
            var ms = t[2].replace(/^\d+\./, "");
            t[2] = t[2].replace(/\.\d+$/, "");

            y = new Date(Date.UTC(parseInt(d[0], 10),
                         parseInt(d[1] - 1, 10),
                         parseInt(d[2], 10),
                         parseInt(t[0], 10),
                         parseInt(t[1], 10),
                         parseInt(t[2], 10),
                         parseInt(ms, 10)));

            if (!isNaN(y)) {
                if (tzMins != 0) {
                    y.setTime(y.getTime() + tzMins * 60 * 1000);
                }
            } else {
                y = x;
            }
        } else if (this.isArray(x)) {
            y = [];

            for (var i = 0, len = x.length; i < len; i++) {
                y.push(this.isoToDateObject(x[i]));
            }
        }

        return y;
    },

    isoToJsTimestamp: function (x) {
        var y = x;

        if (typeof x == "string") {
            var D = this.isoToDateObject(x);
            y = D.getTime();
        } else if (this.isArray(x)) {
            y = [];

            for (var i = 0, len = x.length; i < len; i++) {
                y.push(this.isoToJsTimestamp(x[i]));
            }
        }

        return y;
    },

    jsTimestampToIso: function (x) {
        var y = x;

        if (typeof x == "string" || typeof x == "number") {
            var D = new Date(x);

            if (!isNaN(D)) {
                y = D.toISOString();
            }
        } else if (this.isArray(x)) {
            y = [];

            for (var i = 0, len = x.length; i < len; i++) {
                y.push(this.jsTimestampToIso(x[i]));
            }
        }

        return y;
    },

    isoToTimeInterval: function (start, end) {
        var t = { start: null, end: null };

        t.start = this.isoToDateObject(start);
        t.end = this.isoToDateObject(end);

        return t;
    },

    adjustTimeInterval: function (t, startOffset, endOffset) {
        t.start.setTime(t.start.getTime() + startOffset);
        t.end.setTime(t.end.getTime() + endOffset);

        return t;
    },

    parseRelativeTime: function (x) {
        var t = { start: null, end: null };
        var local = new Date();
        var T = local.getTime();
        var s = x;
        var u = 0, c = 0, d = 0;

        // N.B.: We get local time but always use the getUTC* methods

        t.start = new Date(T);
        t.end = new Date(T);

        // For convenience we accept today, yesterday, current*, & previous*
        s = s.replace(/to|current/i, "this");
        s = s.replace(/yester|previous/i, "last");

        if ((/hour$/i).test(s)) {
            u = 60 * 60 * 1000;
            c = T % u;
        }
        if ((/day$/i).test(s)) {
            u = 24 * 60 * 60 * 1000;
            c = T % u;
        }
        if ((/week$/i).test(s)) {
            d = 24 * 60 * 60 * 1000;
            u = 7 * 24 * 60 * 60 * 1000;
            c = local.getUTCDay() * d + T % d;
        }
        if ((/month$/i).test(s)) {
            d = 24 * 60 * 60 * 1000;
            u = 31 * 24 * 60 * 60 * 1000;
            c = (local.getUTCDate() - 1) * d + T % d;
        }
        if ((/year$/i).test(s)) {
            d = 24 * 60 * 60 * 1000;
            u = 366 * 24 * 60 * 60 * 1000;
            c = (local.getUTCDayOfYear() - 1) * d + T % d;
        }

        if ((/^this/i).test(s)) {
            this.adjustTimeInterval(t, -c, -c + u - 1);
        }
        if ((/^last/i).test(s)) {
            this.adjustTimeInterval(t, -c - u, -c - 1);
        }
        if ((/^rolling/i).test(s)) {
            this.adjustTimeInterval(t, -u, -1);
        }

        return t;
    },

    extractColumn: function (x, n) {
        var y = [];

        if (this.isArray(x)) {
            for (var i = 0, len = x.length; i < len; i++) {
                y.push(x[i][n]);
            }
        }

        return y;
    },

    sum: function (x) {
        var y = 0;

        for (var i = 0, len = x.length; i < len; i++) {
            y += parseFloat(x[i]);
        }

        return y;
    },

    computeStats: function (x) {
        var y = { N: 0, sum: 0, min: 0, max: 0, mean: 0, median: 0, q1: 0, q3: 0, variance: 0, sd: 0 };

        if (this.isArray(x) && x.length > 1) {
            y.N = x.length;
            y.sum = this.sum(x);
            y.mean = y.sum / y.N;
            y.min = Math.min.apply(null, x);
            y.max = Math.max.apply(null, x);

            // We must copy x as sort() sorts in-place
            var sorted = x.slice(0);
            sorted.sort(function (a, b) { return a - b; });

            var floor = Math.floor(y.N / 2);
            y.median = ((y.N % 2) == 0) ? this.sum(sorted.slice(floor, floor + 2)) / 2 : sorted[floor + 1];
            floor = Math.floor(y.N / 4);
            y.q1 = ((y.N % 2) == 0) ? this.sum(sorted.slice(floor, floor + 2)) / 2 : sorted[floor + 1];
            floor *= 3;
            y.q3 = ((y.N % 2) == 0) ? this.sum(sorted.slice(floor, floor + 2)) / 2 : sorted[floor + 1];

            var t = 0;

            for (var i = 0, len = x.length; i < len; i++) {
                t += Math.pow(x[i] - y.mean, 2);
            }
            y.variance = t / (y.N - 1);
            y.sd = Math.sqrt(y.variance);
        }

        return y;
    },

    computeHistogram: function (x) {
        var y = { min: 0, max: 0, lower: 0, upper: 0, nBins: 0, binWidth: 0, data: [] };

        if (this.isArray(x) && x.length > 1) {
            var j = 0;
            var sorted = x.slice(0);
            sorted.sort(function (a, b) { return a - b; });
            y.min = Math.min.apply(null, sorted);
            y.max = Math.max.apply(null, sorted);
            y.lower = Math.floor(y.min);
            y.upper = Math.ceil(y.max);
            y.nBins = 10;

            if ((y.upper - y.lower) > 0) {
                y.binWidth = Math.pow(10, Math.round(Math.log(y.upper - y.lower) / Math.log(10))) / y.nBins;

                for (var i = y.lower; i < y.upper; i += y.binWidth) {
                    var bin = [i, 0];
                    for (var len = sorted.length; j < len; j++) {
                        if (sorted[j] < i + y.binWidth) {
                            bin[1]++;
                        } else {
                            break;
                        }
                    }
                    y.data.push(bin);
                }
            }
        }

        return y;
    },

    mergeSeries: function (x, options) {
        var options = options || { n: 0, m: 1, missing: null };
        var ivar = [], dataIndices = [];
        var y = [];

        if (this.isArray(x)) {
            if (x.length > 1) {
                // Get a unique, sorted superset of the independent variable
                for (var i = 0, len = x.length; i < len; i++) {
                    ivar = ivar.concat(this.extractColumn(x[i], options.n));
                    dataIndices.push(0);
                }
                ivar.sort(function (a, b) { return a - b; });
                ivar = this.getUniqueList(ivar);

                // Combine into a sparse table (left outer join)
                for (var i = 0, ilen = ivar.length; i < ilen; i++) {
                    var row = [];
                    row[0] = ivar[i];

                    for (var j = 0, jlen = x.length; j < jlen; j++) {
                        row[j + 1] = options.missing;

                        for (var k = dataIndices[j], klen = x[j].length; k < klen; k++) {
                            if (x[j][k][options.n] == ivar[i]) {
                                row[j + 1] = x[j][k][options.m];
                                dataIndices[j] = k;
                                break;
                            }
                        }
                    }
                    y.push(row);
                }
            } else {
                // Optimisation: x has only one series, so short-circuiting
                y = x[0];
            }
        }

        return y;
    },

    removeMissingDataRows: function (x, options) {
        var options = options || { missing: null };
        var y = [];

        if (this.isArray(x) && this.isArray(x[0])) {
            for (var i = 0, ilen = x.length; i < ilen; i++) {
                var foundMissing = false;

                for (var j = 0, jlen = x[i].length; j < jlen; j++) {
                    if (x[i][j] == options.missing) {
                        foundMissing = true;
                        break;
                    }
                }
                if (foundMissing == false) {
                    y.push(x[i]);
                }
            }
        }

        return y;
    },

    reorderColumns: function (x, cols) {
        var y = [];

        if (this.isArray(x) && this.isArray(x[0]) && this.isArray(cols)) {
            if (Math.max.apply(null, cols) < x[0].length && Math.min.apply(null, cols) >= 0) {
                for (var i = 0, ilen = x.length; i < ilen; i++) {
                    var row = [];

                    for (var j = 0, jlen = cols.length; j < jlen; j++) {
                        row.push(x[i][cols[j]]);
                    }
                    y.push(row);
                }
            }
        }

        return y;
    },

    removeColumns: function (x, cols) {
        var y = [];
        var keepCols = [];

        /* The reorderColumns() function returns a new table, hence passing
           a column list without the to-be-removed column indices effectively
           removes those columns */
        if (this.isArray(x) && this.isArray(x[0]) && this.isArray(cols)) {
            if (Math.max.apply(null, cols) < x[0].length && Math.min.apply(null, cols) >= 0) {
                for (var i = 0, ilen = x[0].length; i < ilen; i++) {
                    var removeColumn = false;

                    for (var j = 0, jlen = cols.length; j < jlen; j++) {
                        if (i == cols[j]) {
                            removeColumn = true;
                            break;
                        }
                    }
                    if (removeColumn == false) {
                        keepCols.push(i);
                    }
                }
                y = this.reorderColumns(x, keepCols);
            }
        }

        return y;
    },

    extend: function (a, b) {
        a = a || {};
        if (b) {
            for (var c in b) {
                var d = b[c]; void 0 !== d && (a[c] = d)
            } !("function" == typeof window.Event && b instanceof window.Event) && (b.hasOwnProperty && b.hasOwnProperty("toString")) && (a.toString = b.toString)
        } return a
    },

    applyDefaults: function (to, from) {
        to = to || {};
        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object is an
         * instance of window.Event.
         */
        var fromIsEvt = typeof window.Event == "function"
                        && from instanceof window.Event;

        for (var key in from) {
            if (to[key] === undefined ||
                (!fromIsEvt && from.hasOwnProperty
                 && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
                to[key] = from[key];
            }
        }
        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */
        if (!fromIsEvt && from && from.hasOwnProperty
           && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
            to.toString = from.toString;
        }

        return to;
    },

    urlAppend: function (url, paramStr) {
        var newUrl = url;
        if (paramStr) {
            var parts = (url + " ").split(/[?&]/);
            newUrl += (parts.pop() === " " ?
                paramStr :
                parts.length ? "&" + paramStr : "?" + paramStr);
        }
        return newUrl;
    }
};

SOS.inherit = function (C, P) {
    var F = function () { };
    F.prototype = P.prototype;
    C.prototype = new F;
    var i, l, o;
    for (i = 2, l = arguments.length; i < l; i++) {
        o = arguments[i];
        if (typeof o === "function") {
            o = o.prototype;
        }
        SOS.Utils.extend(C.prototype, o);
    }
};