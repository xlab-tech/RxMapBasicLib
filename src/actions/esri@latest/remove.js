

const remove = context => (all = false) => {
  const { value, name } = context.lastExecution;
  const { view } = context.source.getMap();
  let items = [];
  if (all) {
    items = [...view.graphics._items];
  }
  if (name === 'find') {
    items = value;
  }
  items.forEach(item => view.graphics.remove(item));
  return true;
};

export default remove;
/**
 * @private
*/
export const name = 'remove';
