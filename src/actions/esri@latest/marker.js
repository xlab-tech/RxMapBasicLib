
import leafletPoint from '../../utils/transformPointLeaflet';
import extractProperties from '../../utils/extractProperties';

const drawMarker = context => (point, options = {}, properties = {}) => {
  const esriLoader = context.library;
  const center = leafletPoint(point);
  return esriLoader.loadModules([
    'esri/symbols/PictureMarkerSymbol',
    'esri/Graphic',
    'esri/geometry/Point',
  ]).then(([PictureMarkerSymbol, Graphic, Point]) => {
    const esri = context.source.getMap();
    const iconUrl = options.icon || 'https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png';
    const iconWidth = options.size ? options.size.width : 20;
    const iconHeight = options.size ? options.size.height : 25;
    const pictureMarkerSymbol = new PictureMarkerSymbol(iconUrl, iconWidth, iconHeight);

    const graphic = new Graphic({
      geometry: new Point(center[1], center[0]),
      symbol: pictureMarkerSymbol,
      attributes: extractProperties(properties),
    });
    esri.view.graphics.add(graphic);
    return graphic;
  });
};

export default drawMarker;
/**
 * @private
*/
export const name = 'marker';
