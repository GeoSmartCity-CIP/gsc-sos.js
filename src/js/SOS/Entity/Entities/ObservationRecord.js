/**
 * Instancia un objeto ObservationRecord
 *
 * @class ObservationRecord
 * @extends SOS.Entity
 * @param {object} Objeto de configuración {id, featureOfInterest[{ id, name }], observedProperty[], time, procedure[], type, result{ type, uom, value }} 
 */
SOS.entity.ObservationRecord = function (options) {
    var _ent = this;
    _ent.entityName = 'ObservationRecord';

    if (options.oM_Observation)
        options = options.oM_Observation;

    _ent.id = options['@id'] || options.id;

    _ent.featuresOfInterest = [];
    if (options.featureOfInterest instanceof Array) {
        for (var i = 0; i < options.featureOfInterest.length; i++) {
            _ent.featuresOfInterest.push({
                id: options.featureOfInterest[i]['@href'] || options.featureOfInterest[i].id,
                name: options.featureOfInterest[i]['@title'] || options.featureOfInterest[i].name
            });
        }
    } else {
        _ent.featuresOfInterest.push({
            id: options.featureOfInterest['@href'] || options.featureOfInterest.id,
            name: options.featureOfInterest['@title'] || options.featureOfInterest.name
        });
    }

    _ent.observedProperty = [];
    if (options.observedProperty instanceof Array) {
        for (var i = 0; i < options.observedProperty.length; i++)
            _ent.observedProperty.push(options.observedProperty[i]['@href'] || options.observedProperty[i]);
    } else _ent.observedProperty.push(options.observedProperty['@href'] || options.observedProperty);

    var newDate = function (D) {
        D = new Date(D);
        var newDate = new Date(D.getTime() + D.getTimezoneOffset() * 60 * 1000);
        var offset = D.getTimezoneOffset() / 60;
        var hours = D.getHours();

        newDate.setHours(hours + offset);

        return newDate;
    }

    if (options.phenomenonTime.timeInstant)
        _ent.time = newDate(options.phenomenonTime.timeInstant.timePosition);
    else if (options.phenomenonTime.timePeriod)
        _ent.time = [newDate(options.phenomenonTime.timePeriod.beginPosition), newDate(options.phenomenonTime.timePeriod.endPosition)];
    else if (options.time)
        _ent.time = options.time;


    _ent.procedure = [];
    if (options.procedure instanceof Array) {
        for (var i = 0; i < options.procedure.length; i++)
            _ent.procedure.push(options.procedure[i]['@href'] || options.procedure[i]);
    } else _ent.procedure.push(options.procedure['@href'] || options.procedure);

    if (options.type && options.type['@href'])
        _ent.type = options.type['@href'];
    else _ent.type = options.type;

    if (options.result) {
        var allowedCvtr = [];
        var converter = new SOS.Utils.Converter.DataTypeConverter();
        allowedCvtr.push(converter.createConverter(SOS.Utils.Converter.Types.FLOAT));
        allowedCvtr.push(converter.createConverter(SOS.Utils.Converter.Types.INT));

        if (options.result['@type']) {
            switch (options.result['@type'].split(':').pop().toLowerCase()) {
                case 'referencetype':
                    _ent.result = {
                        type: options.result['@title'],
                        uom: '',
                        value: ''
                    };
                    break;
                case 'boolean':
                    _ent.result = {
                        uom: options.result['@uom'] || '',
                        value: options.result['#text'] == 'true'
                    };
                    break;
                case 'integer':
                    _ent.result = {
                        uom: options.result['@uom'] || '',
                        value: parseInt(options.result['#text'])
                    };
                    break;
                case 'string':
                    _ent.result = {
                        uom: options.result['@uom'] || '',
                        value: options.result['#text']
                    };
                    break;
                case 'measuretype':
                    var val = options.result['#text'];

                    _ent.result = {
                        uom: options.result['@uom'],
                        value: val
                    };

                    for (var i = 0; i < allowedCvtr.length; i++) {
                        if (allowedCvtr[i].is(val)) {
                            val = allowedCvtr[i].convert(val);
                            _ent.result.value = val;
                            break;
                        }
                    }
            }
        }
        else {
            _ent.result = {
                type: options.result.type,
                uom: options.result.uom,
                value: options.result.value
            };
        }
    }
};
/**
 * Contiene el identificador del registro 
 * @property id
 * @type string 
 */
/**
 * Contiene los posibles featuresOfInterest relacionados con la observación
 * @property featureOfInterest
 * @type array - {object} id, name
 */
/**
 * Contiene los las propiedades observadas de la observación
 * @property observedProperty
 * @type array
 */
/**
 * Contiene la fecha de la medición | resultado cálculo de la observación
 * @property time
 * @type date | [date, date]
 */
/**
 * Contiene el procedimiento con el cual se ha realizado la medición | resultado cálculo
 * @property procedure
 * @type []
 */
/**
 * Contiene el tipo de formato de la observación
 * @property type
 * @type string
 */
/**
 * Contiene el resultado con la unidad de medida y el valor { type, uom, value }
 * @property result
 * @type {object}
 */

