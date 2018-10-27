
import transformPoint from '../../utils/transformPointGoogle';

const find = context => (field, condition, native = false) => {
  const esri = context.source.getMap();
  const graphics = esri.view.graphics._items;
  let elements = [];
  if (field === 'position' || field === 'coord') {
    const point = transformPoint(condition);
    elements = graphics.filter(graphic => graphic.geometry.latitude === point.lat && graphic.geometry.longitude === point.lng);
  } else {
    elements = graphics.filter(graphic => graphic.attributes && graphic.attributes[field] && graphic.attributes[field].match(condition));
  }
  return native ? elements : elements.map(graphic => graphic.attributes);
};

export default find;
/**
 * @private
*/
export const name = 'find';
