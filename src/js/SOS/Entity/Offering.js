/**
 * Instancia un objeto Offering.
 *
 * @class Offering 
 * @param {object} [options] Objeto de configuración
 */
SOS.Offering = function (options) {
    var _off = this;

    _off.entityName = 'Offering';

    _off.initialize(options);
};


/**
 * Contiene las observaciones resultantes de la última petición GetObservation asociadas a un offering
 * @property observationData
 * @type object
 */

/**
 * Instancia del objeto SOS al cual estará conectado el objeto instanciado.
 * @property sos
 * @type SOS
 */

/**
 * Indentificador del offering.
 * @property identifier
 * @type string
 */

/**
 * Nombre del offering.
 * @property name
 * @type string
 */

/**
 * FeatureOfInterest relacionados con el offering.
 * @property featureOfInterestIds
 * @type array
 */

/**
 * Tipos de featureOfInterest relacionados con el offering.
 * @property featureOfInterestType
 * @type array
 */

/**
 * Propiedades observadas por el offering.
 * @property observedProperties
 * @type array
 */

/**
 * Área observada por el offering.
 * @property observedArea
 * @type object crs, lowerLeft, upperRight
 */

/**
 * Constructor for a SOS.Offering object
 *
 * @constructor
 */
SOS.Offering.prototype.initialize = function (options) {
    var _off = this;

    _off.sos = options.sos || sos;

    _off.observationData = '';

    _off.identifier = options.identifier || options.id || '';
    _off.name = options.name || '';

    _off.featureOfInterestIds = options.featureOfInterestIds instanceof Array && options.featureOfInterestIds || options.featureOfInterestIds && [options.featureOfInterestIds] || [];
    _off.featureOfInterestType = options.featureOfInterestType instanceof Array && options.featureOfInterestType || options.featureOfInterestType && [options.featureOfInterestType] || [];
    _off.observedProperties = options.observedProperties instanceof Array && options.observedProperties || options.observedProperties && [options.observedProperties] || [];
    _off.observationType = options.observationType instanceof Array && options.observationType || options.observationType && [options.observationType] || [];
    if (options.observedArea && options.observedArea.crs && options.observedArea.lowerCorner && options.observedArea.upperCorner)
        _off.observedArea = options.observedArea && options.observedArea.crs + ' - ' + options.observedArea.lowerCorner + options.observedArea.upperCorner
    else _off.observedArea = {
        crs: '',
        lowerLeft: [],
        upperRight: []
    };

    _off.phenomenonTime = options.phenomenonTime instanceof Array && options.phenomenonTime || options.phenomenonTime && [options.phenomenonTime] || [];
    _off.procedures = options.procedures instanceof Array && options.procedures || [options.procedures] || [];
    _off.procedureDescriptionFormat = options.procedureDescriptionFormat instanceof Array && options.procedureDescriptionFormat || options.procedureDescriptionFormat && [options.procedureDescriptionFormat] || [];
    _off.responseFormat = options.responseFormat instanceof Array && options.responseFormat || options.responseFormat && [options.responseFormat] || [];
    _off.resultTime = options.resultTime instanceof Array && options.resultTime || options.resultTime && [options.resultTime] || [];

    //SOS.Utils.extend(this, options);
};

/**
 * Destructor for a SOS.Offering object
 * 
 * @destructor
 */
SOS.Offering.prototype.destroy = function () { };


/**
  * Obtiene los identificadores de los featuresOfInterest relacionados.
  * @method getFeatureOfInterestIds
  * @return {array}
  */
SOS.Offering.prototype.getFeatureOfInterestIds = function () {
    var _off = this;

    return SOS.Utils.getUniqueList(_off.featureOfInterestIds);
};

/**
  * Obtiene los identificadores de los procedimientos.
  * @method getProcedureIds
  * @return {array}
  */
SOS.Offering.prototype.getProcedureIds = function () {
    var _off = this;

    return SOS.Utils.getUniqueList(_off.procedures);
};

/**
  * Obtiene los identificadores de las propiedades.
  * @method getObservedPropertyIds
  * @return {array}
  */
SOS.Offering.prototype.getObservedPropertyIds = function () {
    var _off = this;

    return SOS.Utils.getUniqueList(_off.observedProperties);
};

/**
  * Obtiene los nombres de las propiedades.
  * @method getObservedPropertyNames
  * @return {array}
  */
SOS.Offering.prototype.getObservedPropertyNames = function () {
    var _off = this;

    return SOS.Utils.fqnToName(SOS.Utils.getUniqueList(_off.observedProperties));
};

/**
  * Filtra las propiedades de un offering por las indicadas en la lista, 
  * este filtro de propiedades se aplicará al solicitar observaciones del offering.
  * @method filterObservedProperties
  * @param {array} lista de propiedades
  */
SOS.Offering.prototype.filterObservedProperties = function (list) {
    var _off = this;

    if (!SOS.Utils.isArray(list)) {
        list = [list];
    }

    var masterList = (SOS.Utils.isValidObject(_off.observedPropertiesOriginal) ? _off.observedPropertiesOriginal : _off.observedProperties);
    var fqns = SOS.Utils.lookupFqnFromName(list, masterList);

    if (!SOS.Utils.isValidObject(_off.observedPropertiesOriginal)) {
        this.observedPropertiesOriginal = _off.observedProperties;
    }
    this.observedProperties = fqns;
};

/**
  * Elimina el posible filtro de propiedades observadas aplicado.
  * @method unfilterObservedProperties  
  */
SOS.Offering.prototype.unfilterObservedProperties = function () {
    var _off = this;

    if (SOS.Utils.isValidObject(_off.observedPropertiesOriginal)) {
        _off.observedProperties = _off.observedPropertiesOriginal;
        delete _off.observedPropertiesOriginal;
    }
};

/**
  * Solicita la última observación disponible para el offering, aplica el filtro de propiedades establecido mediante el método [filterObservedProperties].
  * @param {function} callback
  * @method getLatestObservations  
  */
SOS.Offering.prototype.getLatestObservations = function (callback) {
    var _off = this;

    // Optionally the caller can register a callback for the obs request
    if (arguments.length > 0) {
        _off.sos.registerUserCallback({ event: SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, callback: callback });
    }

    var params = {
        offering: _off.identifier || _off.id,
        observedProperties: _off.observedProperties
    };

    if (_off.sos.foiId)
        params.foi = { featuresOfInterest: _off.sos.foiId };

    _off.sos.obsFormatter.getObservationLatest(params, callback, _off);
};

/**
  * Solicita las observaciones disponibles para el offering con filtro temporal de fecha desde - fechahasta.
  * @param {datetime} start
  * @param {datetime} end
  * @param {function} callback
  * @method getLatestObservations  
  */
SOS.Offering.prototype.getObservations = function (start, end, callback) {
    var _off = this;

    // Optionally the caller can register a callback for the obs request
    if (arguments.length > 2) {
        _off.sos.registerUserCallback({ event: SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, callback: callback });
    }
    
    var params = {
        offering: _off.id || _off.identifier,
        observedProperties: _off.observedProperties,
        temporal: { start: start, end: end, operator: 'During', on: 'phenomenonTime', operand: 'TimePeriod' }
    };

    if (_off.sos.foiId)
        params.foi = { featuresOfInterest: _off.sos.foiId };

    _off.sos.obsFormatter.getObservationByScope(params, callback, SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, _off);
};

/**
 * Get a count of the number of records contained in the internal
 * observations object
 */
SOS.Offering.prototype.getCountOfObservations = function () {
    var _off = this;
    var n = 0;

    if (_off.observationData) {
        if (SOS.Utils.isValidObject(_off.observationData)) {
            if (_off.observationData instanceof Array)
                n = _off.observationData.length;
            else n = 1;
        }
    }

    return n;
};

/**
 * Get the observation for the given index from the internal
 * observations object
 */
SOS.Offering.prototype.getObservationRecord = function (i) {
    var _off = this;
    var record = {};

    if (_off.observationData)
        if (_off.observationData instanceof Array)
            record = _off.observationData[i];
        else record = _off.observationData;

    return record;
};

/**
 * Get the observation for the given index from the internal
 * observations object, as long as it matches the given filter rules
 */
SOS.Offering.prototype.getFilteredObservationRecord = function (i, filter) {
    var _off = this;
    var record;

    if (_off.observationData) {
        var r = _off.observationData[i];

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
 * Get results for observed properties of this offering between the
 * given start and end datetimes
 */
SOS.Offering.prototype.getResults = function (start, end, callback) {
    var _off = this;

    // Optionally the caller can register a callback for the obs request
    if (arguments.length > 2) {
        _off.sos.registerUserCallback({ event: SOS.Const.Events.SOS_OFFERING_RESULT_AVAILABLE, callback: callback });
    }

    var params = {
        offering: _off.id || _off.identifier,
        observedProperties: _off.observedProperties
    };

    _off.sos.obsFormatter.getObservationByScope(params, callback, SOS.Const.Events.SOS_OFFERING_OBSERVATION_AVAILABLE, _off);
};

