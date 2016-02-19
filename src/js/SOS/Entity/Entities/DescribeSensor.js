
/**
 * Instancia un objeto DescribeSensor. 
 *
 * @class DescribeSensor
 * @extends SOS.Entity
 * @param {object} { url: urlServicio, responseFormatType: 'tipoFormato' } 
 * - Requerido: URL del servicio al cual se conectará 
 * - Opcional: [responseFormatType] tipo formato de respuesta por defecto.
 * @throws {Error} Lanza error cuando no se construye el objeto mediante new.
 * @throws {Error} Lanza error cuando no se indica URL al servicio o una instancia de SOS.
 * @example
        var describe = new SOS.entity.DescribeSensor({ url: 'http://sos_service/service'});         
 */
SOS.entity.DescribeSensor = function (options) {
    var _ent = this;

    _ent.entityName = 'DescribeSensor';
    _ent.capsOperation = 'DescribeSensor';

    SOS.Entity.apply(_ent, arguments);

    _ent.responseFormatType = options.responseFormatType || "http://www.opengis.net/sensorml/2.0";
    
    // contiene los procedures disponibles en el servicio, desde capabilities
    _ent.onCapAllowedProcedures = [];

    // contiene los formatos de descripción disponibles en el servicio, desde capabilities
    _ent.onCapAllowedProceduresDescFormat = [];
};
SOS.inherit(SOS.entity.DescribeSensor, SOS.Entity);

/**
  * Solicita la descripción de un procedimiento.
  * Al finalizar lanza el evento SOS_SENSOR_DESCRIPTION_AVAILABLE.
  * @method getDescribeSensor
  * @async  
  * @param {object} options Objeto de opciones de filtrado y configuración { idProcedure: 'idProcedimientoAFiltrar', procedureDescriptionFormat: 'formatoRespuestaDeseado' }.
  * - Opcional: procedureDescriptionFormat, por defecto: "http://www.opengis.net/sensorml/2.0"
  * @return {SOS.Promise} Promesa
  * @example
        var describe = new SOS.entity.DescribeSensor({ url: 'http://sos_service/service' });
        describe.getDescribeSensor({ idProcedure: 'idProc1' }).then(function(data) {
            if(data) {
                console.log('getDescribeSensor OK');  
            }
        });   
  */
SOS.entity.DescribeSensor.prototype.getDescribeSensor = function (params) {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {
            _ent.getPostUrl().then(function (url) {
                if (url && url.length > 0) {
                    _ent.getOnCapAllowedProceduresDescFormat().then(function (format) {
                        if (!params.procedureDescriptionFormat) {
                            var getProcedureDescriptionFormat = function () {
                                if (typeof (_ent.onCapAllowedProceduresDescFormat) == 'string')
                                    params.procedureDescriptionFormat = _ent.onCapAllowedProceduresDescFormat;
                                else {
                                    if (_ent.onCapAllowedProceduresDescFormat instanceof Array && _ent.onCapAllowedProceduresDescFormat.length == 1)
                                        params.procedureDescriptionFormat = _ent.onCapAllowedProceduresDescFormat[0];
                                    else {
                                        if (_ent.onCapAllowedProceduresDescFormat.indexOf(_ent.responseFormatType) > -1)
                                            params.procedureDescriptionFormat = _ent.responseFormatType;
                                        else params.procedureDescriptionFormat = _ent.onCapAllowedProceduresDescFormat[0];
                                    }
                                }
                            };

                            getProcedureDescriptionFormat();
                        }

                        var _parseSensorDescription = function (response) {
                            if (_ent.data) {
                                if (response && response.responseText)
                                    _ent.get.read(response.responseText);

                                _ent.sos.SOSSensorDescription = _ent.data.DescribeSensorResponse;

                                _ent.sos.events.triggerEvent(SOS.Const.Events.SOS_SENSOR_DESCRIPTION_AVAILABLE);

                                resolve(_ent.sos.SOSSensorDescription);
                            }
                        };                        

                        SOS.Request.POST({
                            url: _ent.postUrl,
                            async: _ent.sos.config.async,
                            failure: function (error) {
                                console.log(SOS.Const.ErrorText.SOS_SENSOR_DESCRIPTION_ERROR);
                                console.log(error);
                                reject(SOS.Const.ErrorText.SOS_SENSOR_DESCRIPTION_ERROR + ' :' + error);
                            },
                            success: _parseSensorDescription,
                            data: _ent.get.write(params)
                        });
                    });
                    
                } else resolve([]);
            });            
        });
    });
};

/**
  * Solicita los formatos de respuesta de descripción de procedimiento disponibles en el servicio desde el capabalities y completa la propiedad onCapAllowedProceduresDescFormat.  
  * @method getOnCapAllowedProceduresDescFormat
  * @async
  * @return {SOS.Promise} Promesa
  * @example
        var describe = new SOS.entity.DescribeSensor({ url: 'http://sos_service/service' });
        describe.getOnCapAllowedProceduresDescFormat().then(function(descriptionFormats) {
            if(descriptionFormats) {
                console.log('Formatos de descripción disponibles OK');  
            }
        });   
  */
SOS.entity.DescribeSensor.prototype.getOnCapAllowedProceduresDescFormat = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            if (_ent.onCapAllowedProceduresDescFormat.length == 0)
                _ent.onCapAllowedProceduresDescFormat = _ent.sos.capsFormatter.getOperationParameterValues('DescribeSensor', 'procedureDescriptionFormat');

            resolve(_ent.onCapAllowedProceduresDescFormat);
        });
    });
};

/**
  * Solicita los ids de los procedimientos de los cuales se puede solicitar información, completa la propiedad onCapAllowedProcedures.
  * @method getOnCapAllowedProcedures
  * @async
  * @return {SOS.Promise} Promesa
  * @example
        var describe = new SOS.entity.DescribeSensor({ url: 'http://sos_service/service' });
        describe.getOnCapAllowedProcedures().then(function(availableProcedures) {
            if(availableProcedures) {
                console.log('Identificadores de procedimientos disponibles OK');  
            }
        });   
  */
SOS.entity.DescribeSensor.prototype.getOnCapAllowedProcedures = function () {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {

            if (_ent.onCapAllowedProcedures.length == 0)
                _ent.onCapAllowedProcedures = _ent.sos.capsFormatter.getOperationParameterValues('DescribeSensor', 'procedure');

            resolve(_ent.onCapAllowedProcedures);
        });
    });
};

SOS.entity.DescribeSensor.prototype.bindSourceXML = function () {
    var xmlSource = new SOS.source.XML({
        required: []
    });

    xmlSource.write = function (params) {
        var _src = this;

        _src.__proto__.write(params, ['idProcedure', 'procedureDescriptionFormat']);

        var getRequest = '<?xml version="1.0" encoding="UTF-8"?> ' +
            '<swes:DescribeSensor ' +
                'xmlns:swes="http://www.opengis.net/swes/2.0" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:gml="http://www.opengis.net/gml/3.2" ' +
                    'service="SOS" ' +
                    'version="2.0.0" ' +
                    'xsi:schemaLocation="http://www.opengis.net/swes/2.0 http://schemas.opengis.net/swes/2.0/swes.xsd"> ' +
                '<swes:procedure>' + params.idProcedure + '</swes:procedure> ' +
                (params.procedureDescriptionFormat ? '<swes:procedureDescriptionFormat>' + params.procedureDescriptionFormat + '</swes:procedureDescriptionFormat> ' : ' ') +
            '</swes:DescribeSensor>';

        return getRequest;
    };

    return xmlSource;
};

SOS.entity.DescribeSensor.prototype.bindSourceJSON = function () {
    var jsonSource = new SOS.source.JSON();
    jsonSource.write = function (params) {
        var _src = this;

        var data = {
            "request": "DescribeSensor",
            "service": "SOS",
            "version": "2.0.0",
            "procedure": params.idProcedure
        };

        if (params.procedureDescriptionFormat)
            data["procedureDescriptionFormat"] = params.procedureDescriptionFormat;

        return _src.__proto__.write(data);
    };

    return jsonSource;
};

/**
 * Contiene el tipo de formato para la respuesta de la solicitud DescribeSensor
 * @property responseFormatType
 * @type string
 * @default http://www.opengis.net/sensorml/2.0
 */
/**
 * Contiene los ids de procedimientos aceptados como parámetro en la solicitud DescribeSensor extraídos del capabilities, se completa mediante la llamada a getOnCapAllowedProcedures 
 * @property onCapAllowedProcedures
 * @type array
 * @default null
 */
/**
 * Contiene los formatos de respuesta aceptados como parámetro en la solicitud DescribeSensor extraídos del capabilities, se completa mediante la llamada a getOnCapAllowedProceduresDescFormat
 * @property onCapAllowedProceduresDescFormat
 * @type array
 * @default null
 */

