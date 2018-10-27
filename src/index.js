
export const name = 'RxMapBasicLib';
export const actions = ['addData', 'create', 'marker', 'point', 'popup', 'setCenter', 'find', 'remove', 'update'];
export const observers = ['gps', 'center', 'click'];
export const func = (type, mapLib, version, key) => import(
  /* webpackMode: "lazy" */
  /* webpackInclude: /(actions|observers).+@/ */
  `./${type}/${mapLib}@${version}/${key}`,
);

export default [
  name,
  {
    observers,
    actions,
  },
  func,
];
