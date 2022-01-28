import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor() { }

  private newEventInfo$:Subject<Object> = new Subject;
  private newEventUserInfo$:Subject<Object> = new Subject;
  private mobileToolSelected$ = new BehaviorSubject('main');
  private newEventTitle$:Subject<string> = new Subject();
  private searchString$:BehaviorSubject<string> = new BehaviorSubject('');

  setMobileToolSelected(buttonName:string){
    this.mobileToolSelected$.next(buttonName);
  };

  setNewEventInfo(newEventInfo:Object) {
    this.newEventInfo$.next(newEventInfo);
  };

  setNewEventTitle(eventTitle:string) {
    this.newEventTitle$.next(eventTitle);
  };

  setNewEventUserInfo(newEventUserInfo:Object) {
    this.newEventUserInfo$.next(newEventUserInfo);
  };

  setSearchString(newSearch:string) {
    this.searchString$.next(newSearch);
  };

  //Note: returning Subject asObservable prevents accidental .next() on subject

  getMobileToolSelected() {
    return this.mobileToolSelected$.asObservable();
  };

  getNewEventInfo() {
    return this.newEventInfo$.asObservable();
  };

  getNewEventTitle() {
    return this.newEventTitle$.asObservable();
  }

  getNewEventUserInfo() {
    return this.newEventUserInfo$.asObservable();
  }

  getSearchString() {
    return this.searchString$.asObservable();
  };

}
