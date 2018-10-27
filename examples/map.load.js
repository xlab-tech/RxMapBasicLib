import { RxMap, registerLib, RxMapFromConfig } from '@rxmap/rxmap/src/index';
import lib from './../src/index';

registerLib(...lib);

const config = {
  type: 'google',
  options: {
    key: 'AIzaSyCjj-I0sYedbWCAmAoW2LgAr4T2bkPa09Y',
  },
  map: {
    autoCenter: false,
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 13,
  },
  dataTypes: [
    {
      id: 'test',
      geomType: 'point',
      style: {
        color: '#F00',
        fillColor: '#F00',
        radius: 10,
        opacity: 1,
        fillOpacity: 0.5,
        weight: 1,
      },
    },
    {
      id: 'pre',
      geomType: 'point',
      style: {
        color: '#0000ff',
        fillColor: '#0000ff',
        radius: 5,
        opacity: 1,
        fillOpacity: 0.5,
        weight: 1,
      },
    },
    {
      id: 'mar',
      geomType: 'marker',
      style: {
        icon: 'https://www.freeiconspng.com/uploads/red-location-map-pin-icon-5.png',
        size: { width: 24, height: 34 },
      },
    },
  ],
  layers: [],
};

const positions = [
  { lat: 51.50270552998373, lng: -0.08368492126464844 },
  { lat: 51.53270552998373, lng: -0.08368492126464844 },
  { lat: 1, lng: 2 },
];

const dataPre = [
  {
    lat: 42.05,
    lng: 2.4,
    test: 'asf',
    otro: 'oooo',
  },
  {
    position: {
      lat: 42.1,
      lng: 2.42,
    },
    test: 'asf',
    otro: 'oooo',
  },
];

const load = async () => {
  const Map = await RxMapFromConfig('map', config);
  // const Map = await RxMap.load('esri', {});
  // const t = await Map.create('map', 42, 2.4, 12).wait();

  Map.observer('center')
    .subscribe(data => console.log('subscribe Center', data));

  Map.marker({ lat: 51.5, lng: -0.09 }).popup(' Esto es una prieba');

  Map.marker({ lat: 51.53270552998373, lng: -0.08368492126464844 }, {}, { test: 'dadfsadf' })
    .observer('click')
    .subscribe(data => console.log('subscribe CLICK MARKER', data));

  Map.addData('test', dataPre)
    .observer('click')
    .subscribe(data => console.log('subscribe CLICK DATA PRE', data));

  /*Map.point({
    lat: 42.1,
    lng: 2.42,
  }, {
      color: '#0000ff ',
      fillColor: '#0000ff ',
      radius: 20,
      opacity: 1,
      fillOpacity: 0.5,
      weight: 1,
    });*/
  Map.setCenter({ zoom: 8, lat: 51.53270552998373, lng: -0.08368492126464844 });
  window.test = Map._sourceMap;
  setTimeout(() => {
    const p = Map.find('@rxmapDataType', 'test', true)
      //.remove()
      .update({ style: 'pre' })
      .subscribe((res) => {
        console.log(res);

      });
    // Map.find('test', 'dadfsadf', true).remove()
    // Map.remove(true);
  }, 4000);
  //Map.observer('click')
  //  .subscribe(data => console.log('subscribe Click', data));
};

load();
