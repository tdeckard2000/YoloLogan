import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MainService } from '../services/main.service';
import { BreakpointState} from '@angular/cdk/layout';
import { WindowSizeService } from '../services/window-size.service';
import { FilterObject } from '../services/interfaces';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchStringEmitter = new EventEmitter();

  constructor(private mainService:MainService, private windowSize:WindowSizeService) { }

  activeMobileSearchIcon = false;
  isMobileDisplay:boolean = false;
  mobileToolSelected = 'main';
  searchString = '';
  showSearchBarOnMobile = false;
  someFilterApplied = false;

  onSearchClick() {
    this.mainService.setSearchButtonClick();
    if(this.searchString.length > 0) {
      this.activeMobileSearchIcon = true;
    } else {
      this.activeMobileSearchIcon = false;
    }
  };

  onMobileToolToggle(buttonName:string){
    if(buttonName === this.mobileToolSelected){
      this.mobileToolSelected = 'main';
      this.mainService.setMobileToolSelected('main');
    }else{
      this.mobileToolSelected = buttonName;
      this.mainService.setMobileToolSelected(buttonName);
    };
  }

  onSearchString(){
    this.mainService.setSearchString(this.searchString);
    if(this.searchString === "") {
      setTimeout(()=> {
        if(this.searchString === ""){
          this.onSearchClick();
        }
      }, 500);
    };
  };

  onShowSearchBar() {
    this.showSearchBarOnMobile = !this.showSearchBarOnMobile;
  }

  toggleFilterIconColor(filterObject: FilterObject) {
    const filterBooleanArray = Object.values(filterObject);
      if (filterBooleanArray.includes(true)) {
        this.someFilterApplied = true;
      } else {
        this.someFilterApplied = false;
      }
  }

  ngOnInit(): void {
    this.windowSize.getIsMobile().subscribe((result:boolean)=>{
      this.isMobileDisplay = result;
    });
    this.mainService.getFilterSelections().subscribe(results => {
      const filterObject = results;
      this.toggleFilterIconColor(filterObject);
    });
    this.mainService.getMobileToolSelected().subscribe(results => {
      this.mobileToolSelected = results;
    });
  }

}
