if (typeof (XML) == 'undefined') XML = function () { };

//  constructor
XML.XTree = function () {
    return this;
};

XML.XTree.prototype.parseXml = function (xml) {
    var _xtree = this;

    var dom = null;
    if (window.DOMParser) {
        try {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
        }
        catch (e) { dom = null; }
    }
    else if (window.ActiveXObject) {
        try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) // parse error ..
                console.log(dom.parseError.reason + dom.parseError.srcText);
        }
        catch (e) { dom = null; }
    }
    else
        console.log("XML.Xtree: Error on parse XML");
    return dom;
};

XML.XTree.prototype.toJson = function (xml, tab) {
    var _xtree = this;

    var X = {
        toObj: function (xml) {
            var o = {};

            var toCamelCase = function (str) {
                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
                    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                    return index == 0 ? match.toLowerCase() : match.toUpperCase();
                });
            };

            if (xml.nodeType == 1) {   // element node ..
                if (xml.attributes.length)   // element with attributes  ..
                    for (var i = 0; i < xml.attributes.length; i++) {
                        var attrName = (xml.attributes[i].nodeName.indexOf(':') > -1 ? xml.attributes[i].nodeName.split(':').pop() : xml.attributes[i].nodeName);
                        attrName = toCamelCase(attrName);
                        o["@" + attrName] = (xml.attributes[i].nodeValue || "").toString();
                    }
                if (xml.firstChild) { // element has child nodes ..
                    var textChild = 0, cdataChild = 0, hasElementChild = false;
                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                        if (n.nodeType == 1) hasElementChild = true;
                        else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                        else if (n.nodeType == 4) cdataChild++; // cdata section node
                    }
                    if (hasElementChild) {
                        if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                            X.removeWhite(xml);
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                var nodeName = n.nodeName;
                                nodeName = nodeName.split(':').pop();
                                nodeName = toCamelCase(nodeName);

                                if (n.nodeType == 3)  // text node
                                    o["#text"] = X.escape(n.nodeValue);
                                else if (n.nodeType == 4)  // cdata node
                                    o["#cdata"] = X.escape(n.nodeValue);
                                else if (o[nodeName]) {  // multiple occurence of element ..
                                    if (o[nodeName] instanceof Array)
                                        o[nodeName][o[nodeName].length] = X.toObj(n);
                                    else
                                        o[nodeName] = [o[nodeName], X.toObj(n)];
                                }
                                else  // first occurence of element..
                                    o[nodeName] = X.toObj(n);
                            }
                        }
                        else { // mixed content
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                    }
                    else if (textChild) { // pure text
                        if (!xml.attributes.length)
                            o = X.escape(X.innerXml(xml));
                        else
                            o["#text"] = X.escape(X.innerXml(xml));
                    }
                    else if (cdataChild) { // cdata
                        if (cdataChild > 1)
                            o = X.escape(X.innerXml(xml));
                        else
                            for (var n = xml.firstChild; n; n = n.nextSibling)
                                o["#cdata"] = X.escape(n.nodeValue);
                    }
                }
                if (!xml.attributes.length && !xml.firstChild) o = null;
            }
            else if (xml.nodeType == 9) { // document.node
                o = X.toObj(xml.documentElement);
            }
            else
                alert("unhandled node type: " + xml.nodeType);
            return o;
        },
        toJson: function (o, name, ind) {
            var json = name ? ("\"" + name + "\"") : "";
            if (o instanceof Array) {
                for (var i = 0, n = o.length; i < n; i++)
                    o[i] = X.toJson(o[i], "", ind + "\t");
                json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
            }
            else if (o == null)
                json += (name && ":") + "null";
            else if (typeof (o) == "object") {
                var arr = [];
                for (var m in o)
                    arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
            }
            else if (typeof (o) == "string")
                json += (name && ":") + "\"" + o.toString() + "\"";
            else
                json += (name && ":") + o.toString();
            return json;
        },
        innerXml: function (node) {
            var s = ""
            if ("innerHTML" in node)
                s = node.innerHTML;
            else {
                var asXml = function (n) {
                    var s = "";
                    if (n.nodeType == 1) {
                        s += "<" + n.nodeName;
                        for (var i = 0; i < n.attributes.length; i++)
                            s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                        if (n.firstChild) {
                            s += ">";
                            for (var c = n.firstChild; c; c = c.nextSibling)
                                s += asXml(c);
                            s += "</" + n.nodeName + ">";
                        }
                        else
                            s += "/>";
                    }
                    else if (n.nodeType == 3)
                        s += n.nodeValue;
                    else if (n.nodeType == 4)
                        s += "<![CDATA[" + n.nodeValue + "]]>";
                    return s;
                };
                for (var c = node.firstChild; c; c = c.nextSibling)
                    s += asXml(c);
            }
            return s;
        },
        escape: function (txt) {
            return txt.replace(/[\\]/g, "\\\\")
                      .replace(/[\"]/g, '\\"')
                      .replace(/[\n]/g, '\\n')
                      .replace(/[\r]/g, '\\r');
        },
        removeWhite: function (e) {
            e.normalize();
            for (var n = e.firstChild; n;) {
                if (n.nodeType == 3) {  // text node
                    if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                        var nxt = n.nextSibling;
                        e.removeChild(n);
                        n = nxt;
                    }
                    else
                        n = n.nextSibling;
                }
                else if (n.nodeType == 1) {  // element node
                    X.removeWhite(n);
                    n = n.nextSibling;
                }
                else                      // any other node
                    n = n.nextSibling;
            }
            return e;
        }
    };
    if (xml.nodeType == 9) // document node
        xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), (xml.nodeName.indexOf(':') > -1 ? xml.nodeName.split(':').pop() : xml.nodeName), "\t");
    json = "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";    

    return JSON.parse(json);
};

XML.XTree.prototype.getJson = function (xml) {
    var _xtree = this;
    var xmlDoc = _xtree.parseXml(xml);
    if (xmlDoc)
        return _xtree.toJson(xmlDoc, '\t');
};