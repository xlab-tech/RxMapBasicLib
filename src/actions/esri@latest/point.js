
import leafletPoint from '../../utils/transformPointLeaflet';
import extractProperties from '../../utils/extractProperties';
import { simpleMarker } from '../../utils/esriStyle';

const drawPoint = context => (point, style = {}, properties = {}) => {
  const esriLoader = context.library;
  const center = leafletPoint(point);

  return esriLoader.loadModules([
    'esri/Graphic',
  ]).then(([Graphic]) => {
    const esri = context.source.getMap();
    const geometry = {
      type: 'point',
      longitude: center[1],
      latitude: center[0],
    };
    const graphic = new Graphic({
      geometry,
      symbol: simpleMarker(style),
      attributes: extractProperties(properties),
    });
    esri.view.graphics.add(graphic);

    return graphic;
  });
};

export default drawPoint;
/**
 * @private
*/
export const name = 'point';
