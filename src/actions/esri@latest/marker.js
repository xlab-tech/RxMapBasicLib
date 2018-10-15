
import leafletPoint from '../../utils/transformPointLeaflet';
import extractProperties from '../../utils/extractProperties';

const drawMarker = context => (point, options = {}, properties = {}) => {
  const esriLoader = context.library;
  const center = leafletPoint(point);
  const _map = context.source.getMap();

  return esriLoader.require([
    'esri/symbols/PictureMarkerSymbol',
    'esri/Graphic',
    'esri/layers/GraphicsLayer',
    'esri/geometry/Point',
  ]).then((PictureMarkerSymbol, Graphic, GraphicsLayer, Point) => {
    const iconUrl = options.icon || 'http://www.esri.com/graphics/aexicon.jpg';
    const iconWidth = options.size ? options.size.width : 51;
    const iconHeight = options.size ? options.size.height : 51;
    const pictureMarkerSymbol = new PictureMarkerSymbol(iconUrl, iconWidth, iconHeight);

    let layer = _map.getLayer('rxMap@Graphics');
    if (!layer) {
      layer = new GraphicsLayer({ id: 'rxMap@Graphics' });
      _map.addLater(layer);
    }
    const graphic = new Graphic({
      geometry: new Point(center[0], center[1]),
      symbol: pictureMarkerSymbol,
      attributes: extractProperties(properties),
    });

    layer.add(graphic);
    return graphic;
  });
};

export default drawMarker;
/**
 * @private
*/
export const name = 'marker';
