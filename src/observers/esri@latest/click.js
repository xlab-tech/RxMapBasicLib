import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

const click = context => () => {
  const esri = context.source.getMap();
  const { value, name } = context.lastExecution;

  const addClickHandler = handler => esri.view.on('click', handler);
  const removeClickHandler = (handler, listener) => listener.remove();

  const $strem = fromEventPattern(
    addClickHandler,
    removeClickHandler,
  );

  const mapFunction = event => ({ lat: event.mapPoint.latitude, lng: event.mapPoint.longitude });

  if (name === 'marker') {
    const mergeMapFunction = event => esri.view.hitTest(event).then((response) => {
      const graphic = response.results.filter(obj => obj === value);
      return graphic;
    });

    return $strem.pipe(
      mergeMap(mergeMapFunction),
    );
  }

  return $strem.pipe(map(mapFunction));
};

export default click;
/**
 * @private
*/
export const name = 'click';
