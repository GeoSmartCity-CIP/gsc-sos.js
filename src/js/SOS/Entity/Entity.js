var SOS = SOS || {};

SOS.entity = SOS.entity || {};

/**
 * Instancia del objeto SOS al cual estará conectado el objeto instanciado.
 * @property sos
 * @type SOS
 */
/**
 * Hace referencia al tipo de conexión de solicitud/respuesta con el servicio
 * @property defaultSource
 * @type SOS.bindingType 
 * @default SOS.bindingType.XML
 */
/**
 * Contiene la configuración de urls para llamadas GET/POST extraídas del capabilities del servicio
 * @property postCfg
 * @type array
 * @default null
 */
/**
 * Contiene la configuración del capabilities de las peticiones GET/POST para los contenidos acceptados
 * @property dcp
 * @type array
 * @default null
 */
/**
 * Contiene la URL para las peticiones POST para el tipo de conexión
 * @property postUrl
 * @type string
 * @default null
 */
SOS.Entity = function (options) {
    var _ent = this;

    options = options || {};

    if (!(this instanceof SOS.Entity)) throw Error('Error ' + _ent.entityName + ' ' + SOS.Const.ErrorText.SOS_VIA_NEW);

    _ent.data = null;
    _ent.sources = {};

    var _bindSources = function () {
        if (_ent.sources) {
            if (!_ent.sources.xml)
                _ent.sources.xml = _ent.bindSourceXML();

            if (!_ent.sources.json)
                _ent.sources.json = _ent.bindSourceJSON();
        }
    };

    if (!options.sos && !options.url)
        throw Error(SOS.Const.ErrorText.SOS_URL_MISSING);

    _ent.sos = options.sos || new SOS({ url: options.url, bindingType: SOS.bindingType.XML, entity: _ent });

    _ent.defaultSource = options.defaultSource || options || 'xml';
    _ent.postCfg = null;
    
    _ent.dcp = _ent.dcp || [];    
    _ent.postUrl = _ent.postUrl || '';

    _bindSources();

    _ent.get = new SOS.method.GET(_ent);

    //si la entidad requiere de la extracción de la url para post del capabilities, nos suscribimos al evento SOS_CAPABILITIES_AVAILABLE
    if (_ent.capsOperation) {
        _ent.sos.registerUserCallback({
            event: SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE, callback: function () {
                _ent.bindUrlConfig();
            }
        });
    }
};

SOS.Entity.prototype.bindUrlConfig = function () {
    var _ent = this;

    var _getUrl = function () {
        _ent.postCfg = [];

        if (_ent.dcp) {
            if (_ent.dcp instanceof Array) {
                for (var i = 0; i < _ent.dcp.length; i++) {
                    if (_ent.dcp[i].method.toLowerCase() == 'post') {
                        _ent.postCfg.push({
                            "@href": _ent.dcp[i].href,
                            "constraint": {
                                "allowedValues": {
                                    "value": _ent.dcp[i].constraints['Content-Type'].allowedValues
                                }
                            }
                        });
                    }
                }
            } else if (_ent.dcp && _ent.dcp.hTTP) { _ent.postCfg = _ent.dcp.hTTP.post; }

        }
        if (_ent.postCfg) {
            var post = _ent.postCfg;
            if (!(post instanceof Array)) {
                return post['@href'];
            }
            else {
                for (var i = 0; i < _ent.postCfg.length; i++) {
                    var url = _ent.postCfg[i]['@href'];
                    for (var format in _ent.postCfg[i].constraint.allowedValues) {
                        if (_ent.postCfg[i].constraint.allowedValues[format] instanceof Array) {
                            for (var j = 0; j < _ent.postCfg[i].constraint.allowedValues[format].length; j++) {
                                if (_ent.postCfg[i].constraint.allowedValues[format][j] == _ent.sos.config.post.responseFormatType)
                                    return url;
                            }
                        }
                        if (_ent.postCfg[i].constraint.allowedValues[format] == _ent.sos.config.post.responseFormatType)
                            return url;
                    }
                }
            }
        }
    };

    var ope = _ent.sos.capsFormatter.getOperation(_ent.capsOperation);
    if (ope) {
        _ent.dcp = ope.dCP || ope.dcp;
        _ent.postUrl = _getUrl();
    }
};

SOS.Entity.prototype.getPostUrl = function () {
    var _ent = this;
    
    if (_ent.postUrl)
        return new SOS.Promise(function (resolve, reject) {
            resolve(_ent.postUrl);
        });        
    else {
        return new SOS.Promise(function (resolve, reject) {
            _ent.sos.getCapabilities().then(function (caps) {

                if (_ent.sos.capsFormatter.data == null)
                    _ent.sos.capsFormatter.data = caps;

                _ent.bindUrlConfig();

                resolve(_ent.postUrl);
            });
        });        
    }
};

SOS.Entity.prototype.getContentType = function () {
    var _ent = this;
    if (_ent.sources && _ent.sources[_ent.defaultSource]) {
        switch (_ent.defaultSource) {
            case 'json':
                return 'application/json';
            case 'xml':
                return 'application/xml';
        }
    }
};

SOS.Entity.prototype.bindSourceXML = function () {
    var _ent = this;
    throw new Error('bindSourceXML not implemented.');
};

SOS.Entity.prototype.bindSourceJSON = function () {
    var _ent = this;
    throw new Error('bindSourceJSON not implemented.');
};





