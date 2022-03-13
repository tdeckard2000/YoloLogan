import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, transform} from 'ol/proj.js';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  loganLonLat = [-111.830833, 41.737778];
  loganWebMercator = fromLonLat(this.loganLonLat);
  mainLayer = new TileLayer({source: new OSM()});
  map = {} as Map;

  placeCoordinatesOnMap() {
    const mapPin = new Feature({
      geometry: new Point(fromLonLat([-111.880100, 41.727778])),
      name: 'mapPin'
    });

    mapPin.setStyle([
      new Style({
        image: new Icon({
          color: 'white',
          crossOrigin: 'anonymous',
          imgSize: [25, 25],
          src: 'assets/images/map-pin3.svg',
        })
      }),
      new Style({
          text: new Text({
            fill: new Fill({color: 'black'}),
            font: 'bold 12px sans-serif',
            offsetX: -60,
            offsetY: 2.5,
            stroke: new Stroke({color: 'white', width: 5}),
            text: 'Volunteer Day..',
          })
        })
    ]);

    const vectorSource = new VectorSource({
      features: [mapPin]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: this.loganWebMercator,
        zoom: 11,
      }),
      target: 'ol-map'
    });

    this.map.addLayer(this.mainLayer);
    this.placeCoordinatesOnMap();
  }
}
