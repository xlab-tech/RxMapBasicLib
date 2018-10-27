
export const icon = (googleMaps, options) => ({
  url: options.icon,
  // This marker is 20 pixels wide by 32 pixels high.
  scaledSize: options.size ? new googleMaps.Size(options.size.width, options.size.height) : null,
  // The origin for this image is (0, 0).
  origin: new googleMaps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  // anchor: new googleMaps.Point(0, 32),
});

export const getStyle = style => ({
  strokeColor: style.color || '#FF0000',
  strokeOpacity: style.opacity || 1,
  strokeWeight: style.weight || 1,
  fillColor: style.fillColor || '#FF0000',
  fillOpacity: style.fillOpacity || 0.35,
  radius: style.radius * 100 || 500,
});
