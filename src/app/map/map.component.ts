import { Component, AfterViewInit, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, transform} from 'ol/proj.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  loganLonLat = [-111.830833, 41.737778];
  loganWebMercator = fromLonLat(this.loganLonLat);

  ngOnInit(): void {
    let map = new Map({
      view: new View({
        // center: fromLonLat([41.7370, 111.8338]),
        center: this.loganWebMercator,
        zoom: 12,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }
}
