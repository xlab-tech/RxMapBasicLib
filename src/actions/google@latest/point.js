
import googlePoint from '../../utils/transformPointGoogle';
import extractProperties from '../../utils/extractProperties';
import { getStyle } from '../../utils/googleStyle';

const drawPoint = context => (point, style, properties) => {
  // TODO: calcular el radio desde pixels a metros
  const googleMaps = context.library.maps;
  const _map = context.source.getMap();
  if (!_map._elements) {
    _map._elements = [];
  }
  const circle = new googleMaps.Circle({
    map: _map,
    center: googlePoint(point),
    ...getStyle(style),
  });
  circle.properties = extractProperties(properties);
  _map._elements.push(circle);

  return circle;
};

export default drawPoint;
/**
 * @private
*/
export const name = 'point';
