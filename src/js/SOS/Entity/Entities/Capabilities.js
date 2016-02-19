
/**
 * Instancia un objeto Capabilities.
 * En la instanciación de la clase se lanza la petición getCapabilities al servicio indicado en el objeto de configuración.
 *
 * @class Capabilities
 * @extends SOS.Entity
 * @param {object} { url: urlServicio } - Indica la url del servicio al cual se conectará.
 * @throws {Error} Lanza error cuando no se construye el objeto mediante new.
 * @throws {Error} Lanza error cuando no se indica URL al servicio o una instancia de SOS.
 */
SOS.entity.Capabilities = function (options) {
    var _ent = this;
    _ent.entityName = 'Capabilities';

    SOS.Entity.apply(_ent, arguments);

    _ent.getCapabilities();
};
SOS.inherit(SOS.entity.Capabilities, SOS.Entity);

/**
  * Solicita el capabilities del servicio indicado.
  * Al finalizar lanza el evento SOS_CAPABILITIES_AVAILABLE.
  * @method getCapabilities
  * @async  
  * @param {object} [options] Objeto de opciones de configuración { url: urlServicio }.
  * @return {SOS.Promise} Promesa
  * @throws {Error} Lanza error cuando no se indica url del servicio en las opciones de configuración.
  * @example
        var caps = new SOS.entity.Capabilities({ url: 'http://sos_service/service'});
        caps.getCapabilities().then(function(data) {
            if(data) {
                console.log('Capabilities OK');  
            }
        });   
  */
SOS.entity.Capabilities.prototype.getCapabilities = function (options) {
    var _ent = this;

    options = options || {};

    if (_ent.sos && !_ent.sos.url)
        throw Error(SOS.Const.ErrorText.SOS_URL_MISSING);

    SOS.Capabilities = SOS.Capabilities || {};

    if (!SOS.Capabilities[_ent.sos.url] && !(_ent.sos.capabilitiesPromise instanceof SOS.Promise)) {

        var getCaps = function (resolve, reject) {
            var _parseCapabilities = function (response) {

                if (response && response.responseText) {
                    _ent.get.read(response.responseText);
                    if (_ent.data) {

                        // limpiamos referencias
                        if (_ent.data.Capabilities)
                            _ent.data = _ent.data.Capabilities;

                        _ent.sos.SOSCapabilities = _ent.data;
                        _ent.sos.setObservationResponseFormatFromTypeSuggestion(_ent.sos.config.observation.responseFormatType);
                    }

                    SOS.Capabilities[_ent.sos.url] = _ent.data;

                    _ent.sos.events.triggerEvent(SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE);

                    resolve(SOS.Capabilities[_ent.sos.url]);

                    // limpiamos la promesa ya resuelta
                    _ent.sos.capabilitiesPromise = null;
                }
            };

            if (options.callback) {
                options.scope.registerUserCallback({ event: SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE, callback: options.callback });
            }

            SOS.Request.POST({
                url: _ent.sos.url,
                headers: {
                    "Content-Type": _ent.getContentType()
                },
                data: _ent.get.write(),
                scope: _ent.sos,
                async: _ent.sos.async,
                failure: function (error) {
                    console.log(SOS.Const.ErrorText.SOS_CAPABILITIES_ERROR);
                    console.log(error);
                    reject(SOS.Const.ErrorText.SOS_CAPABILITIES_ERROR + ' :' + error);
                },
                success: _parseCapabilities
            });
        };

        _ent.sos.capabilitiesPromise = new SOS.Promise(getCaps);

        return _ent.sos.capabilitiesPromise;

    } else if (_ent.sos.capabilitiesPromise instanceof SOS.Promise) {

        return _ent.sos.capabilitiesPromise;
    }
    else {
        return new SOS.Promise(function (resolve, reject) {
            resolve(SOS.Capabilities[_ent.sos.url]);
        });
    }
};

/**
  * Solicita la información de una operación extraída del capabilities.
  * @method getOperation  
  * @param {string} Operación, nombre de la operación a validar.
  * @return {object}
  * @example
        var caps = new SOS.entity.Capabilities({ url: 'http://sos_service/service'});
        caps.getCapabilities().then(function(data) {
            if(data) {
                var getFOIData = caps.getOperation('getFeatureOfInterest');
                if(getFOIData) {
                    console.log('Datos de la operación getFeatureOfInterest OK');
                }
            }
        });   
  */
SOS.entity.Capabilities.prototype.getOperation = function (ope) {
    var _ent = this;

    if (SOS.Utils.isValidObject(SOS.Capabilities[_ent.sos.url])) {
        var _opes = _ent.getOperationMetadata();
        if (_opes instanceof Array) {
            for (var i = 0; i < _opes.length; i++) {
                if (_opes[i]['@name'].toLowerCase() == ope.toLowerCase().replace(SOS.Utils.regExes.trimSpace, ""))
                    return _opes[i];
            }
        } else if (_opes instanceof Object && SOS.Utils.isValidObject(_opes)) {
            for (var op in _opes) {
                if (op.toLowerCase() == ope.toLowerCase().replace(SOS.Utils.regExes.trimSpace, ""))
                    return _opes[op];
            }
        }

        return null;
    }

    return null;
};

/**
  * Solicita los parámetros asociados a una operación extraídos del capabilities.
  * @method getOperationParameters  
  * @param {string} Operación, nombre de la operación a validar.
  * @return {array}
  * @example
        var caps = new SOS.entity.Capabilities({ url: 'http://sos_service/service'});
        caps.getCapabilities().then(function(data) {
            if(data) {
                var getFOIParams = caps.getOperationParameters('getFeatureOfInterest');
                if(getFOIParams) {
                    console.log('Parámetros de la operación getFeatureOfInterest OK');
                }
            }
        });   
  */
SOS.entity.Capabilities.prototype.getOperationParameters = function (ope) {
    var _ent = this;
    var opeData = _ent.getOperation(ope);
    if (SOS.Utils.isValidObject(opeData)) {
        return opeData.parameter || opeData.parameters;
    }
};

/**
  * Solicita los valores disponibles para los parámetros asociados a una operación extraídos del capabilities.
  * @method getOperationParameterValues  
  * @param {string} Operación, nombre de la operación a validar.
  * @param {string} Parámetros, nombre del parámetro del cual obtener los valores disponibles.
  * @return {array}
  * @example
        var caps = new SOS.entity.Capabilities({ url: 'http://sos_service/service'});
        caps.getCapabilities().then(function(data) {
            if(data) {
                var getFOIParams = caps.getOperationParameters('getFeatureOfInterest');
                getFOIParams = getFOIParams || [];

                if(getFOIParams.length > 0) {
                    console.log('Parámetros de la operación getFeatureOfInterest OK');
                    var getFOIParamValues = caps.getOperationParameters('getFeatureOfInterest', getFOIParams[0]);

                    getFOIParamValues = getFOIParamValues || getFOIParamValues;
                    if(getFOIParamValues.length > 0)
                        console.log('Valores disponibles para el parámetro ' + getFOIParams[0] + ': OK');
                }
            }
        });   
  */
SOS.entity.Capabilities.prototype.getOperationParameterValues = function (ope, param) {
    var _ent = this;
    var opeData = _ent.getOperationParameters(ope);
    if (SOS.Utils.isValidObject(opeData)) {
        if (opeData instanceof Array) {
            for (var i = 0; i < opeData.length; i++) {
                if (opeData[i]['@name'].toLowerCase() == param.toLowerCase().replace(SOS.Utils.regExes.trimSpace, ""))
                    return (opeData[i].allowedValues) ? opeData[i].allowedValues.value || opeData[i].allowedValues : null;
            }
        } else if (opeData instanceof Object) {
            for (var pa in opeData) {
                if (pa.toLowerCase() == param.toLowerCase().replace(SOS.Utils.regExes.trimSpace, "")) {
                    if (opeData[pa].allowedValues)
                        return opeData[pa].allowedValues.value || opeData[pa].allowedValues;
                    else {
                        return opeData[pa];
                    }
                }
            }
        }
    }

    return [];
};


/**
  * Solicita las operaciones disponibles extraídas del capabilities.
  * @method getOperationMetadata    
  * @return {array}
  */
SOS.entity.Capabilities.prototype.getOperationMetadata = function () {
    var _ent = this;

    if (SOS.Capabilities[_ent.sos.url]) {
        var data = SOS.Capabilities[_ent.sos.url];

        if (data.operationsMetadata)
            return data.operationsMetadata.operation;
        else if (data.operationMetadata)
            return data.operationMetadata.operations;
    }

    return [];
};

SOS.entity.Capabilities.prototype.bindSourceXML = function () {
    var xmlSource = new SOS.source.XML();

    xmlSource.write = function () {
        var getRequest = '<?xml version="1.0" encoding="UTF-8"?> ' +
            '<sos:GetCapabilities ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:sos="http://www.opengis.net/sos/2.0" ' +
                'xmlns:ows="http://www.opengis.net/ows/1.1" ' +
                'xmlns:swe="http://www.opengis.net/swe/2.0" service="SOS" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sosGetCapabilities.xsd"> ' +
                '<ows:AcceptVersions> ' +
                    '<ows:Version>2.0.0</ows:Version> ' +
                '</ows:AcceptVersions> ' +
                '<ows:Sections> ' +
                    '<ows:Section>ServiceIdentification</ows:Section> ' +
                    '<ows:Section>ServiceProvider</ows:Section> ' +
                    '<ows:Section>OperationsMetadata</ows:Section> ' +
                    '<ows:Section>FilterCapabilities</ows:Section> ' +
                '</ows:Sections> ' +
            '</sos:GetCapabilities>';

        return getRequest;
    };

    return xmlSource;
};

SOS.entity.Capabilities.prototype.bindSourceJSON = function () {
    var jsonSource = new SOS.source.JSON();
    jsonSource.write = function () {
        var _src = this;

        return _src.__proto__.write({
            "request": "GetCapabilities",
            "service": "SOS",
            "sections": [
              "ServiceIdentification",
              "ServiceProvider",
              "OperationsMetadata",
              "FilterCapabilities",
              "Contents"
            ]
        });
    };

    return jsonSource;
};

