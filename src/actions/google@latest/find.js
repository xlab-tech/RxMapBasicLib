

import googlePoint from '../../utils/transformPointGoogle';

const find = context => (field, condition, native = false) => {
  const _map = context.source.getMap();
  let elements = [];
  if (field === 'position' || field === 'coord') {
    const point = googlePoint(condition);
    elements = _map._elements.filter(element => element.getPosition() === point);
  } else {
    elements = _map._elements.filter(element => element.properties && element.properties[field] && element.properties[field].match(condition));
  }
  return native ? elements : elements.map(element => element.properties);
};

export default find;
/**
 * @private
*/
export const name = 'find';
