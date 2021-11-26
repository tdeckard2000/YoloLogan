import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  private mobileToolSelected$ = new BehaviorSubject('main');
  private searchString = new BehaviorSubject('')

  setMobileToolSelected(buttonName:string){
    this.mobileToolSelected$.next(buttonName);
  };

  getMobileToolSelected(){
    return this.mobileToolSelected$.asObservable();
  };

  setSearchString(newSearch:string){
    this.searchString.next(newSearch);
  };

  getSearchString(){
    return this.searchString.asObservable();
  };

}
