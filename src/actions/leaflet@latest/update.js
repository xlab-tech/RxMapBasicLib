

import leafletPoint from '../../utils/transformPointLeaflet';

const update = context => (options) => {
  const L = context.library;
  const { source } = context;
  const { value, name } = context.lastExecution;
  const {
    point,
    style,
    properties,
    object,
  } = options;
  const center = leafletPoint(point, true);
  let element = object;
  let _style = style;

  if (name === 'find') {
    element = value;
  }
  if (!Array.isArray(element)) {
    element = [element];
  }

  if (properties) {
    element.filter(elem => elem.properties).forEach((elem) => {
      if (elem.properties['@rxmapDataType']) {
        properties['@rxmapDataType'] = elem.properties['@rxmapDataType'];
      }
      // eslint-disable-next-line
      elem.properties = properties;
    });
  }

  if (center) {
    element.forEach(elem => elem.setLatLng(center));
  }

  let typeId = false;
  if (typeof style === 'string') {
    _style = source.getDataType(style);
    if (_style) {
      typeId = style;
      _style = _style.style;
    }
  }

  if (_style && _style.icon) {
    const myIcon = L.icon({
      iconUrl: _style.icon,
      iconSize: _style.size ? [_style.size.width, _style.size.height] : null,
    });
    element.filter(elem => elem.setIcon)
      .forEach((elem) => {
        elem.setIcon(myIcon);
        if (typeId) {
          // eslint-disable-next-line
          elem.properties['@rxmapDataType'] = typeId;
        }
      });
    return element;
  }

  if (_style) {
    element.forEach((elem) => {
      elem.setStyle(_style);
      if (typeId) {
        // eslint-disable-next-line
        elem.properties['@rxmapDataType'] = typeId;
      }
    });
  }

  element.filter(elem => elem.redraw)
    .forEach(elem => elem.redraw());

  return element;
};

export default update;
/**
 * @private
*/
export const name = 'update';
