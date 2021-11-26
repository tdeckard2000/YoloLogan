import { BreakpointObserver } from '@angular/cdk/layout'
import { Injectable } from '@angular/core';
import { PartialObserver } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  constructor(private breakpointObserver:BreakpointObserver) { }

  public isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 500px)']);

  getIsMobile(){
    return this.isSmallScreen$;
  }

}
