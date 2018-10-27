

const remove = context => (all = false) => {
  const { value, name } = context.lastExecution;
  const _map = context.source.getMap();
  let items = [];
  if (all) {
    const layers = Object.values(_map._layers);
    items = layers.filter(layer => layer._latlng);
  }
  if (name === 'find') {
    items = value;
  }
  items.forEach(item => item.remove());
  return true;
};

export default remove;
/**
 * @private
*/
export const name = 'remove';
