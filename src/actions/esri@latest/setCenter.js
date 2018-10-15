

import leafletPoint from '../../utils/transformPointLeaflet';

const setCenter = context => (options) => {
  const { zoom } = options;
  const point = leafletPoint(options);
  const esriLoader = context.library;
  const map = context.source.getMap();

  return esriLoader.require(['esri/geometry/Point']).then((Point) => {
    if (point) {
      map.centerAt(new Point(point[0], point[1]));
    }
    if (zoom) {
      map.setZoom(zoom);
    }
    return context.lastExecution.value;
  });
};

export default setCenter;
/**
 * @private
*/
export const name = 'setCenter';
