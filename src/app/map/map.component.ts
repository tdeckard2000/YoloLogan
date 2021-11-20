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
  map = {} as Map;

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        // center: fromLonLat([41.7370, 111.8338]),
        center: this.loganWebMercator,
        zoom: 12,
      }),
      target: 'ol-map'
    });

    let mainLayer = new TileLayer({
      source: new OSM()
    });

    const rome = new Feature({
      geometry: new Point(fromLonLat([-111.880100, 41.727778])),
      name: 'Rome'
    });

    rome.setStyle([
      new Style({
        image: new Icon({
          color: 'white',
          crossOrigin: 'anonymous',
          // For Internet Explorer 11
          imgSize: [25, 25],
          src: 'assets/images/map-pin3.svg',
        })
      }),
      new Style({
        text: new Text({
          // backgroundFill: new Fill({
          //   color: 'white'
          // }),
          fill: new Fill({color: 'black'}),
          font: 'bold 12px sans-serif',
          offsetX: -60,
          offsetY: 2.5,
          // padding: [2, 2, 2, 2],
          stroke: new Stroke({color: 'white', width: 5}),
          text: 'Volunteer Day..',
        })
        })
    ]);

    const vectorSource = new VectorSource({
      features: [rome]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(mainLayer);
    this.map.addLayer(vectorLayer);
  }
}
