

import leafletPoint from '../../utils/transformPointLeaflet';

const setCenter = context => (options) => {
  const { zoom } = options;
  const point = leafletPoint(options, true);
  const esriLoader = context.library;


  return esriLoader.loadModules(['esri/geometry/Point']).then(([Point]) => {
    const esri = context.source.getMap();
    if (point) {
      esri.view.center = new Point(point[1], point[0]);
    }
    if (zoom) {
      esri.view.zoom = zoom;
    }
    return context.lastExecution.value;
  });
};

export default setCenter;
/**
 * @private
*/
export const name = 'setCenter';
