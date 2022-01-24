import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  private mobileToolSelected$ = new BehaviorSubject('main');
  public newEventTitle$:Subject<string> = new Subject();
  private searchString$ = new BehaviorSubject('');

  setMobileToolSelected(buttonName:string){
    this.mobileToolSelected$.next(buttonName);
  };

  setNewEventTitle(eventTitle:string) {
    this.newEventTitle$.next(eventTitle);
  };

  getMobileToolSelected() {
    return this.mobileToolSelected$.asObservable();
  };

  setSearchString(newSearch:string) {
    this.searchString$.next(newSearch);
  };

  getSearchString() {
    return this.searchString$.asObservable();
  };

}
