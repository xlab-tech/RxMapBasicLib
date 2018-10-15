
import leafletPoint from '../../utils/transformPointLeaflet';
import extractProperties from '../../utils/extractProperties';

const drawPoint = context => (point, style = {}, properties = {}) => {
  const esriLoader = context.library;
  const center = leafletPoint(point);
  const _map = context.source.getMap();

  return esriLoader.require([
    'esri/symbols/SimpleMarkerSymbol',
    'esri/Graphic',
    'esri/layers/GraphicsLayer',
    'esri/geometry/Point',
    'esri/Color',
  ]).then((SimpleMarkerSymbol, Graphic, GraphicsLayer, Point, Color) => {
    const fillColor = new Color(style.fillColor || '#FF0000');
    fillColor.a = style.fillOpacity || 0.35;
    const color = new Color(style.color || '#FF0000');
    color.a = style.opacity || 1;

    const markerSymbol = new SimpleMarkerSymbol({
      color: fillColor,
      style: 'square',
      size: style.radius || 5,
      outline: {
        color,
        width: style.weight || 1,
      },
    });

    let layer = _map.getLayer('rxMap@Graphics');
    if (!layer) {
      layer = new GraphicsLayer({ id: 'rxMap@Graphics' });
      _map.addLater(layer);
    }
    const graphic = new Graphic({
      geometry: new Point(center[0], center[1]),
      symbol: markerSymbol,
      attributes: extractProperties(properties),
    });

    layer.add(graphic);
    return graphic;
  });
};

export default drawPoint;
/**
 * @private
*/
export const name = 'point';
