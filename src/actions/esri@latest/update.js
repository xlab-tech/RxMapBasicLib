

import leafletPoint from '../../utils/transformPointLeaflet';
import { simpleMarker, pictureMarker } from '../../utils/esriStyle';

const update = context => (options) => {
  const { source } = context;
  const { view } = source.getMap();
  const { value, name } = context.lastExecution;
  const {
    point,
    style,
    properties,
    object,
  } = options;
  const center = leafletPoint(point, true);
  let elements = object;

  let _style = style;
  let typeId = false;
  if (typeof style === 'string') {
    _style = source.getDataType(style);
    if (_style) {
      typeId = style;
      _style = _style.style;
    }
  }

  if (name === 'find') {
    elements = value;
  }
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  const newElements = elements.map(element => element.clone());

  if (center) {
    const geometry = {
      type: 'point',
      longitude: center[1],
      latitude: center[0],
    };
    // eslint-disable-next-line
    newElements.forEach((element) => { element.geometry = geometry; });
  }
  if (properties) {
    newElements.forEach((elem) => {
      if (elem.attributes['@rxmapDataType']) {
        properties['@rxmapDataType'] = elem.attributes['@rxmapDataType'];
      }
      // eslint-disable-next-line
      elem.attributes = properties;
    });
  }
  if (_style && _style.icon) {
    // eslint-disable-next-line
    newElements.forEach((elem) => { elem.symbol = pictureMarker(_style); });
  } else if (_style) {
    newElements.forEach((elem) => {
      // eslint-disable-next-line
      elem.symbol = simpleMarker(_style);
      if (typeId) {
        // eslint-disable-next-line
        elem.attributes['@rxmapDataType'] = typeId;
      }
    });
  }
  elements.forEach(item => view.graphics.remove(item));
  newElements.forEach(item => view.graphics.add(item));
  return newElements;
};

export default update;
/**
 * @private
*/
export const name = 'update';
