import { BreakpointObserver } from '@angular/cdk/layout'
import { Injectable } from '@angular/core';
import { PartialObserver, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  constructor(private breakpointObserver:BreakpointObserver) { }

  private isSmallScreen$:Subject<boolean> = new Subject;

  getIsMobile() {
    return this.isSmallScreen$.asObservable();
  };

  setIsMobile() {
    const isSmallScreen:any = this.breakpointObserver.observe(['(max-width: 500px)']).subscribe(result=> {
      if(result.matches === true) {
        this.isSmallScreen$.next(true);
      } else {
        this.isSmallScreen$.next(false);
      };
    });
  };

}
