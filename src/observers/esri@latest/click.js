import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
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

  if (name === 'marker' || name === 'addData') {
    const mergeMapFunction = event => esri.view.hitTest(event).then((response) => {
      let filterFunction = obj => obj.graphic === value;
      if (Array.isArray(value)) {
        filterFunction = obj => value.includes(obj.graphic);
      }
      const graphic = response.results.filter(filterFunction)
        .map(el => el.graphic)
        .map(el => el.attributes)
        .shift();

      if (graphic && Object.keys(graphic).length > 0) {
        event.stopPropagation();
        return graphic;
      }
      return null;
    });

    return $strem.pipe(
      mergeMap(mergeMapFunction),
      filter(el => el !== null),
    );
  }

  return $strem.pipe(map(mapFunction));
};

export default click;
/**
 * @private
*/
export const name = 'click';
