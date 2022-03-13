import { Injectable, isDevMode} from '@angular/core';
import { ContactInfo, EventObject, FilterObject } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators'
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  headers = {'content-type': 'application/json'};
  port = isDevMode()? 'http://localhost:3000' : '';

  getAllEvents() {
    return this.http.get<Array<EventObject>>(this.port + '/api/getAllEvents');
  };

  getAddressCoordinates(street: string, city: string, state: string) {
    return this.http.post<any>(this.port + '/api/getAddressCoordinates', {'street': street, 'city': city, 'state': state}, {'headers': this.headers});
  };

  getFilteredEvents(searchString:string, filters:FilterObject) {
    return this.http.post<Array<EventObject>>(this.port + '/api/getFilteredEvents', {searchString, filters}, {'headers': this.headers});
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

}
