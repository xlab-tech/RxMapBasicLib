

/*
import GoogleMapsLoader from 'google-maps';

let _google;
 export default key => new Promise((resolve) => {
  GoogleMapsLoader.KEY = key;
  GoogleMapsLoader.VERSION = '3.34';
  if (_google) {
    resolve(_google);
    return;
  }
  GoogleMapsLoader.makeMock();
  GoogleMapsLoader.load((google) => {
    _google = google;
    resolve(google);
  });
  GoogleMapsLoader.onLoad(function (google) {
    console.log('I just loaded google maps api');
  });
});
*/

class GoogleMapsMock {
  constructor(id, options) {
    this.id = id;
    this.center = options.center;
    this.zoom = options.zoom;
    return this;
  }
}

export default {
  maps: {
    Map: (id, options) => new GoogleMapsMock(id, options),
  },
};
