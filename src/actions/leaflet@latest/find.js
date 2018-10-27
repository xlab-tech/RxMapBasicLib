

import leafletPoint from '../../utils/transformPointLeaflet';

const find = context => (field, condition, native = false) => {
  const _map = context.source.getMap();
  const layers = Object.values(_map._layers);
  let elements = [];
  if (field === 'position' || field === 'coord') {
    const point = leafletPoint(condition);
    elements = layers.filter(layer => layer._latlng === point);
  } else {
    elements = layers.filter(layer => layer.properties && layer.properties[field] && layer.properties[field].match(condition));
  }
  return native ? elements : elements.map(layer => layer.properties);
};

export default find;
/**
 * @private
*/
export const name = 'find';
