/* global describe,it,beforeEach */
import { expect } from 'chai';
import createGoogle from '../../src/actions/google@latest/create';
import createLeafet from '../../src/actions/leaflet@latest/create';
import google from '../mocks/google';
import leaflet from '../mocks/leaflet';

describe('Create', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test"></div>';
  });
  describe('google', () => {
    const context = {};
    context.library = google;
    it('google', async () => {
      const map = createGoogle(context, 'test', 5, 4, 10);
      expect(map.center.lat).to.have.eq(5);
      expect(map.center.lng).to.have.eq(4);
      expect(map.id).to.have.eq(document.getElementById('test'));
      expect(map.zoom).to.have.eq(10);
    });
  });
  describe('leaflet', () => {
    const context = {};
    context.library = leaflet;
    it('leaflet', () => {
      const map = createLeafet(context, 'test', 5, 4, 10);
      expect(map.getCenter().lat).to.have.eq(5);
      expect(map.getCenter().lng).to.have.eq(4);
      expect(document.getElementById('test').children.length).to.have.eq(2);
      expect(map.getZoom()).to.have.eq(10);
    });
  });
});
