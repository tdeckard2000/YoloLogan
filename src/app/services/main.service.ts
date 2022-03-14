import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventObject, FilterObject } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor() { }

  private filterSelections$:Subject<FilterObject> = new Subject;
  private newEventInfo$:Subject<Object> = new Subject;
  private newEventUserInfo$:Subject<Object> = new Subject;
  private mobileToolSelected$ = new BehaviorSubject('main');
  private newEventTitle$:Subject<string> = new Subject();
  private searchString$:BehaviorSubject<string> = new BehaviorSubject('');
  private searchButtonClicked$:Subject<boolean> = new Subject();

  setFilterSelections(filters:FilterObject) {
    this.filterSelections$.next(filters);
  };

  setMobileToolSelected(buttonName:string) {
    this.mobileToolSelected$.next(buttonName);
  };

  setNewEventInfo(newEventInfo:Partial<EventObject>) {
    this.newEventInfo$.next(newEventInfo);
  };

  setNewEventTitle(eventTitle:string) {
    this.newEventTitle$.next(eventTitle);
  };

  setNewEventUserInfo(newEventUserInfo:Object) {
    this.newEventUserInfo$.next(newEventUserInfo);
  };

  setSearchButtonClick() {
    this.searchButtonClicked$.next(true);
  };

  setSearchString(newSearch:string) {
    this.searchString$.next(newSearch);
  };

  //Note: returning Subject asObservable prevents accidental .next() on subject

  getFilterSelections() {
    return this.filterSelections$.asObservable();
  };

  getMobileToolSelected() {
    return this.mobileToolSelected$.asObservable();
  };

  getNewEventInfo() {
    return this.newEventInfo$.asObservable();
  };

  getNewEventTitle() {
    return this.newEventTitle$.asObservable();
  };

  getNewEventUserInfo() {
    return this.newEventUserInfo$.asObservable();
  };

  getSearchButtonClick() {
    return this.searchButtonClicked$.asObservable();
  };

  getSearchString() {
    return this.searchString$.asObservable();
  };
}
