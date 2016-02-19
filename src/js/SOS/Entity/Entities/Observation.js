
/**
 * Instancia un objeto Observation. 
 *
 * @class Observation
 * @extends SOS.Entity
 * @param {object} { url: urlServicio, valueReference: the_geom } 
 * - Requerido: URL del servicio al cual se conectará
 * - Opcional: ValueReference: Nombre del atributo que hace referencia a la geometría, por defecto om:featureOfInterest/sams:SF_SpatialSamplingFeature/sams:shape
 * @throws {Error} Lanza error cuando no se construye el objeto mediante new.
 * @throws {Error} Lanza error cuando no se indica URL al servicio o una instancia de SOS.
 */
SOS.entity.Observation = function (options) {
    var _ent = this;

    _ent.entityName = 'Observation';
    _ent.capsOperation = 'GetObservation';

    SOS.Entity.apply(_ent, arguments);

    _ent.filters = {};
    _ent.sortByDateTime = options.sortByDateTime || true;
    _ent.valueReference = options.valueReference || 'om:featureOfInterest/sams:SF_SpatialSamplingFeature/sams:shape';

    _ent.sos.registerUserCallback({
        event: SOS.Const.Events.SOS_CAPABILITIES_AVAILABLE, callback: function () {
            _ent._bindFiltersByCapabilities();
        }
    });
};
SOS.inherit(SOS.entity.Observation, SOS.Entity);

// Completa en base al capabilities los tipos de filtro temporal disponibles
SOS.entity.Observation.prototype._bindFiltersByCapabilities = function () {
    var _ent = this;

    if (_ent.sos.capsFormatter.data && _ent.sos.capsFormatter.data.filterCapabilities) {

        var temporalCaps = _ent.sos.capsFormatter.data.filterCapabilities.filter_Capabilities && _ent.sos.capsFormatter.data.filterCapabilities.filter_Capabilities.temporal_Capabilities || _ent.sos.capsFormatter.data.filterCapabilities.temporal;
        var operands = null;

        if (temporalCaps)
            operands = temporalCaps.operands;
        else if (temporalCaps.temporal_Capabilities)
            operands = temporalCaps.temporalOperands && temporalCaps.temporal_Capabilities.temporalOperands;

        // timeInstant / timePeriod
        _ent.sos.obsFormatter.filters['temporalOperands'] = {};
        // get timeInstant / timePeriod
        if (operands instanceof Array) {
            for (var i = 0; i < operands.length; i++) {
                var operand = operands[i].$ref.split('/').pop().replace('#', '');
                _ent.sos.obsFormatter.filters['temporalOperands'][operand] = operand;
            }
        } else if (operands instanceof Object && operands.temporalOperand) {
            var ope = temporalCaps.temporalOperands.temporalOperand;
            if (ope instanceof Array) {
                for (var i = 0; i < ope.length; i++) {
                    var operand = ope[i]['@name'].split(':').pop();
                    _ent.sos.obsFormatter.filters['temporalOperands'][operand] = operand;
                }
            }
        }

        // equals, during...
        _ent.sos.obsFormatter.filters['temporalOperators'] = {};

        // get equals, during...
        var ope = temporalCaps.temporalOperators && temporalCaps.temporalOperators.temporalOperator || temporalCaps.operators;
        if (ope instanceof Array) {
            for (var i = 0; i < ope.length; i++) {
                var operator = ope[i]['@name'];
                _ent.sos.obsFormatter.filters['temporalOperators'][operator] = operator;
            }
        } else if (ope instanceof Object && SOS.Utils.isValidObject(ope)) {
            for (var opr in ope) {
                _ent.sos.obsFormatter.filters['temporalOperators'][opr] = opr;
            }
        }
    }
};

SOS.entity.Observation.prototype.getDataAvailable = function () {
    //'GetDataAvailability'
};

/**
  * Solicita las observaciones que cumplan con los filtros indicados, si no se indican filtros obtendrá todos las observaciones disponibles. 
  *
  * Al finalizar lanza el evento SOS_OBSERVATION_AVAILABLE, si la solicitud se lanza desde un offering lanza el evento SOS_OFFERING_OBSERVATION_AVAILABLE
  * @method getObservation
  * @async  
  * @param {object} [params] Objeto de opciones de filtrado { offering: [offs], featureOfInterest: [idsFoi], observedProperty: [propiedades], procedure: [procedimientos], 
  * spatial: { srs:4326, lowerCorner: [610708, 4742220], upperCorner:[610722, 4742232] }, 
  * temporal: { operator: 'After', on: 'resultTime' | 'phenomenonTime', operand: 'TimeInstant', timeEvent: new Date().getDate() - 1 } }. - Todos son opcionales
  * @param {function} [callback] Función que se ejecutará al finalizar la petición
  * @param {string} event [Evento] personalizado que se lanzará al finalizar la petición
  * @param {SOS:entity.Offering} [off] Instacia de SOS.Offering a la cual se le completará la propiedad {observationData} con las observaciones resultantes. 
  * @return {SOS.Promise} Promesa
  * @example       
        var obs = new SOS.entity.Observation({ url: 'http://sos_service/service' });        
        obs.getObservation({ procedure: 'http://sos_service/srr/an1/qa01' }).then(function (obs) {
            obs = obs || [];            
            console.log('Observaciones por procedimiento: ' + 'http://sos_service/srr/an1/qa01');
            console.log('Número de observaciones: ' + obs.length);            
        });        
  */
SOS.entity.Observation.prototype.getObservation = function (params, callback, event, off) {
    var _ent = this;

    if (event instanceof SOS.Offering) {
        off = event;
        event = null;
    }

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {
            _ent.getPostUrl().then(function (url) {
                if (url && url.length > 0) {

                    var _parseObservation = function (callback) {
                        if (_ent.data) {
                            if (_ent.data.GetObservationResponse && _ent.data.GetObservationResponse.observationData)
                                _ent.data = _ent.sos.SOSObservations = _ent.data.GetObservationResponse.observationData;

                            if (_ent.sortByDateTime && _ent.data instanceof Array) {
                                // ordenamos los resultados por fecha
                                _ent.data = _ent.data.sort(_ent._sortObservations);
                            } else if (_ent.data.oM_Observation) _ent.data = _ent.sos.SOSObservations = _ent.data.oM_Observation;

                            var result = [];
                            if (_ent.data instanceof Array) {
                                for (var i = 0; i < _ent.data.length; i++)
                                    result.push(new SOS.entity.ObservationRecord(_ent.data[i]));
                            }
                            else result.push(new SOS.entity.ObservationRecord(_ent.data));

                            if (result)
                                _ent.data = _ent.sos.SOSObservations = result;

                            // si la consulta se ha solicitado desde un offering se completa el atributo observationData del offering y se lanza el correspondiente evento
                            if (off) {
                                off.observationData = result;
                                _ent.sos.events.triggerEvent(SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE);
                            } else _ent.sos.events.triggerEvent(event || SOS.Const.Events.SOS_OBSERVATION_AVAILABLE);

                            resolve(result);
                        }

                        if (callback)
                            callback(_ent.data);
                    };

                    SOS.Request.POST({
                        url: url,
                        async: _ent.sos.config.async,
                        failure: function (error) {
                            console.log(SOS.Const.ErrorText.SOS_OBSERVATION_ERROR);
                            console.log(error);
                            reject(SOS.Const.ErrorText.SOS_OBSERVATION_ERROR + ' :' + error);
                        },
                        success: function (response) {
                            if (response && response.responseText)
                                _ent.get.read(response.responseText);

                            _parseObservation(callback);
                        },
                        data: _ent.get.write(params)
                    });
                } else resolve([]);
            });
        });
    });
};

/**
  * Solicita la primera observación disponible que cumpla con los filtros indicados. 
  *
  * Al finalizar lanza el evento SOS_OBSERVATION_AVAILABLE, si la solicitud se lanza desde un offering lanza el evento SOS_OFFERING_OBSERVATION_AVAILABLE
  * @method getObservationFirst
  * @async  
  * @param {object} [params] Objeto de opciones de filtrado { offering: [offs], featureOfInterest: [idsFoi], observedProperty: [propiedades], procedure: [procedimientos], 
  * spatial: { srs:4326, lowerCorner: [610708, 4742220], upperCorner:[610722, 4742232] } }  - Todos son opcionales.  
  * @param {function} [callback] Función que se ejecutará al finalizar la petición - Opcional.   
  * @param {SOS:entity.Offering} [off] Instacia de SOS.Offering a la cual se le completará la propiedad {observationData} con las observaciones resultantes  - Opcional. 
  * @return {SOS.Promise} Promesa
  */
SOS.entity.Observation.prototype.getObservationFirst = function (params, callback, entScope) {
    var _ent = this;

    params = params || {};
    params.temporal = {
        operator: 'TEquals',
        on: 'resultTime', // phenomenonTime
        operand: 'TimeInstant',
        timeEvent: 'getFirst'
    };

    return _ent.getObservation(params, callback, SOS.Const.Events.SOS_FIRST_OBSERVATION_AVAILABLE, entScope);
};

/**
  * Solicita la última observación disponible que cumpla con los filtros indicados. 
  * Completa la propiedad SOSObservations de la instancia del objeto SOS de la propiedad sos de la entidad con las observaciones resultantes de la petición.  
  * Al finalizar lanza el evento SOS_OBSERVATION_AVAILABLE, si la solicitud se lanza desde un offering lanza el evento SOS_OFFERING_OBSERVATION_AVAILABLE
  * @method getObservationLatest
  * @async  
  * @param {object} [params] Objeto de opciones de filtrado { offering: [offs], featureOfInterest: [idsFoi], observedProperty: [propiedades], procedure: [procedimientos], 
  * spatial: { srs:4326, lowerCorner: [610708, 4742220], upperCorner:[610722, 4742232] } }  - Todos son opcionales.  
  * @param {function} [callback] Función que se ejecutará al finalizar la petición - Opcional.   
  * @param {SOS:entity.Offering} [off] Instacia de SOS.Offering a la cual se le completará la propiedad {observationData} con las observaciones resultantes  - Opcional. 
  * @return {SOS.Promise} Promesa  
  */
SOS.entity.Observation.prototype.getObservationLatest = function (params, callback, entScope) {
    var _ent = this;

    params = params || {};
    params.temporal = {
        operator: 'TEquals',
        on: 'resultTime', // phenomenonTime
        operand: 'TimeInstant',
        timeEvent: 'latest'
    };

    return _ent.getObservation(params, callback, SOS.Const.Events.SOS_LATEST_OBSERVATION_AVAILABLE, entScope);
};

/**
  * Solicita las observaciones disponibles que cumpla con los filtros indicados entre fecha desde y fecha hasta. 
  * Completa la propiedad SOSObservations de la instancia del objeto SOS de la propiedad sos de la entidad con las observaciones resultantes de la petición.  
  * Al finalizar lanza el evento SOS_OBSERVATION_AVAILABLE, si la solicitud se lanza desde un offering lanza el evento SOS_OFFERING_OBSERVATION_AVAILABLE
  * @method getObservationFromTo
  * @async  
  * @param {object} [params] Objeto de opciones de filtrado { offering: [offs], featureOfInterest: [idsFoi], observedProperty: [propiedades], procedure: [procedimientos], 
  * spatial: { srs:4326, lowerCorner: [610708, 4742220], upperCorner:[610722, 4742232] } }  - Todos son opcionales.  
  * @param {function} [callback] Función que se ejecutará al finalizar la petición.
  * @param {SOS:entity.Offering} [off] Instacia de SOS.Offering a la cual se le completará la propiedad {observationData} con las observaciones resultantes.
  * @return {SOS.Promise} Promesa
  * @example
        var obs = new SOS.entity.Observation({ url: 'http://sos_service/service' });
        obs.getObservationFromTo({
                featureOfInterest: "http://sos_service/olk/ad1", 
                procedure: "http://sos_service/olk/ad1/cl01", 
                observedproperty: "http://sweet.jpl.nasa.gov/2.3/matrElementalMolecule.owl#Cl2", 
                temporal: {
                    start: new Date(2015, 6, 6, 10, 1, 0), 
                    end: new Date(2015, 6, 6, 10, 5, 0)
                }
            }, function (data) {
                data = data || [];
                console.log(data.length + ' elementos encontrados');
            });
  */

SOS.entity.Observation.prototype.getObservationFromTo = function (params, callback, entScope) {
    var _ent = this;

    params = params || {};

    if (params.temporal) {
        SOS.Utils.extend(params.temporal, {
            operator: 'During',
            on: 'resultTime', // phenomenonTime
            operand: 'TimePeriod'
        });
    }

    return _ent.getObservation(params, callback, SOS.Const.Events.SOS_OBSERVATION_AVAILABLE, entScope);
};

// Get the FOI object from observation data
SOS.entity.Observation.prototype.getFeatureOfInterest = function (opts) {
    var opts = opts || { foisIndex: 0, featuresIndex: 0 };

    return _ent.data.fois[opts.foisIndex].features[opts.featuresIndex];
};

SOS.entity.Observation.prototype._sortObservations = function (a, b) {
    var ret = 0;

    var aTimeInstant = a.oM_Observation.resultTime.timeInstant || a.oM_Observation.phenomenonTime.timeInstant;
    var bTimeInstant = b.oM_Observation.resultTime.timeInstant || b.oM_Observation.phenomenonTime.timeInstant;

    if (aTimeInstant.timePosition < bTimeInstant.timePosition) {
        ret = -1;
    } else if (aTimeInstant.timePosition > bTimeInstant.timePosition) {
        ret = 1;
    }

    return ret;
};

SOS.entity.Observation.prototype.bindSourceXML = function () {
    var _ent = this;

    var xmlSource = new SOS.source.XML({
        required: []
    });

    xmlSource.write = function (params) {
        var _src = this;

        _src.__proto__.write(params, ['offering', 'procedure', 'observedProperty', 'featureOfInterest', 'temporal', 'spatial', 'responseFormat']);

        var filterNodes = {
            offering: '<sos:offering>filter</sos:offering> ',
            procedure: '<sos:procedure>filter</sos:procedure> ',
            observedProperty: '<sos:observedProperty>filter</sos:observedProperty> ',
            featureOfInterest: '<sos:featureOfInterest>filter</sos:featureOfInterest> '
        };

        var getFilterNodes = function (filterNodeType, filters) {
            for (var i = 0; i < filters.length; i++)
                getRequest += filterNodes[filterNodeType].replace(/filter/g, filters[i]);
        };

        var getRequest = '<?xml version="1.0" encoding="UTF-8"?> ' +
            '<sos:GetObservation ' +
                'xmlns:sos="http://www.opengis.net/sos/2.0" ' +
                'xmlns:fes="http://www.opengis.net/fes/2.0" ' +
                'xmlns:gml="http://www.opengis.net/gml/3.2" ' +
                'xmlns:swe="http://www.opengis.net/swe/2.0" ' +
                'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                'xmlns:swes="http://www.opengis.net/swes/2.0" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd"> ';

        if (params.procedure)
            getFilterNodes('procedure', params.procedure instanceof Array ? params.procedure : [params.procedure]);

        if (params.offering)
            getFilterNodes('offering', params.offering instanceof Array ? params.offering : [params.offering]);

        if (params.observedProperty)
            getFilterNodes('observedProperty', params.observedProperty instanceof Array ? params.observedProperty : [params.observedProperty]);

        if (params.temporal && params.temporal.operator && params.temporal.on && ((params.temporal.start && params.temporal.end) || params.temporal.timeEvent)) {

            var formatRequestTimeString = function (D) {
                var newDate = new Date(D.getTime() + D.getTimezoneOffset() * 60 * 1000);

                var offset = D.getTimezoneOffset() / 60;
                var hours = D.getHours();

                newDate.setHours(hours - offset);
                
                return newDate.toISOString().replace(/\.\d+Z$/, "Z");
            };

            if (params.temporal.start && params.temporal.end) {
                var timeString = SOS.Utils.isoToTimeInterval(params.temporal.start, params.temporal.end);
                timeString = SOS.Utils.adjustTimeInterval(timeString, -1, 1);
            }

            getRequest += '<sos:temporalFilter> ' +
                            '<fes:' + params.temporal.operator + '> ' +
                                '<fes:ValueReference>' + params.temporal.on + '</fes:ValueReference> ' +
                                '<gml:' + params.temporal.operand + ' gml:id="tp_1"> ';
            switch (params.temporal.operand) {
                case 'TimePeriod': {
                    getRequest += '<gml:beginPosition>' + (timeString && formatRequestTimeString(timeString.start) || '') + '</gml:beginPosition> ';
                    getRequest += '<gml:endPosition>' + (timeString && formatRequestTimeString(timeString.end) || '') + '</gml:endPosition> ';
                    break;
                }
                case 'TimeInstant': {
                    if (params.temporal.timeEvent instanceof Date) {
                        var timeString = SOS.Utils.isoToTimeInterval(params.temporal.timeEvent);
                        getRequest += '<gml:timePosition>' + (timeString && formatRequestTimeString(params.temporal.timeEvent) || '') + '</gml:timePosition> ';
                    } else getRequest += '<gml:timePosition>' + params.temporal.timeEvent + '</gml:timePosition> ';
                    break;
                }
            }
            getRequest += '</gml:' + params.temporal.operand + '> ' +
                      '</fes:' + params.temporal.operator + '> ' +
                    '</sos:temporalFilter>';
        }

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

        if (params.responseFormat)
            getRequest += '<sos:responseFormat>' + params.responseFormat + '</sos:responseFormat>';


        getRequest += '</sos:GetObservation> ';

        return getRequest;
    };

    return xmlSource;
};

SOS.entity.Observation.prototype.bindSourceJSON = function () {
    var _ent = this;

    var jsonSource = new SOS.source.JSON();

    jsonSource.write = function () {
        var _src = this;

        var data = {
            "request": "GetObservation",
            "service": "SOS",
            "version": "2.0.0"
        };

        if (params.procedures)
            data["procedure"] = params.procedures instanceof Array ? params.procedures : [params.procedures];

        if (params.offering)
            data["offering"] = params.offering instanceof Array ? params.offering : [params.offering];

        if (params.observedProperties)
            data["observedProperty"] = params.observedProperties instanceof Array ? params.observedProperties : [params.observedProperties];

        if (params.featuresOfInterest)
            data["featureOfInterest"] = params.featuresOfInterest instanceof Array ? params.featuresOfInterest : [params.featuresOfInterest];

        if (params.spatial && params.spatial.geomType && params.spatial.coordinates)
            data["spatialFilter"] = {
                "bbox": {
                    "ref": _ent._spatialShapeProperty,
                    "value": {
                        "type": params.spatial.geomType,
                        "coordinates": params.spatial.coordinates
                    }
                }
            };

        if (params.temporal && params.temporal.operator && params.temporal.on && ((params.temporal.start && params.temporal.end) || params.temporal.timeEvent)) {
            if (params.temporal.start && params.temporal.end) {
                var timeString = SOS.Utils.isoToTimeInterval(params.temporalFilter.start, params.temporalFilter.end);
                timeString = SOS.Utils.adjustTimeInterval(timeString, -1, 1);

                var formatRequestTimeString = function (D) {
                    return D.toISOString().replace(/\.\d+Z$/, "Z");
                };
            }

            data["temporalFilter"] = {};
            data["temporalFilter"][params.temporal.operator] = {
                "ref": arams.temporalFilter.on
            };

            if (params.temporal.start && params.temporal.end && timeString)
                data["temporalFilter"][params.temporal.operator]['value'] = [
                          formatRequestTimeString(timeString.start),
                          formatRequestTimeString(timeString.end)
                ];
            else
                data["temporalFilter"][params.temporal.operator]['value'] = params.temporal.timeEvent;
        }

        return _src.__proto__.write(data);
    };
};
/**
 * Contiene el nombre del atributo que hace referencia a la geometría 
 * @property valueReference
 * @type string
 * @default om:featureOfInterest/sams:SF_SpatialSamplingFeature/sams:shape
 */
/**
 * Contiene los filtros temporales y espaciales disponibles extraído del capabilities 
 * @property filters
 * @type {object} 
 * @default {}
 */
/**
 * Ordenar las observaciones resultantes por fecha y hora 
 * @property sortByDateTime
 * @type {boolean} 
 * @default {true}
 */

