import { Injectable, isDevMode} from '@angular/core';
import { EventObject } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators'

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
    return this.http.post<any>(this.port + '/api/getAddressCoordinates', {'street': street, 'city': city, 'state': state}, {'headers':this.headers});
  };

  postNewEvent(eventObject:EventObject): Observable<any> {
    const eventObjectStringify = JSON.stringify(eventObject);
    return this.http.post<any>(this.port + '/api/postNewEvent', eventObjectStringify, {'headers':this.headers})
  };

}
