

import googlePoint from '../../utils/transformPointGoogle';
import { icon, getStyle } from '../../utils/googleStyle';

const update = context => (options) => {
  const { source } = context;
  const _map = source.getMap();
  const { value, name } = context.lastExecution;
  const {
    point,
    style,
    properties,
    object,
  } = options;
  const center = googlePoint(point, true);
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

  if (center) {
    elements.forEach(element => element.setPosition(center));
  }
  if (properties) {
    elements.forEach((elem) => {
      if (elem.properties['@rxmapDataType']) {
        properties['@rxmapDataType'] = elem.properties['@rxmapDataType'];
      }
      // eslint-disable-next-line
      elem.properties = properties;
    });
  }
  if (_style && _style.icon) {
    // eslint-disable-next-line
    const _icon = icon(_map, _style);
    elements.forEach(elem => elem.setIcon(_icon));
  } else if (_style) {
    // eslint-disable-next-line
    elements.forEach(elem => {
      elem.setOptions(getStyle(_style));
      if (typeId) {
        // eslint-disable-next-line
        elem.properties['@rxmapDataType'] = typeId;
      }
    });
  }
  return elements;
};

export default update;
/**
 * @private
*/
export const name = 'update';
