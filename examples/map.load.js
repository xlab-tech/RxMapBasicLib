import { RxMap, registerLib, RxMapFromConfig } from '@rxmap/rxmap/src/index';
import lib from './../src/index';

registerLib(...lib);

const config = {
  type: 'leaflet',
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
        color: '#0000ff ',
        fillColor: '#0000ff ',
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

const load = async () => {
  debugger;
  const Map = await RxMap.load('esri', {});
  const t = await Map.create('map', 42, 2.4, 12).wait();
  Map.marker({ lat: 51.5, lng: -0.09 }).popup(' Esto es una prieba');
  Map.point({
    lat: 42.1,
    lng: 2.42,
  }, {
      color: '#0000ff ',
      fillColor: '#0000ff ',
      radius: 20,
      opacity: 1,
      fillOpacity: 0.5,
      weight: 1,
    });
  Map.setCenter({ zoom: 8, lat: 51.53270552998373, lng: -0.08368492126464844 });

};

load();