

const remove = context => (all = false) => {
  const { value, name } = context.lastExecution;
  const _map = context.source.getMap();
  let items = [];
  if (all) {
    _map._elements.forEach(element => element.setMap(null));
    _map._elements = [];
  }
  if (name === 'find') {
    items = value;
  }
  items.forEach(item => item.setMap(null));
  _map._elements = _map._elements.filter(element => items.includes(element));
  return true;
};

export default remove;
/**
 * @private
*/
export const name = 'remove';
