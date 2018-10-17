import { fromEventPattern } from 'rxjs/internal/observable/fromEventPattern';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { from } from 'rxjs/internal/observable/from';

const center = context => () => {
  const esriLoader = context.library;
  const esri = context.source.getMap();

  return from(esriLoader.loadModules([
    'esri/core/watchUtils',
  ])).pipe(
    switchMap(([watchUtils]) => {
      const addClickHandler = handler => watchUtils.whenTrue(esri.view, 'stationary', handler);
      const removeClickHandler = (handler, listener) => listener.remove();
      return fromEventPattern(
        addClickHandler,
        removeClickHandler,
      ).pipe(
        map(() => {
          const _center = esri.view.center;
          return { lat: _center.latitude, lng: _center.longitude };
        }),
      );
    }),
  );
};

export default center;
/**
 * @private
*/
export const name = 'center';
