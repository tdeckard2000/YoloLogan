import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { EventObject } from '../services/interfaces';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(fb: FormBuilder, private httpService:HttpService, private mainService:MainService) {
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
  exampleData = this.httpService.exampleData;
  searchString:string = '';
  sidePanelIsOpen = true;

  onToggleSidePanel(){
    this.sidePanelIsOpen = !this.sidePanelIsOpen;
  };

  ngOnInit(): void {
    this.mainService.getSearchString().subscribe((newSearchString:string)=>{
        this.searchString = newSearchString;
      });
  }

}
