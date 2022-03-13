import { BreakpointState} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
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

  filterResults(searchString: string, filters: FilterObject) {
    this.httpService.getFilteredEvents(searchString, filters).subscribe((data)=>{
      this.events = data;
    });
  }

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
        const filters = {
          kidFriendly: false,
          adultsOnly: true,
          freeEvent: true,
          paidEvent: false,
          oneTimeEvent: false,
          weeklyEvent: false,
          monthlyEvent: false,
          dogFriendly: true,
          catFriendly: true,
          coffee: true,
          noCoffee: false,
          alcohol: false,
          noAlcohol: false,
          outdoors: true,
          indoors: true
        };
        this.filterResults(this.searchString, filters);
      }
    });

    this.httpService.getAllEvents().subscribe((result: Array<EventObject>)=>{
      this.events = result;
    });

  }

}
