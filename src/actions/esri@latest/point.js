
import leafletPoint from '../../utils/transformPointLeaflet';
import extractProperties from '../../utils/extractProperties';

const drawPoint = context => (point, style = {}, properties = {}) => {
  const esriLoader = context.library;
  const center = leafletPoint(point);

  return esriLoader.loadModules([
    'esri/symbols/SimpleMarkerSymbol',
    'esri/Graphic',
    'esri/geometry/Point',
    'esri/Color',
  ]).then(([SimpleMarkerSymbol, Graphic, Point, Color]) => {
    const esri = context.source.getMap();
    const fillColor = new Color(style.fillColor || '#FF0000');
    fillColor.a = style.fillOpacity || 0.35;
    const color = new Color(style.color || '#FF0000');
    color.a = style.opacity || 1;

    const markerSymbol = new SimpleMarkerSymbol({
      color: fillColor,
      style: 'point',
      size: style.radius || 5,
      outline: {
        color,
        width: style.weight || 1,
      },
    });

    const graphic = new Graphic({
      geometry: new Point(center[1], center[0]),
      symbol: markerSymbol,
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
