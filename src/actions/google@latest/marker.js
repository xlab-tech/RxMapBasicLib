
import googlePoint from '../../utils/transformPointGoogle';
import extractProperties from '../../utils/extractProperties';
import { icon } from '../../utils/googleStyle';

/**
 * Funcion que permite crear un marcador en el mapa
 *
 * @param {Object|Array} point Posicion del mapa
 * @param {Object} [options] opcions del Marcador
 * @param {String} [options.icon] icono del Marcador
 * @param {Object} [options.size] tamaño del Marcador
 * @param {Number} [options.size.with] alto del Marcador
 * @param {Number} [options.size.height] ancho del Marcador
 * @param {Object} [properties] propiedades / features del marcador
 * @returns {Object} Marcador
 */
const drawMarker = context => (point, options = {}, properties = {}) => {
  const googleMaps = context.library.maps;
  const map = context.source.getMap();
  if (!map._elements) {
    map._elements = [];
  }
  const markerOptions = {
    position: googlePoint(point),
    map,
  };
  if (options && options.icon) {
    markerOptions.icon = icon(googleMaps, options);
  }
  const markerMap = new googleMaps.Marker(markerOptions);
  markerMap.properties = extractProperties(properties);
  map._elements.push(markerMap);
  return markerMap;
};

export default drawMarker;
/**
 * @private
*/
export const name = 'marker';
