
/**
 * Acción para crear el mapa
 * @param {String} id Id del elemento sobre el que se creara el mapa
 * @param {Number} lat Latitud
 * @param {Number} lng Longitud
 * @param {Number} zoom Zoom
 * @returns {Object} devuelve el mapa creado
 */
const create = context => (id, lat, lng, zoom) => {
  const esriLoader = context.library;
  return esriLoader.loadModules(['esri/views/MapView', 'esri/Map'])
    .then(([MapView, Map]) => {
      const map = new Map({
        basemap: 'streets',
      });
      const view = new MapView({
        container: id,
        map,
        zoom,
        center: [lng, lat],
      });
      return { map, view };
    });
};

export default create;
/**
 * @private
*/
export const name = 'create';
