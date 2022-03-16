import { Injectable, isDevMode} from '@angular/core';
import { ContactInfo, EventObject, FilterObject } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators'
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ObjectWithGeometry } from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  allEvents$: Subject<Array<EventObject>> = new Subject();
  filteredEvents$: Subject<Array<EventObject>> = new Subject();
  headers = {'content-type': 'application/json'};
  port = isDevMode()? 'http://localhost:3000' : '';

  getAllEvents() {
    return this.allEvents$.asObservable();
  };

  getAddressCoordinates(street: string, city: string, state: string) {
    return this.http.post<any>(this.port + '/api/getAddressCoordinates', {'street': street, 'city': city, 'state': state}, {'headers': this.headers});
  };

  getFilteredEvents() {
    return this.filteredEvents$.asObservable();
  }

  postNewEvent(contactObject:ContactInfo, eventObject:EventObject): Observable<any> {
    const newEvent =  {
      title: eventObject.title,
      date: eventObject.date,
      description: eventObject.description,
      eventUrl: eventObject.imageURL,
      imageURL: eventObject.imageURL,
      properties: eventObject.properties,
      address: eventObject.address,
      contactInfo: eventObject.contactInfo
    }
    const newEventObject = JSON.stringify(newEvent);
    return this.http.post<any>(this.port + '/api/postNewEvent', newEvent, {'headers':this.headers})
  };

  updateAllEvents() {
    this.http.get<Array<EventObject>>(this.port + '/api/getAllEvents').subscribe(results => {
      this.allEvents$.next(results as Array<EventObject>);
    });
  };

  updateFilteredEvents(searchString:string, filters:FilterObject) {
    this.http.post(this.port + '/api/getFilteredEvents', {searchString, filters}, {'headers': this.headers}).subscribe(results => {
      this.filteredEvents$.next(results as Array<EventObject>);
    });
  };
}
