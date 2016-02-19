
/**
 * Instancia un objeto ObservationById
 * var obsId = SOS.entity.ObservationById({ url: 'urlServicioSOS' });
 *
 * @class ObservationById
 * @extends SOS.Entity
 * @param {object} { url: urlServicio } - URL del servicio al cual se conectará.
 * @throws {Error} Lanza error cuando no se construye el objeto mediante new.
 * @throws {Error} Lanza error cuando no se indica URL al servicio o una instancia de SOS.
 */
SOS.entity.ObservationById = function (options) {
    var _ent = this;

    _ent.entityName = 'ObservationById';
    _ent.capsOperation = 'GetObservationById';

    SOS.Entity.apply(_ent, arguments);    
};
SOS.inherit(SOS.entity.ObservationById, SOS.Entity);

// Obtiene observaciones por los ids correspondientes, recibe array con los ids de las observaciones a consultar
/**
  * Solicita las observaciones que tengan como identificador los pasados como filtro. 
  * Completa la propiedad SOSObservations de la instancia del objeto SOS de la propiedad sos de la entidad con las observaciones resultantes de la petición.  
  * Al finalizar lanza el evento SOS_OBSERVATION_BY_ID_AVAILABLE
  * @method getObservationById
  * @async  
  * @param {object} [params] Objeto de opciones de filtrado { observationId: [idsObs] }
  * @param {function} callback Función que se ejecutará al finalizar la petición - Opcional.     
  * @return {SOS.Promise} Promesa
  */
SOS.entity.ObservationById.prototype.getObservationById = function (params, callback) {
    var _ent = this;

    return new SOS.Promise(function (resolve, reject) {
        _ent.sos.getCapabilities().then(function () {
            _ent.getPostUrl().then(function (url) {
                if (url && url.length > 0) {
                    var _parseObservation = function (callback) {
                        if (_ent.data) {
                            if (_ent.data.GetObservationByIdResponse && _ent.data.GetObservationByIdResponse.observation)
                                _ent.data = _ent.sos.SOSObservations = _ent.data.GetObservationByIdResponse.observation;

                            var result = [];
                            if (_ent.data.oM_Observation) {
                                _ent.data = _ent.sos.SOSObservations = _ent.data.oM_Observation;
                                result.push(new SOS.entity.ObservationRecord(_ent.data));

                                if (result)
                                    _ent.data = _ent.sos.SOSObservations = result;
                            }

                            _ent.sos.events.triggerEvent(event || SOS.Const.Events.SOS_OBSERVATION_BY_ID_AVAILABLE);

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

                            _parseObservation();

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

SOS.entity.ObservationById.prototype.bindSourceXML = function () {
    var _ent = this;

    var xmlSource = new SOS.source.XML({
        required: []
    });

    xmlSource.write = function (params) {
        var _src = this;

        _src.__proto__.write(params, ['observationId']);

        var filterNodes = {
            observationId: '<sos:observation>filter</sos:observation> ',
        };

        var getFilterNodes = function (filterNodeType, filters) {
            for (var i = 0; i < filters.length; i++)
                getRequest += filterNodes[filterNodeType].replace(/filter/g, filters[i]);
        };

        var getRequest = '<?xml version="1.0" encoding="UTF-8"?> ' +
            '<sos:GetObservationById ' +
                'xmlns:sos="http://www.opengis.net/sos/2.0" ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd"> ';

        if (params.observationId)
            getFilterNodes('observationId', params.observationId instanceof Array ? params.observationId : [params.observationId]);

        getRequest += '</sos:GetObservationById> ';

        return getRequest;
    };

    return xmlSource;
};

SOS.entity.ObservationById.prototype.bindSourceJSON = function () {

};

