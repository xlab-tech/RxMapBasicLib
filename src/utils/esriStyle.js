
const hexToRgb = (hex, transparent) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  let _hex = hex;
  _hex = _hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), transparent] : null;
};

export const simpleMarker = style => ({
  type: 'simple-marker',
  color: hexToRgb(style.fillColor || '#FF0000', style.fillOpacity || 0.35),
  style: 'point',
  size: style.radius || 5,
  outline: {
    color: hexToRgb(style.color || '#FF0000', style.opacity || 1),
    width: style.weight || 1,
  },
});

export const pictureMarker = (options) => {
  const iconUrl = options.icon || 'https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png';
  const iconWidth = options.size ? options.size.width : 20;
  const iconHeight = options.size ? options.size.height : 25;
  return {
    type: 'picture-marker',
    url: iconUrl,
    width: `${iconWidth}px`,
    height: `${iconHeight}px`,
  };
};
