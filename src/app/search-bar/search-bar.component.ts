import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { MainService } from '../services/main.service';
import { WindowSizeService } from '../services/window-size.service';
import { FilterObject } from '../services/interfaces';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchStringEmitter = new EventEmitter();

  constructor(private mainService: MainService, private windowSize: WindowSizeService, private elementRef: ElementRef) { }

  activeMobileSearchIcon = false;
  fakeInput = document.createElement('input');
  isMobileDisplay: boolean = false;
  mobileToolSelected = 'main';
  searchString = '';
  showSearchBarOnMobile = false;
  someFilterApplied = false;

  onSearchClick() {
    this.mainService.setSearchButtonClick();
    if (this.searchString.length > 0) {
      this.activeMobileSearchIcon = true;
    } else {
      this.activeMobileSearchIcon = false;
    }
  };

  onMobileToolToggle(buttonName: string) {
    if (buttonName === this.mobileToolSelected) {
      this.mobileToolSelected = 'main';
      this.mainService.setMobileToolSelected('main');
    } else {
      this.mobileToolSelected = buttonName;
      this.mainService.setMobileToolSelected(buttonName);
    };
  }

  onSearchString() {
    this.mainService.setSearchString(this.searchString);
    if (this.searchString === "") {
      setTimeout(() => {
        if (this.searchString === "") {
          this.onSearchClick();
        }
      }, 500);
    };
  };

  onShowSearchBar() {
    this.showSearchBarOnMobile = !this.showSearchBarOnMobile;
    this.openIOSKeyboard();
  };

  openIOSKeyboard() {
    if (this.showSearchBarOnMobile === true) {
      this.fakeInput.setAttribute('type', 'text');
      this.fakeInput.style.position = 'absolute';
      this.fakeInput.style.opacity = "0";
      document.body.prepend(this.fakeInput);
      this.fakeInput.focus();
      setTimeout(() => {
        let searchBarInput = document.getElementById('searchBar');
        searchBarInput?.focus();
        this.fakeInput.remove();
      }, 1);
    };
  };

  toggleFilterIconColor(filterObject: FilterObject) {
    const filterBooleanArray = Object.values(filterObject);
    if (filterBooleanArray.includes(true)) {
      this.someFilterApplied = true;
    } else {
      this.someFilterApplied = false;
    }
  }

  ngOnInit(): void {
    this.windowSize.getIsMobile().subscribe((result: boolean) => {
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
