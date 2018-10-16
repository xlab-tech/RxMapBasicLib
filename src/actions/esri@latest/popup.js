// Create a marker and set its position.
const addPopup = (graphics, content) => {
  const { attributes } = graphics;
  let contentString = content;
  if (typeof content === 'function') {
    contentString = content(attributes);
  }
  // eslint-disable-next-line
  graphics.popupTemplate = {
    content: contentString,
  };
};

const popup = context => (content) => {
  const { value, name } = context.lastExecution;
  if (name === 'marker') {
    addPopup(value, content);
  } else if (name === 'addData') {
    value.forEach((marker) => {
      addPopup(marker, content);
    });
  }
  return context.lastExecution.value;
};

export default popup;
/**
 * @private
*/
export const name = 'popup';
