import { BreakpointState} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { EventObject } from '../services/interfaces';
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
  exampleData: Array<EventObject> = [] as Array<EventObject>;
  isMobileDisplay:boolean = false;
  mobileToolSelected = 'main';
  newEventTitle = '';
  openNewEventModal:boolean = false;
  searchString:string = '';
  sidePanelIsOpen = true;

  onToggleSidePanel(){
    this.sidePanelIsOpen = !this.sidePanelIsOpen;
  };

  onOpenNewEventModal() {
    this.modalService.toggleModalById("newEventModal");
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

    this.httpService.getAllEvents().subscribe((data)=>{
      this.exampleData = data;
    });

  }

}
