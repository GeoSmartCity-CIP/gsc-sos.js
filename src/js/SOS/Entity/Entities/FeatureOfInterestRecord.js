/**
 * Instancia un objeto FeatureOfInterestRecord.
 *
 * @class FeatureOfInterestRecord
 * @extends SOS.Entity
 * @param {object} Objeto de configuración {id, idFOI, type, name, sampledFeature, geom} 
 */
SOS.entity.FeatureOfInterestRecord = function (options) {
    var _ent = this;
    _ent.entityName = 'FeatureOfInterestRecord';

    _ent.id = options['@id'] || options.id || '';
    _ent.idFOI = options.identifier && (options.identifier['#text'] || options.identifier.value) || options.idFOI || '';
    _ent.type = options.type && options.type['@href'] || options.type || '';
    _ent.name = options.name && (options.name['#text'] || options.name.value) || '';
    _ent.sampledFeature = options.sampledFeature && (options.sampledFeature['@href'] || options.sampledFeature) || '';

    if (options.shape || options.geometry) {
        var geom = {};

        if (options.geometry) {
            geom.type = options.geometry.type;
            geom.srs = options.geometry.srs;
            geom.coords = options.geometry.coordinates;
        }
        else {
            for (var geomType in options.shape) {
                if (options.shape[geomType]['@id'])
                    geom.type = options.shape[geomType]['@id'].split('_').shift();

                if (options.shape[geomType].pos) {
                    if (options.shape[geomType].pos['@srsName'])
                        geom.srs = options.shape[geomType].pos['@srsName'].split('/').pop();
                    if (options.shape[geomType].pos['#text']) {
                        geom.coords = options.shape[geomType].pos['#text'].split(' ');

                        for (var i = 0; i < geom.coords.length; i++)
                            geom.coords[i] = parseInt(geom.coords[i]);                        
                    }
                }
            }
        }

        if (geom.type && geom.srs && geom.coords)
            _ent.geom = geom;
    } else { _ent.geom = {}; }

};
/**
 * Contiene el identificador gml
 * @property id
 * @type string 
 */
/**
 * Contiene el identificador featureOfInterest
 * @property idFOI
 * @type string 
 */
/**
 * Contiene el tipo SF_SamplingPoint | SF_SampledPoint
 * @property type 
 * @type string 
 */
/**
 * Contiene el nombre
 * @property name 
 * @type string 
 */
/**
 * Caracterítica medida
 * @property sampledFeature 
 * @type string 
 */
/**
 * Geometría del featureOfInterest
 * @property geom 
 * @type {object}  Contiene srs, type (Point), coords[]
 */

