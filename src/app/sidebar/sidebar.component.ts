import { BreakpointState} from '@angular/cdk/layout';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Filter } from 'mongodb';
import { filter } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { EventObject, FilterObject } from '../services/interfaces';
import { MainService } from '../services/main.service';
import { ModalService } from '../services/modal.service';
import { WindowSizeService } from '../services/window-size.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(fb: FormBuilder, private httpService:HttpService, private mainService:MainService, private windowSize:WindowSizeService, private modalService:ModalService) {
    this.checkboxFilters = fb.group({
      kidFriendly: false,
      adultsOnly: false,
      freeEvent: false,
      paidEvent: false,
      oneTimeEvent: false,
      weeklyEvent: false,
      monthlyEvent: false,
      dogFriendly: false,
      catFriendly: false,
      coffee: false,
      noCoffee: false,
      alcohol: false,
      noAlcohol: false,
      outdoors: false,
      indoors: false
    });
  };

  checkboxFilters: FormGroup = {} as FormGroup;
  events: Array<EventObject> = [] as Array<EventObject>;
  isMobileDisplay:boolean = false;
  mobileToolSelected = 'main';
  newEventTitle = '';
  openNewEventModal:boolean = false;
  searchString:string = '';
  sidePanelIsOpen = true;

  deselectMobileTool() {
    this.mainService.setMobileToolSelected('main');
  };

  getFilteredEvents(searchString: string, filters: FilterObject) {
    this.httpService.updateFilteredEvents(searchString, filters);
    this.httpService.getFilteredEvents().subscribe(results => {
      this.events = results;
    });
  };

  onToggleSidePanel(){
    this.sidePanelIsOpen = !this.sidePanelIsOpen;
  };

  onToggleNewEventModal() {
    this.modalService.toggleModalById("newEventModal");
    this.mainService.setNewEventTitle(this.newEventTitle)
    this.newEventTitle = "";
  };

  ngOnInit(): void {
    this.mainService.getSearchString().subscribe((result:string)=>{
      this.searchString = result;
    });

    this.mainService.getMobileToolSelected().subscribe((result:string)=>{
      this.mobileToolSelected = result;
    });

    this.windowSize.getIsMobile().subscribe((result:BreakpointState)=>{
      this.isMobileDisplay = result.matches;
    });

    this.mainService.getSearchButtonClick().subscribe((result: boolean)=>{
      if(result) {
        const filters:FilterObject = this.checkboxFilters.getRawValue();
        this.getFilteredEvents(this.searchString, filters);
      }
    });

    this.httpService.updateAllEvents();

    this.httpService.getAllEvents().subscribe(results => {
      this.events = results;
    });

    this.checkboxFilters.valueChanges.subscribe((result)=>{
      if(result) {
        const filterSelections = result;
        this.mainService.setFilterSelections(result);
        this.getFilteredEvents(this.searchString, filterSelections);
      };
    });

  }

}
