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
import { HttpService } from '../services/http.service';
import { EventObject } from '../services/interfaces';
import { ObjectId } from 'mongodb';
import { Subscription } from 'rxjs';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private httpService:HttpService, private mainService:MainService) { }

  filteredEvents: Array<EventObject> = []
  loganLonLat = [-111.830833, 41.737778];
  loganWebMercator = fromLonLat(this.loganLonLat);
  mainLayer = new TileLayer({source: new OSM()});
  map = {} as Map;

  initializeMap() {
    this.map = new Map({
      view: new View({
        center: this.loganWebMercator,
        zoom: 11,
      }),
      target: 'ol-map'
    });
    this.map.addLayer(this.mainLayer);
  };

  prepareLocationsForMap(events:Array<EventObject>) {
    let locationsArray:Array<Feature<Point>> = [];
    for(let i = 0; i < events.length; i++) {
      const coordinatesLat = events[i].address.coordLat;
      const coordinatesLng = events[i].address.coordLng;
      const eventTitle = events[i].title;
      const eventId = events[i]._id;
      const mapMarker = new Feature({
        geometry: new Point(fromLonLat([coordinatesLng, coordinatesLat])),
        name: eventId
      });
      mapMarker.setStyle([
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
            text: eventTitle.slice(0,10) + "..",
          })
        })
      ]);
      locationsArray.push(mapMarker);
    };
      this.placeCoordinatesOnMap(locationsArray);
  };

  placeCoordinatesOnMap(locationsArray:Array<Feature<Point>>) {
    const vectorSource = new VectorSource({
      features: locationsArray
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      className: "eventLocations"
    });
    this.map.addLayer(vectorLayer);
  };

  removeAllMapPoints() {
    const existingLayers = (this.map.getLayers().getArray());
    for(let i = 1; i < existingLayers.length; i++){
      //layer 0 is the map itself
      this.map.removeLayer(existingLayers[i])
    };
  };

  ngOnInit(): void {
    this.initializeMap();
    this.httpService.getAllEvents().subscribe(results => {
      this.prepareLocationsForMap(results);
    });
    this.httpService.getFilteredEvents().subscribe(results => {
      this.filteredEvents = results;
      this.removeAllMapPoints();
      this.prepareLocationsForMap(results);
    });
    this.mainService.getMobileToolSelected().subscribe(result=> {
      if(result === "map") {
        // this.map.setTarget();
        // this.map.setTarget('ol-map');
        this.initializeMap();
      };
    });
  }
}

