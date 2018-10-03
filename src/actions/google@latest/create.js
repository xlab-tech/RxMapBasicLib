
/**
 * Acción para crear el mapa
 * @param {String} id Id del elemento sobre el que se creara el mapa
 * @param {Number} lat Latitud
 * @param {Number} lng Longitud
 * @param {Number} zoom Zoom
 * @returns {Object} devuelve el mapa creado
 */
const create = context => (id, lat, lng, zoom) => {
  const googleMaps = context.library.maps;
  const _map = new googleMaps.Map(document.getElementById(id), {
    center: { lat, lng },
    zoom,
  });
  return _map;
};

export default create;
/**
 * @private
*/
export const name = 'create';
