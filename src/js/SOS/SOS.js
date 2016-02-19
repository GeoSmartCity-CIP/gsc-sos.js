/// <reference path="Entity/Entities/Capabilities.js" />
/// <reference path="Entity/Entities/DescribeSensor.js" />
/// <reference path="Entity/Entities/FeatureOfInterest.js" />
/// <reference path="Entity/Entities/Observation.js" />
/// <reference path="Entity/Entity.js" />
/// <reference path="Entity/Offering.js" />
/// <reference path="Method/Method.js" />
/// <reference path="Source/JSON/SourceJSON.js" />
/// <reference path="Source/XML/SourceXML.js" />
/// <reference path="Source/Source.js" />



/**
 * Instancia un objeto SOS.
 * Es el objeto principal de la API.
 * Al instanciar la clase, automáticamente se lanza una petición getCapabilities al servcio indicado en el objeto de configuración. 
 *
 * @class SOS
 * @param {object} options { url: urlServicio } 
 * - Requerido: URL del servicio al cual se conectará 
 * @throws {Error} Lanza error cuando no se construye el objeto mediante new.
 * @throws {Error} Lanza error cuando no se indica URL al servicio o una instancia de SOS.
 */
var SOS = function (options) {

    if (!(this instanceof SOS)) throw new Error('SOS ' + SOS.Const.ErrorText.SOS_VIA_NEW);

    var _sos = this;

    // url del servicio
    _sos.url = null;

    _sos.capabilitiesPromise = null;
    // instancia del sos actual
    _sos.scope = null;
    // eventos
    _sos.events = null,

    // instancia de la entidad Capabilities, da acceso a los métodos y propiedades de la entidad
    _sos.capsFormatter = null,
    // instancia de la entidad Observation, da acceso a los métodos y propiedades de la entidad
    _sos.obsFormatter = null,
    // instancia de la entidad FeatureOfInterest, da acceso a los métodos y propiedades de la entidad
    _sos.foiFormatter = null,
    // instancia de la entidad DescribeSensor, da acceso a los métodos y propiedades de la entidad
    _sos.sensorDescFormatter = null,
    _sos.config = null,

    _sos.initialize(options);
};


/**
 * URL del servicio del cual obtendrá datos
 * @property url
 * @type string 
 */

/**
 * Promesa de la solicitud en curso del capabilities del servicio indicado
 * @property capabilitiesPromise
 * @type SOS.Promise 
 */

/**
 * Manejador de eventos
 * @property events
 * @type SOS.Events 
 */

/**
 * Instancia de la entidad Capabilities asociada al servicio
 * @property capsFormatter
 * @type SOS.entity.Capabilities 
 */

/**
 * Instancia de la entidad Observation asociada al servicio
 * @property obsFormatter
 * @type SOS.entity.Observation 
 */

/**
 * Instancia de la entidad FeatureOfInterest asociada al servicio
 * @property foiFormatter
 * @type SOS.entity.FeatureOfInterest 
 */

/**
 * Instancia de la entidad DescribeSensor asociada al servicio
 * @property sensorDescFormatter
 * @type SOS.entity.DescribeSensor 
 */

// Indicamos cómo nos comunicamos con el servicio, tanto solicitudes como las respuesta estarán con el tipo de binding indicado 
SOS.bindingType = {
    XML: 'xml',
    JSON: 'json'
};

// Indicamos si queremos los offering con los atributos de sos 1.0 (menos atributos que en sos 2.0) o sos 2.0
SOS.offeringType = {
    SOS_1: 'sos_1',
    SOS_2: 'sos_2'
};

SOS.Const = {};
SOS.Const.ErrorText = {
    SOS_VIA_NEW: ' must be constructed via new',
    SOS_URL_MISSING: 'Error requiere URL del servicio',
    SOS_CAPABILITIES_ERROR: 'Error en la solicitud del capabilities',
    SOS_SENSOR_DESCRIPTION_ERROR: 'Error en la solicitud de la descripción',
    SOS_FEATURE_OF_INTEREST_ERROR: 'Error en la solicitud de features of interest',
    SOS_OBSERVATION_ERROR: 'Error en la solicitud de observaciones',
    XML: {
        UNKNOWN_PARAM: 'Error parámetro desconocido',
        WRONG_PARAM: 'Error parámetro incorrecto',
        EMPTY_PARAM: 'Error parámetro valor vacío'//'parameter value must have value'
    },
    FOI: {
        SOS_FOI_GET_BY_POINT_SRS_MISSING: 'Error requiere SRS',
        SOS_FOI_GET_BY_POINT_COORDS_MISSING: 'Error requiere array con coordenadas',
        SOS_FOI_GET_BY_POINT_RADIUS_MISSING: 'Error requiere radio en unidad de medida del mapa'
    }
};
SOS.Const.Events = {
    SOS_CAPABILITIES_AVAILABLE: 'sosCapabilitiesAvailable',
    SOS_OFFERINGS_CAPABILITIES_AVAILABLE: 'sosOffsCapabilitiesAvailable',
    SOS_SENSOR_DESCRIPTION_AVAILABLE: 'sosSensorDescriptionAvailable',
    SOS_FEATURE_OF_INTEREST_AVAILABLE: 'sosFeatureOfInterestAvailable',
    SOS_FEATURES_OF_INTEREST_AVAILABLE: 'sosFeaturesOfInterestAvailable',
    SOS_OBSERVATION_AVAILABLE: 'sosObservationAvailable',
    SOS_LATEST_OBSERVATION_AVAILABLE: 'sosLatestObservationAvailable',
    SOS_OFFERING_OBSERVATION_AVAILABLE: 'sosOfferingObsAvailable',
    SOS_OFFERING_RESULT_AVAILABLE: 'sosOfferingResultAvailable',
    SOS_OBSERVATION_BY_ID_AVAILABLE: 'sosObservationByIdAvailable'
};


SOS.prototype.getResponseFormatType = function (post) {
    switch (this.bindingType) {
        case 'xml':
            return "text/xml";
            break;
        case 'json':
            return "application/json";
            break;
    }
};

SOS.prototype.getResponseFormat = function () {
    switch (this.bindingType) {
        case 'xml':
            return "text/xml;subtype=\"om/1.0.0\"";
            break;
        case 'json':
            return "application/json;charset=UTF-8";
            break;
    }
};


SOS.prototype.initialize = function (options) {
    var _sos = this;

    _sos.url = null;

    if (!options.bindingType) {
        _sos.bindingType = _sos.bindingType.XML;
        console.log('SOS bindingType missing.');
    }
    else
        _sos.bindingType = options.bindingType;

    SOS.Proxy.init();

    _sos.url = null;
    _sos.config = {
        version: "2.0.0",
        async: true,
        observation: {
            responseFormatType: _sos.getResponseFormatType(),
            responseFormat: _sos.getResponseFormat(),
            resultModel: "om:Measurement"
        },
        post: {
            setUrlFromCapabilities: true,
            constraint: "Content-Type",
            responseFormatType: _sos.getResponseFormatType(true),
            url: null
        }
    };

    // contiene los offerings disponibles desde el capabilities
    _sos.availableOfferings = [];
    _sos.events = new SOS.Events();

    SOS.Utils.extend(_sos, options);

    if (options.entity && options.entity instanceof SOS.entity.Observation)
        _sos.obsFormatter = options.entity;
    else _sos.obsFormatter = new SOS.entity.Observation({ sos: _sos, defaultSource: _sos.bindingType });

    if (options.entity && options.entity instanceof SOS.entity.FeatureOfInterest)
        _sos.foiFormatter = options.entity;
    else _sos.foiFormatter = new SOS.entity.FeatureOfInterest({ sos: _sos, defaultSource: _sos.bindingType });

    if (options.entity && options.entity instanceof SOS.entity.DescribeSensor)
        _sos.sensorDescFormatter = options.entity;
    else _sos.sensorDescFormatter = new SOS.entity.DescribeSensor({ sos: _sos, defaultSource: _sos.bindingType });

    if (options.entity && options.entity instanceof SOS.entity.Capabilities)
        _sos.capsFormatter = options.entity;
    else _sos.capsFormatter = new SOS.entity.Capabilities({ sos: _sos, defaultSource: _sos.bindingType });


    /* By default, the POST URL is the same as the GET URL */
    if (this.url) {
        this.config.post.url = this.url;
    }
};


/**
 * Copy mandatory properties from 'this' to the given object
 */
SOS.prototype.copyMandatoryObjectProperties = function (obj) {
    var _sos = this;

    if (typeof obj === "object") {
        obj.config = _sos.config;
        obj.url = _sos.url;
    }

    return obj;
};

/**
 * Registrar la función suministrada como un controlador de eventos. 
 *
 * @method registerUserCallback
 * @param {object} params { event: evento, scope: this, callback: miFuncion }   
 * @example
        sos.registerUserCallback({
                event: SOS.Const.Events.SOS_SENSOR_DESCRIPTION_AVAILABLE,
                scope: this,
                callback: function () {
                    console.log('Evento SOS_SENSOR_DESCRIPTION_AVAILABLE: ');                    
                    if (sos.sensorDescFormatter.data) {
                        console.log('Descripción del sensor disponible');                        
                    }
                }
        });
 */
SOS.prototype.registerUserCallback = function (params) {
    var _sos = this;

    if (SOS.Utils.isValidObject(params)) {
        if (typeof params.event === "string" && typeof params.callback === "function") {
            if (!SOS.Utils.isValidObject(params.scope)) {
                params.scope = this;
            }
            _sos.events.register(params.event, params.callback);
        }
    }
};

/**
 * Anula el registro de un controlador de eventos previamente asignada. 
 *
 * @method unregisterUserCallback
 * @param {object} params { event: evento, scope: this, callback: miFuncion }   
 */
SOS.prototype.unregisterUserCallback = function (params) {
    var _sos = this;

    if (SOS.Utils.isValidObject(params)) {
        if (typeof params.event === "string" && typeof params.callback === "function") {
            if (!SOS.Utils.isValidObject(params.scope)) {
                params.scope = _sos;
            }
            _sos.events.unregister(params.event, params.callback);
        }
    }
};

/**
 * Solicita el capabilities del servicio
 *
 * @method getCapabilities
 * @param {object} [callback] { callback: miFuncion }   
 * @return {SOS.Promise} Promesa
 * @example    
        var sos = new SOS({ url: 'http://sos_service/service', bindingType: SOS.bindingType.XML });        
        sos.getCapabilities().then(function (data) {            
            console.log('Capabilities OK');
        });
 */
SOS.prototype.getCapabilities = function (callback) {
    var _sos = this;

    var options = {
        scope: _sos,
        callback: callback
    }

    return new SOS.Promise(function (resolve, reject) {
        _sos.capsFormatter.getCapabilities(options).then(function (data) {
            resolve(data);
        });
    });
};

/**
 * Solicita los offerings disponibles en el capabilities
 *
 * @method getCapabilitiesOfferings
 * @param {object} [callback] { callback: miFuncion }   
 * @return {SOS.Promise} Promesa
 * @example    
        var sos = new SOS({ url: 'http://sos_service/service', bindingType: SOS.bindingType.XML });        
        sos.getCapabilitiesOfferings().then(function (data) {            
            console.log('Offerings OK');
        });
 */
SOS.prototype.getCapabilitiesOfferings = function (callback) {
    var _sos = this;

    SOS.OffsCapabilities = SOS.OffsCapabilities || {};

    if (!SOS.OffsCapabilities[_sos.url] && !(_sos.offsCapabilitiesPromise instanceof SOS.Promise)) {

        var getCaps = function (resolve, reject) {
            var _parse = function (response) {
                if (response && response.responseText) {
                    if (response.responseText.indexOf("ExceptionText") > 0)
                        reject('Error getCapabilities');
                    else {
                        var data = new SOS.source.XML().read(response.responseText);
                        // limpiamos referencias
                        if (data.Capabilities)
                            data = data.Capabilities;

                        SOS.OffsCapabilities[_sos.url] = data;

                        _sos.events.triggerEvent(SOS.Const.Events.SOS_OFFERINGS_CAPABILITIES_AVAILABLE);

                        resolve(SOS.OffsCapabilities[_sos.url]);

                        // limpiamos la promesa ya resuelta
                        _sos.offsCapabilitiesPromise = null;
                    }
                }
            };

            if (callback) {
                _sos.registerUserCallback({ event: SOS.Const.Events.SOS_OFFERINGS_CAPABILITIES_AVAILABLE, callback: callback });
            }

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
                        '<ows:Section>Contents</ows:Section> ' +
                    '</ows:Sections> ' +
                '</sos:GetCapabilities>';


            SOS.Request.POST({
                url: _sos.url,
                headers: {
                    "Content-Type": _sos.capsFormatter.getContentType()
                },
                data: getRequest,
                scope: _sos,
                async: _sos.async,
                failure: function (error) {
                    reject('Error getOfferingsCapabilities - ' + _sos.url);
                },
                success: _parse
            });
        };

        _sos.offsCapabilitiesPromise = new SOS.Promise(getCaps);

        return _sos.offsCapabilitiesPromise;

    } else if (_sos.offsCapabilitiesPromise instanceof SOS.Promise) {

        return _sos.offsCapabilitiesPromise;
    }
    else {
        return new SOS.Promise(function (resolve, reject) {
            resolve(SOS.OffsCapabilities[_sos.url]);
        });
    }
};

/**
 * Validate the internal capabilities object
 */
SOS.prototype.haveValidCapabilitiesObject = function () {
    var _sos = this;

    return SOS.Utils.isValidObject(_sos.capsFormatter.data);
};

/**
 * Set the config.observation.responseFormat member to an available
 * format of the given type, parsed from the capabilities object
 */
SOS.prototype.setObservationResponseFormatFromTypeSuggestion = function (type) {
    var _sos = this;

    if (this.haveValidCapabilitiesObject()) {
        if (SOS.Utils.isValidObject(_sos.capsFormatter.data)) {
            var allowedValues = _sos.capsFormatter.getOperationParameterValues('GetObservation', 'responseFormat');

            if (allowedValues) {
                for (var i = 0; i < allowedValues.length; i++) {
                    if (allowedValues[i].indexOf(type) >= 0) {
                        this.config.observation.responseFormat = allowedValues[i];
                        break;
                    }
                }
            }
        }
    }
};


SOS.prototype.getOfferingList = function (sosOfferingType) {
    var _sos = this;

    sosOfferingType = sosOfferingType || SOS.offeringType.SOS_2;

    var get = function (resolve, reject) {
        _sos.getCapabilitiesOfferings().then(function () {
            switch (sosOfferingType) {
                case 'sos_1':
                    resolve(_sos.getSimpleOfferings());
                    break;
                case 'sos_2':
                    resolve(_sos.getOfferings());
                    break;
            }
        });
    };

    return new SOS.Promise(get);
};

SOS.prototype._bindOfferings = function () {
    var _sos = this;

    SOS.OffsCapabilities = SOS.OffsCapabilities || {};

    var capabilities = SOS.OffsCapabilities[_sos.url];
    if (capabilities) {

        var offeringList = {};

        // limpiamos refencias
        if (capabilities && capabilities.contents['contents'])
            capabilities.contents = capabilities.contents.contents.offering;

        var getObservedArea = function (off) {
            var obsArea = off.observedArea || off.observedArea && off.observedArea.envelope || null;
            if (obsArea) {
                return {
                    crs: off.observedArea.envelope['@srsName'].split('/').pop(),
                    lowerCorner: off.observedArea.envelope.lowerCorner.split(' '),
                    upperCorner: off.observedArea.envelope.upperCorner.split(' ')
                };
            }
            else return {};
        };
        var getFOI = function (off) {
            var foiID = [];
            for (var property in off) {
                if (property == 'relatedFeature') {
                    if (off[property].featureRelationship)
                        foiID.push(off[property].featureRelationship.target['@href']);
                }
            }

            return foiID;
        };

        var contentsIsArray = function (c) {
            for (var i = 0; i < c.length; i++) {
                var off = c[i].observationOffering || c[i];
                if (off) {
                    _sos.availableOfferings.push(new SOS.Offering({
                        sos: _sos,
                        bindingType: SOS.bindingType.JSON,
                        identifier: off.identifier,
                        name: off.name && off.name['#text'] || '',
                        featureOfInterestType: off.featureOfInterestType,
                        featureOfInterestIds: getFOI(off),
                        observedProperties: off.observableProperty,
                        observationType: off.observationType,
                        observedArea: getObservedArea(off),
                        phenomenonTime: off.phenomenonTime,
                        procedures: off.procedure,
                        procedureDescriptionFormat: off.procedureDescriptionFormat,
                        responseFormat: off.responseFormat,
                        resultTime: off.resultTime
                    }));

                    offeringList[off.identifier] = {
                        featureOfInterestIds: getFOI(off),
                        name: off.name && off.name['#text'],
                        observedProperties: off.observableProperty,
                        procedures: off.procedure instanceof Array ? off.procedure : [off.procedure],
                        responseFormats: off.responseFormat,
                        responseModes: off.responseFormat,
                        resultModels: [],
                        time: {
                            timePeriod: {
                                beginPosition: off.resultTime && off.resultTime.timePeriod ? off.resultTime.timePeriod.beginPosition : '',
                                endPosition: off.resultTime && off.resultTime.timePeriod ? off.resultTime.timePeriod.endPosition : ''
                            }
                        }
                    };

                    if (_sos.availableOfferings[i] && _sos.availableOfferings[i].observedArea)
                        offeringList[off.identifier].bounds = {
                            crs: _sos.availableOfferings[i].observedArea && _sos.availableOfferings[i].observedArea.crs,
                            bottom: _sos.availableOfferings[i].observedArea.lowerCorner && _sos.availableOfferings[i].observedArea.lowerCorner.split(' ')[0],
                            left: _sos.availableOfferings[i].observedArea.lowerCorner && _sos.availableOfferings[i].observedArea.lowerCorner.split(' ')[1],
                            right: _sos.availableOfferings[i].observedArea.upperCorner && _sos.availableOfferings[i].observedArea.upperCorner.split(' ')[0],
                            top: _sos.availableOfferings[i].observedArea.upperCorner && _sos.availableOfferings[i].observedArea.upperCorner.split(' ')[1]
                        };
                    else offeringList[off.identifier].bounds = {};
                }
            }
        };
        var contentsIsObject = function (c) {
            for (var _off in c) {
                var off = c[_off];
                scope.availableOfferings.push(new SOS.Offering({
                    sos: _sos,
                    bindingType: SOS.bindingType.JSON,
                    identifier: off.identifier,
                    name: off.name && off.name['#text'] || '',
                    featureOfInterestType: off.featureOfInterestType,
                    featureOfInterestIds: getFOI(off),
                    observedProperties: off.observableProperty,
                    observationType: off.observationType,
                    observedArea: getObservedArea(off),
                    phenomenonTime: off.phenomenonTime,
                    procedures: off.procedure,
                    procedureDescriptionFormat: off.procedureDescriptionFormat,
                    responseFormat: off.responseFormat,
                    resultTime: off.resultTime
                }));

                offeringList[off.identifier] = {
                    featureOfInterestIds: getFOI(off),
                    name: off.name && off.name['#text'],
                    observedProperties: off.observableProperty,
                    procedures: off.procedure instanceof Array ? off.procedure : [off.procedure],
                    responseFormats: off.responseFormat,
                    responseModes: off.responseFormat,
                    resultModels: [],
                    time: {
                        timePeriod: {
                            beginPosition: off.resultTime && off.resultTime.timePeriod ? off.resultTime.timePeriod.beginPosition : '',
                            endPosition: off.resultTime && off.resultTime.timePeriod ? off.resultTime.timePeriod.endPosition : ''
                        }
                    }
                };

                if (_sos.availableOfferings[i] && _sos.availableOfferings[i].observedArea)
                    offeringList[off.identifier].bounds = {
                        crs: _sos.availableOfferings[i].observedArea && _sos.availableOfferings[i].observedArea.crs,
                        bottom: _sos.availableOfferings[i].observedArea.lowerCorner && _sos.availableOfferings[i].observedArea.lowerCorner.split(' ')[0],
                        left: _sos.availableOfferings[i].observedArea.lowerCorner && _sos.availableOfferings[i].observedArea.lowerCorner.split(' ')[1],
                        right: _sos.availableOfferings[i].observedArea.upperCorner && _sos.availableOfferings[i].observedArea.upperCorner.split(' ')[0],
                        top: _sos.availableOfferings[i].observedArea.upperCorner && _sos.availableOfferings[i].observedArea.upperCorner.split(' ')[1]
                    };
                else offeringList[off.identifier].bounds = {};
            }
        };

        if (capabilities.contents instanceof Array) contentsIsArray(capabilities.contents);
        else contentsIsObject(capabilities.contents);

        if (offeringList)
            capabilities.contents.offeringList = offeringList;
    }
};

SOS.prototype._getOfferings = function (isComplete) {
    var _sos = this;
    var offs = [];

    SOS.OffsCapabilities = SOS.OffsCapabilities || {};

    var capabilities = SOS.OffsCapabilities[_sos.url];
    if (!capabilities) {
        return _sos.getOfferingList(SOS.offeringType.SOS_2);
    }
    else if (capabilities && !capabilities.contents.offeringList) {
        _sos._bindOfferings(_sos);

        if (!isComplete)
            offs = capabilities.contents.offeringList;
        else
            offs = _sos.availableOfferings;
    }
    else if (!isComplete && capabilities)
        offs = capabilities.contents.offeringList;
    else if (capabilities)
        offs = _sos.availableOfferings;
    else offs = [];

    return new SOS.Promise(function (resolve, reject) {
        resolve(offs);
    });
};

// Retorna lista de offerings tipado sos 1.0
SOS.prototype.getSimpleOfferings = function () {
    var _sos = this;

    return _sos._getOfferings(false);
};

// Retorna lista de offerings tipado sos 2.0
SOS.prototype.getOfferings = function () {
    var _sos = this;

    return _sos._getOfferings(true);
};

/**
 * Obtiene los identificadores de los offerings disponibles
 *
 * @method getOfferingIds 
 * @return {SOS.Promise} Promesa 
 */
SOS.prototype.getOfferingIds = function () {
    var _sos = this;
    var result = [];

    return new SOS.Promise(function (resolve, reject) {
        _sos.getOfferingList(SOS.offeringType.SOS_2).then(function (offList) {

            if (offList instanceof Array) {
                for (var i = 0; i < offList.length; i++) {
                    var o = offList[i];
                    if (o.identifier) {
                        result.push(o.identifier);
                    }
                }
            }
            else {
                for (var offId in offList) {
                    var o = offList[offId];
                    result.push(o);
                }
            }

            resolve(result);
        });
    });
};

/**
 * Obtiene los nombres de los offerings disponibles
 *
 * @method getOfferingIds 
 * @return {SOS.Promise} Promesa 
 */
SOS.prototype.getOfferingNames = function () {
    var _sos = this;
    var result = [];

    return new SOS.Promise(function (resolve, reject) {
        _sos.getOfferingList(SOS.offeringType.SOS_2).then(function (offList) {
            for (var id in offList) {
                result.push(offList[id].name);
            }

            resolve(result);
        });
    });
};

/**
 * Obtiene un offering indicando como filtro el identificador del mismo
 *
 * @method getOffering 
 * @param {string} id offering 
 * @return {SOS.Promise} Promesa 
 */
SOS.prototype.getOffering = function (id) {
    var _sos = this;
    var offering;

    return new SOS.Promise(function (resolve, reject) {
        if (_sos.availableOfferings) {
            for (var i = 0; i < _sos.availableOfferings.length; i++) {
                if (_sos.availableOfferings[i].identifier.toLowerCase() == id.toLowerCase()) {
                    offering = _sos.availableOfferings[i];
                    break;
                }
            }
        } else {
            _sos.getOfferingList(SOS.offeringType.SOS_2).then(function (offList) {
                _sos.getOffering(id);
            });
        }

        resolve(offering);
    });
};

/**
 * Obtiene un offering indicando como filtro el nombre del mismo
 *
 * @method getOffering 
 * @param {string} nombre offering 
 * @return {SOS.Promise} Promesa 
 */
SOS.prototype.getOfferingByName = function (name) {
    var _sos = this;
    var offering;

    return new SOS.Promise(function (resolve, reject) {
        if (_sos.availableOfferings) {
            for (var i = 0; i < _sos.availableOfferings.length; i++) {
                if (_sos.availableOfferings[i].name.toLowerCase() == name.toLowerCase())
                    resolve(_sos.availableOfferings[i]);
            }
        } else {
            _sos.getOfferingList(SOS.offeringType.SOS_2).then(function (offList) {
                if (offList) {
                    for (var off in offList) {
                        if (off.name.toLowerCase() == name.toLowerCase())
                            resolve(off);
                    }
                }
            });
        }

        resolve(offering);
    });
};

/**
 * Obtiene lista de offerings que tengan como procedimiento el indicando como filtro
 *
 * @method getOfferingsForProcedureId 
 * @param {string} procedureId 
 * @return {SOS.Promise} Promesa 
 */
SOS.prototype.getOfferingsForProcedureId = function (procedureId) {
    var _sos = this;
    var result = [];

    return new SOS.Promise(function (resolve, reject) {
        _sos.getOfferingIds().then(function (offIds) {
            for (var i = 0; i < offIds.length; i++) {
                var offering = _sos.getOffering(offIds[i]);
                var procIds = offering.getProcedureIds();

                for (var j = 0; j < procIds.length; j++) {
                    if (procIds[j] == procedureId) {
                        result.push(offering);
                        break;
                    }
                }
            }

            resolve(result);
        });
    });
};

///**
// * Get the feature-of-interest (FOI) IDs
// */
//SOS.prototype.getFeatureOfInterestIds = function () {
//    var _sos = this;
//    var result = [];

//    if (_sos.haveValidCapabilitiesObject()) {
//        for (var id in _sos.capsFormatter.data.contents.offeringList) {
//            var offering = _sos.capsFormatter.data.contents.offeringList[id];
//            result = result.concat(offering.featureOfInterestIds);
//        }
//        result = SOS.Utils.getUniqueList(result);
//    }

//    return result;
//};

/**
 * Obtiene lista de offerings que tengan relación con el featureOfInterest indicando como filtro
 *
 * @method getOfferingsForFeatureOfInterestId 
 * @param {string} foiId 
 * @return {SOS.Promise} Promesa 
 */
SOS.prototype.getOfferingsForFeatureOfInterestId = function (foiId) {
    var _sos = this;
    var result = [];

    return new SOS.Promise(function (resolve, reject) {
        _sos.getOfferingList(SOS.offeringType.SOS_2).then(function (offList) {
            if (offList instanceof Array) {
                for (var i = 0; i < offList.length; i++) {
                    var o = offList[i];
                    if (o.featureOfInterestIds && o.featureOfInterestIds instanceof Array && o.featureOfInterestIds.indexOf(foiId) > -1) {
                        _sos.getOffering(o.identifier).then(function (off) {
                            result.push(off);
                        });
                    }
                }
            }
            else {
                for (var offId in offList) {
                    var o = offList[offId];

                    if (o.featureOfInterestIds && o.featureOfInterestIds instanceof Array && o.featureOfInterestIds.indexOf(foiId) > -1) {
                        _sos.getOffering(offId).then(function (off) {
                            result.push(off);
                        });
                    }
                }
            }

            resolve(result);
        });
    });
};

/**
 * Get the latest observations for a given FOI
 */
SOS.prototype.getLatestObservationsForFeatureOfInterestId = function (foiId) {
    var _sos = this;

    // If foiId is set, then it's sent in latest obs request
    _sos.foiId = foiId;
    _sos.getOfferingsForFeatureOfInterestId(foiId).then(function (offerings) {
        // Get obs for any offerings that have the given FOI
        for (var i = 0, len = offerings.length; i < len; i++) {
            _sos.getLatestObservationsForOffering(offerings[i]);
        }
    });
};

/**
 * Get the latest observations for a given SOS.Offering object
 */
SOS.prototype.getLatestObservationsForOffering = function (offering) {
    var _sos = this;

    var params = {
        offering: offering.id,
        observedProperties: offering.observedProperties
    };

    if (_sos.foiId)
        params.foi = { featuresOfInterest: _sos.foiId };

    _sos.obsFormatter.getObservationLatest(params);
};

/**
 * Get requested observations for a given SOS.Offering object
 * between given start and end datetimes
 */
SOS.prototype.getObservationsForOffering = function (offering, start, end) {
    var _sos = this;

    var params = {
        offering: offering.id,
        observedProperties: offering.observedProperties
    };

    if (_sos.foiId)
        params.foi = { featuresOfInterest: _sos.foiId };

    _sos.obsFormatter.getObservationFirst(params);
};

/**
 * Validate the internal observations object
 */
SOS.prototype.haveValidObservationsObject = function () {
    var _sos = this;

    return SOS.Utils.isValidObject(_sos.SOSObservations);
};

/**
 * Get a count of the number of records contained in the internal
 * observations object
 */
SOS.prototype.getCountOfObservations = function () {
    var _sos = this;
    var n = 0;

    if (_sos.haveValidObservationsObject()) {
        if (SOS.Utils.isValidObject(_sos.SOSObservations.measurements)) {
            n = _sos.SOSObservations.measurements.length;
        }
    }

    return n;
};

/**
 * Get the observation for the given index from the internal
 * observations object
 */
SOS.prototype.getObservationRecord = function (i) {
    var _sos = this;
    var record = {};

    if (_sos.haveValidObservationsObject()) {
        record = _sos.SOSObservations.measurements[i];

        // Add some convenience properties
        record = _sos.addPropertiesToObservationRecord(record);
    }

    return record;
};

/**
 * Get the observation for the given index from the internal
 * observations object, as long as it matches the given filter rules
 */
SOS.prototype.getFilteredObservationRecord = function (i, filter) {
    var _sos = this;
    var record;

    if (_sos.haveValidObservationsObject()) {
        var r = _sos.SOSObservations.measurements[i];

        if (SOS.Utils.isValidObject(filter)) {
            if (SOS.Utils.isValidObject(filter.foiId)) {
                var foi = _sos.getFeatureOfInterestFromObservationRecord(r);

                if (foi && foi.attributes.id == filter.foiId) {
                    record = _sos.SOSObservations.measurements[i];
                }
            } else if (SOS.Utils.isValidObject(filter.observedProperty)) {
                if (r.observedProperty == filter.observedProperty) {
                    record = _sos.SOSObservations.measurements[i];
                }
            }
        } else {
            record = _sos.SOSObservations.measurements[i];
        }

        // Add some convenience properties
        record = _sos.addPropertiesToObservationRecord(record);
    }

    return record;
};

/**
 * Add some standard properties to the given observation record
 */
SOS.prototype.addPropertiesToObservationRecord = function (record) {
    if (SOS.Utils.isValidObject(record)) {
        record.time = record.samplingTime.timeInstant.timePosition;
        record.observedPropertyTitle = SOS.Utils.toTitleCase(SOS.Utils.toDisplayName(SOS.Utils.fqnToName(record.observedProperty)));
        record.uomTitle = SOS.Utils.toDisplayUom(record.result.uom);
    }

    return record;
};

/**
 * Ascertain that the given observation record has FOI properties
 */
SOS.prototype.observationRecordHasValidFeatureOfInterest = function (ob, opts) {
    var opts = opts || { foisIndex: 0, featuresIndex: 0 };

    return (SOS.Utils.isValidObject(ob.fois) &&
            SOS.Utils.isValidObject(ob.fois[opts.foisIndex]) &&
            SOS.Utils.isValidObject(ob.fois[opts.foisIndex].features) &&
            SOS.Utils.isValidObject(ob.fois[opts.foisIndex].features[opts.featuresIndex]));
};

/**
 * Get the FOI object from the given observation record
 */
SOS.prototype.getFeatureOfInterestFromObservationRecord = function (ob, opts) {
    var opts = opts || { foisIndex: 0, featuresIndex: 0 };

    return ob.fois[opts.foisIndex].features[opts.featuresIndex];
};

/**
 * Get details for the given FOI
 */
SOS.prototype.getFeatureOfInterest = function (foiId) {
    var _sos = this;

    _sos.foiFormatter.getFeatureOfInterest({ featureOfInterest: foiId });
};

/**
 * Get the description for the given procedure
 */
SOS.prototype.describeSensor = function (procedureId) {
    var _sos = this;

    var params = {
        idProcedure: procedureId
    };

    _sos.sensorDescFormatter.getDescribeSensor(params);
};


