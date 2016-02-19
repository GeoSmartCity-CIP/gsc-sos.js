
/**
 * Instancia un objeto FeatureOfInterest. 
 *
 * @class FeatureOfInterest
 * @extends SOS.Entity
 * @param {object} { url: urlServicio, valueReference: the_geom } 
 * - URL del servicio al cual se conectará
 * - Opcional: valueReference: Nombre del atributo que hace referencia a la geometría, por defecto sams:shape
 * @throws {Error} Lanza error cuando no se construye el objeto mediante new.
 * @throws {Error} Lanza error cuando no se indica URL al servicio o una instancia de SOS.
 * @example
        var foi = new SOS.entity.FeatureOfInterest({ url: 'http://sos_service/service' });        
 */
SOS.entity.FeatureOfInterest = function (options) {
    var _ent = this;

    _ent.entityName = 'FeatureOfInterest';
    _ent.capsOperation = 'GetFeatureOfInterest';

    SOS.Entity.apply(_ent, arguments);

    _ent.allowedFOIs = [];

    _ent.onCapAllowedFOIs = [];
    _ent.onCapAllowedProcedures = [];
    _ent.onCapAllowedObservedProperty = [];
    _ent.onCapAllowedIDFeaturesOfInterest = [];
    _ent.onCapAllowedRangeSpatialFilter = null;

    _ent.valueReference = options.valueReference || 'sams:shape';
};
SOS.inherit(SOS.entity.FeatureOfInterest, SOS.Entity);


SOS.entity.FeatureOfInterest.prototype._bindFOI = function (ff) {
    var _ent = this;

    return new SOS.entity.FeatureOfInterestRecord(SOS.Utils.extend(ff, { sos: _ent.sos }));
};

/**
  * Solicita los featureOfInterest que cumplan con los filtros indicados, si no se indican filtros obtendrá todos los featureOfInterest disponibles.
  * Completa la propiedad allowedFOIs. 
  * Al finalizar lanza el evento SOS_FEATURE_OF_INTEREST_AVAILABLE.
  * @method getFeatureOfInterest
  * @async  
  * @param {object} [params] Objeto de opciones de filtrado { featureOfInterest: [idFoi], observedProperty: [propiedades], procedure: [procedimientos], spatial:{srs:4326, lowerCorner: [610708, 4742220], upperCorner:[610722, 4742232] } }. - Todos son opcionales
  * @param {function} [callback] Función que se ejecutará al finalizar la petición - Opcional. 
  * @return {SOS.Promise} Promesa
  * @example       

        // Filtro por identificador de FeatureOfInterest
        var foi = new SOS.entity.FeatureOfInterest({ url: 'http://sos_service/service' });
        foi.getFeatureOfInterest({
            featureOfInterest: ['http://sos_service/featureOfInterest/1'] // filtro identificador de featuresOfInterest
        }, function () { // callback una vez finalizada la petición al servicio
            if (foi.data) {
                console.log('Datos de http://sos_service/featureOfInterest/1: OK');
            }                    
        });

        // Filtro espacial
        foi.getFeatureOfInterest({
            spatial: {
                srs: 4326,
                lowerCorner: [-180, -90],
                upperCorner: [180, 90]
            }
        }, function () {       
            // El resultado de la petición se almacena en la propiedad [allowedFOIs]

            if (foi.allowedFOIs.length > 0)
                console.log('');
        });
  */
SOS.entity.FeatureOfInterest.prototype.getFeatureOfInterest = function (params, callback) {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {
            _ent.getPostUrl().then(function (url) {
                if (url && url.length > 0) {
                    var _parseFeatureOfInterest = function () {
                        if (_ent.data) {
                            var features = [];
                            _ent.allowedFOIs = [];
                            _ent.sos.SOSFeatureOfInterest = features = _ent.data.featureOfInterest || _ent.data.GetFeatureOfInterestResponse && _ent.data.GetFeatureOfInterestResponse.featureMember || [];

                            if (features instanceof Array) {
                                for (var i = 0; i < features.length; i++) {
                                    if (features[i].sF_SpatialSamplingFeature || features[i])
                                        _ent.allowedFOIs.push(_ent._bindFOI(features[i].sF_SpatialSamplingFeature || features[i]));
                                }
                            }
                            else {
                                for (var f in features) {
                                    _ent.allowedFOIs.push(_ent._bindFOI(features[f]));
                                }
                            }

                            resolve(_ent.allowedFOIs);

                            _ent.sos.events.triggerEvent(SOS.Const.Events.SOS_FEATURE_OF_INTEREST_AVAILABLE);
                        }
                    };

                    SOS.Request.POST({
                        url: url,
                        async: _ent.sos.config.async,
                        failure: function (error) {
                            console.log(SOS.Const.ErrorText.SOS_FEATURE_OF_INTEREST_ERROR);
                            console.log(error);
                            reject(SOS.Const.ErrorText.SOS_FEATURE_OF_INTEREST_ERROR + ' :' + error);
                        },
                        success: function (response) {
                            if (response && response.responseText)
                                _ent.get.read(response.responseText);

                            _parseFeatureOfInterest();

                            if (callback)
                                callback();
                        },
                        data: _ent.get.write(params)
                    });
                } else resolve([]);
            });
        });
    });
};

/**
  * Solicita los featureOfInterest que se encuentren dentro del bbox aplicado.
  * Completa la propiedad allowedFOIs. 
  * Al finalizar lanza el evento SOS_FEATURE_OF_INTEREST_AVAILABLE.
  * @method getFeatureOfInterestByPoint
  * @async  
  * @param {int} srs Sistema de referencia espacial - Requerido. 
  * @param {array} point Array que contiene las coordenadas del punto - Requerido. 
  * @param {float} radius  Distancia al vértice, en unidades del mapa - Requerido. 
  * @param {object} options Objeto de opciones de filtrado { featureOfInterest: [idFoi], observedProperty: [propiedades], procedure: [procedimientos] }. 
  * - Opcional
  * @param {function} [Callback] Función que se ejecutará al finalizar la petición - Opcional. 
  * @return {SOS.Promise} Promesa
  * @example       

        // Filtro por identificador de FeatureOfInterest
        var foi = new SOS.entity.FeatureOfInterest({ url: 'http://sos_service/service' });
        foi.getFeatureOfInterestByPoint(4326, [42.843, -1.5804], 0.05).then(function (data) { 
            if (data) {
                data = data || [];
                console.log(data.length + ' elementos encontrados');
            }                    
        });        
  */
SOS.entity.FeatureOfInterest.prototype.getFeatureOfInterestByPoint = function (srs, point, radius, params, callback) {
    var _ent = this;

    if (!srs)
        throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_SRS_MISSING);

    if (!point)
        throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_COORDS_MISSING);
    else if (!(point instanceof Array) || (point instanceof Array && point.length != 2))
        throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_COORDS_MISSING);

    if (!radius)
        throw Error(SOS.Const.ErrorText.FOI.SOS_FOI_GET_BY_POINT_RADIUS_MISSING);

    params = params || {};

    var getBBox = function (radius) {
        var _val = 1;
        var allowedCvtr = [];
        var converter = new SOS.Utils.Converter.DataTypeConverter();
        allowedCvtr.push(converter.createConverter(SOS.Utils.Converter.Types.FLOAT));
        allowedCvtr.push(converter.createConverter(SOS.Utils.Converter.Types.INT));

        for (var i = 0; i < allowedCvtr.length; i++) {
            if (allowedCvtr[i].is(radius)) {
                _val = allowedCvtr[i].convert(radius);
            }
        }

        return SOS.Utils.Geom.createBBox(point, radius);
    };
    var bbox = getBBox(radius);
    params.spatial = {
        srs: srs,
        lowerCorner: bbox.lowerCorner,
        upperCorner: bbox.upperCorner
    };

    return _ent.getFeatureOfInterest(params, callback);
};
/**
  * Obtiene los procedimientos que estén relacionados con los featuteOfInterest pasados como parámetro.
  * La relación se extrae de los offerings del capabilities.   
  * @method getProcedures
  * @async    
  * @param {array} foiID Array con los identificadores de los featureOfInterest.   
  * @param {function} [Callback] Función que se ejecutará al finalizar la petición - Opcional. 
  * @return {SOS.Promise} Promesa
  * @example       

        // Filtro por identificador de FeatureOfInterest
        var foi = new SOS.entity.FeatureOfInterest({ url: 'http://sos_service/service' });
        foi.getProcedures('http://sos_service/srr/an2').then(function (data) {
            data = data || [];
            console.log('Procedimientos encontrados: ' + data.length);
        });      
  */
SOS.entity.FeatureOfInterest.prototype.getProcedures = function (foiID, callback) {
    var _ent = this;
    var result = [];

    if (!(foiID instanceof Array))
        foiID = [foiID];

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getOfferingList(SOS.offeringType.SOS_2).then(function (offList) {            
            offList = offList || [];

            if (!(offList instanceof Array))
                offList = [offList];

            for (var z = 0; z < foiID.length; z++) {
                for (var i = 0; i < offList.length; i++) {
                    var o = offList[i];
                    if (o.featureOfInterestIds && o.featureOfInterestIds instanceof Array && o.featureOfInterestIds.indexOf(foiID[z]) > -1) {
                        _ent.sos.getOffering(o.identifier).then(function (off) {                            
                            result = result.concat(off.procedures);
                        });
                    }
                }
            }

            resolve(result);
        });
    });
};
/**
  * Retorna el valor de la propiedad allowedFOIs.
  * @method getAllowedFOIs
  * @async
  * @return {SOS.Promise} Promesa
  */
SOS.entity.FeatureOfInterest.prototype.getAllowedFOIs = function () {
    var _ent = this;

    return _ent.allowedFOIs || [];
};


/**
  * Solicita los procedimientos disponibles en el servicio desde el capabalities y completa la propiedad onCapAllowedProcedures.
  * @method getOnCapAllowedProcedures
  * @async
  * @return {SOS.Promise} Promesa
  */
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedProcedures = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            if (_ent.onCapAllowedProcedures.length == 0)
                _ent.onCapAllowedProcedures = _ent.sos.capsFormatter.getOperationParameterValues('GetFeatureOfInterest', 'procedure');

            resolve(_ent.onCapAllowedProcedures);
        });
    });
};

/**
  * Solicita las propiedades observables disponibles en el servicio desde el capabalities y completa la propiedad onCapAllowedObservedProperty.
  * @method getOnCapAllowedObservedProperty
  * @async
  * @return {SOS.Promise} Promesa
  */
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedObservedProperty = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            if (_ent.onCapAllowedObservedProperty.length == 0)
                _ent.onCapAllowedObservedProperty = _ent.sos.capsFormatter.getOperationParameterValues('GetFeatureOfInterest', 'observedProperty');

            resolve(_ent.onCapAllowedObservedProperty);
        });
    });
};

/**
  * Solicita los identificadores de los featureOfInterest disponibles en el servicio desde el capabalities y completa la propiedad onCapAllowedIDFeaturesOfInterest.
  * @method getOnCapAllowedIDFeaturesOfInterest
  * @async
  * @return {SOS.Promise} Promesa
  */
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedIDFeaturesOfInterest = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            if (_ent.onCapAllowedIDFeaturesOfInterest.length == 0)
                _ent.onCapAllowedIDFeaturesOfInterest = _ent.sos.capsFormatter.getOperationParameterValues('GetFeatureOfInterest', 'featureOfInterest');

            resolve(_ent.onCapAllowedIDFeaturesOfInterest);
        });
    });
};

/**
  * Solicita los el bbox máximo disponible para aplicar filtro espacial desde el capabalities y completa la propiedad onCapAllowedRangeSpatialFilter.
  * @method getOnCapAllowedRangeSpatialFilter
  * @async
  * @return {SOS.Promise} Promesa
  */
SOS.entity.FeatureOfInterest.prototype.getOnCapAllowedRangeSpatialFilter = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            if (_ent.onCapAllowedRangeSpatialFilter == null) {
                var allowedValues = _ent.sos.capsFormatter.getOperationParameterValues('GetFeatureOfInterest', 'spatialFilter');
                if (allowedValues instanceof Object)
                    _ent.onCapAllowedRangeSpatialFilter = {
                        min: allowedValues.min && allowedValues.min.split(' ') || allowedValues.range && allowedValues.range.minimumValue.split(' '),
                        max: allowedValues.max && allowedValues.max.split(' ') || allowedValues.range && allowedValues.range.maximumValue.split(' ')
                    };
            }

            resolve(_ent.onCapAllowedRangeSpatialFilter);
        });
    });
};

/**
  * Solicita los featureOfInterest disponibles en el servicio desde el capabalities, creando un FeatureOfInterestRecord para cada uno de ellos, completa la propiedad onCapAllowedFOIs.
  * @method getAvailableFeaturesOfInterest
  * @async
  * @return {SOS.Promise} Promesa
  */
SOS.entity.FeatureOfInterest.prototype.getAvailableFeaturesOfInterest = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            var _parse = function (response) {
                if (response && response.responseText)
                    _ent.get.read(response.responseText);

                if (_ent.data && _ent.data.GetFeatureOfInterestResponse && _ent.data.GetFeatureOfInterestResponse.featureMember) {
                    var features = _ent.data.GetFeatureOfInterestResponse.featureMember;

                    for (var i = 0; i < features.length; i++) {
                        _ent.onCapAllowedFOIs.push(_ent._bindFOI(features[i].sF_SpatialSamplingFeature || features[i]));
                    }
                }

                _ent.sos.events.triggerEvent(SOS.Const.Events.SOS_FEATURES_OF_INTEREST_AVAILABLE, { item: _ent.onCapAllowedFOIs });
            };

            if (_ent.onCapAllowedIDFeaturesOfInterest.length == 0)
                _ent.onCapAllowedIDFeaturesOfInterest = _ent.sos.capsFormatter.getOperationParameterValues('GetFeatureOfInterest', 'featureOfInterest');

            if (_ent.onCapAllowedIDFeaturesOfInterest.length > 0 && _ent.onCapAllowedFOIs.length == 0) {
                _ent.getFeatureOfInterest({
                    featuresOfInterest: _ent.onCapAllowedIDFeaturesOfInterest
                }, _parse);
            }
        });
    });
};

SOS.entity.FeatureOfInterest.prototype.bindSourceXML = function () {
    var _ent = this;

    var xmlSource = new SOS.source.XML({
        required: []
    });

    xmlSource.write = function (params) {
        var _src = this;

        _src.__proto__.write(params, ['procedure', 'observedProperty', 'featureOfInterest', 'spatial']);

        if (params.spatial) {
            if (!params.spatial.srs)
                throw Error(SOS.Const.ErrorText.XML.WRONG_PARAM);

            if (!params.spatial.lowerCorner || (params.spatial.lowerCorner && !(params.spatial.lowerCorner instanceof Array)))
                throw Error(SOS.Const.ErrorText.XML.WRONG_PARAM);

            if (!params.spatial.upperCorner || (params.spatial.upperCorner && !(params.spatial.upperCorner instanceof Array)))
                throw Error(SOS.Const.ErrorText.XML.WRONG_PARAM);
        }

        var filterNodes = {
            procedure: '<sos:procedure>filter</sos:procedure> ',
            observedProperty: '<sos:observedProperty>filter</sos:observedProperty> ',
            featureOfInterest: '<sos:featureOfInterest>filter</sos:featureOfInterest> '
        };

        var getFilterNodes = function (filterNodeType, filters) {
            for (var i = 0; i < filters.length; i++)
                getRequest += filterNodes[filterNodeType].replace(/filter/g, filters[i]);
        };

        var getRequest = '<?xml version="1.0" encoding="UTF-8"?> ' +
            '<sos:GetFeatureOfInterest ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:sos="http://www.opengis.net/sos/2.0" ' +
                'xmlns:fes="http://www.opengis.net/fes/2.0" ' +
                'xmlns:gml="http://www.opengis.net/gml/3.2" ' +
                'xmlns:swe="http://www.opengis.net/swe/2.0" ' +
                'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                'xmlns:swes="http://www.opengis.net/swes/2.0" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd"> ';

        if (params.procedure)
            getFilterNodes('procedure', params.procedure instanceof Array ? params.procedure : [params.procedure]);

        if (params.observedProperty)
            getFilterNodes('observedProperty', params.observedProperty instanceof Array ? params.observedProperty : [params.observedProperty]);

        if (params.featureOfInterest)
            getFilterNodes('featureOfInterest', params.featureOfInterest instanceof Array ? params.featureOfInterest : [params.featureOfInterest]);

        if (params.spatial && params.spatial.srs && params.spatial.lowerCorner && params.spatial.lowerCorner.length > 1 && params.spatial.upperCorner && params.spatial.upperCorner.length > 1) {
            getRequest += '<sos:spatialFilter> ' +
                                        '<fes:BBOX> ' +
                                            '<fes:ValueReference>' + _ent.valueReference + '</fes:ValueReference> ' +
                                            '<gml:Envelope srsName="' + (params.spatial.srs.toString().indexOf('/') < 0 ? 'http://www.opengis.net/def/crs/EPSG/0/' + params.spatial.srs.toString() + '"' : params.spatial.srs) + '> ' +
                                                '<gml:lowerCorner>' + params.spatial.lowerCorner[0] + ' ' + params.spatial.lowerCorner[1] + '</gml:lowerCorner> ' +
                                                '<gml:upperCorner>' + params.spatial.upperCorner[0] + ' ' + params.spatial.upperCorner[1] + '</gml:upperCorner> ' +
                                            '</gml:Envelope> ' +
                                        '</fes:BBOX> ' +
                                    '</sos:spatialFilter> ';
        }

        getRequest += '</sos:GetFeatureOfInterest> ';

        return getRequest;
    };

    return xmlSource;
};

SOS.entity.FeatureOfInterest.prototype.bindSourceJSON = function (params) {
    var jsonSource = new SOS.source.JSON();

    jsonSource.write = function (params) {
        var _src = this;

        var data = {
            "request": "GetFeatureOfInterest",
            "service": "SOS",
            "version": "2.0.0"
        };

        if (params.featureOfInterest)
            data["featureOfInterest"] = params.featureOfInterest instanceof Array ? params.featureOfInterest : [params.featureOfInterest];

        if (params.observedProperty)
            data["observedProperty"] = params.observedProperty instanceof Array ? params.observedProperty : [params.observedProperty];

        if (params.procedure)
            data["procedure"] = params.procedure instanceof Array ? params.procedure : [params.procedure];

        if (params.spatial && params.spatial.geomType && params.spatial.coordinates)
            data["spatialFilter"] = {
                "bbox": {
                    "ref": "om:featureOfInterest/sams:SF_SpatialSamplingFeature/sams:shape",
                    "value": {
                        "type": params.spatial.geomType,
                        "coordinates": params.spatial.coordinates
                    }
                }
            };

        return _src.__proto__.write(data);
    };

    return jsonSource;
};
/**
 * Contiene el resultado de la petición GetFeatureOfInterest con los fois resultantes
 * @property allowedFOIs
 * @type array
 * @default []
 */
/**
 * Contiene los featuresOfInterest de tipo FeatureOfInterestRecord extraídos del capabilities, se completa mediante la llamada a getAvailableFeaturesOfInterest 
 * @property onCapAllowedFOIs
 * @type array
 * @default []
 */
/**
 * Contiene los ids de procedimientos aceptados como parámetro en la solicitud GetFeatureOfInterest extraídos del capabilities, se completa mediante la llamada a getOnCapAllowedProcedures 
 * @property onCapAllowedProcedures
 * @type array
 * @default []
 */
/**
 * Contiene las propiedades observadas aceptadas como parámetro en la solicitud GetFeatureOfInterest extraídos del capabilities, se completa mediante la llamada a getOnCapAllowedObservedProperty 
 * @property onCapAllowedObservedProperty
 * @type array
 * @default []
 */
/**
 * Contiene las propiedades observadas aceptados como parámetro en la solicitud GetFeatureOfInterest extraídos del capabilities, se completa mediante la llamada a getOnCapAllowedIDFeaturesOfInterest 
 * @property onCapAllowedIDFeaturesOfInterest
 * @type array
 * @default []
 */
/**
 * Contiene el nombre del atributo que hace referencia a la geometría 
 * @property valueReference
 * @type string
 * @default sams:shape
 */

