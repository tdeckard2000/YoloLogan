import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ObjectUnsubscribedError } from 'rxjs';
import { EventObject } from '../services/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  exampleData:Array<EventObject> = [
    {
      _id: "4747437a7833748347b78434c",
      title: 'Dogs Splash Pool Day',
      contactEmail: 'tdeckard@notmydog.com',
      contactPhone: '812-360-1234',
      contactName: 'Jack Black',
      date: new Date('November 2 2021 15:30 MST'),
      description: 'Come place your dog in the pool. Dogs love water. Watch them float, watch them sink.',
      eventUrl: 'https://corgiorgy.com/',
      imageURL: '💦',
      properties: ['kidFriendly', 'freeEvent', 'oneTimeEvent', 'dogFriendly'],
      address: {
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
        businessName: 'Logan Community Pool'
      },
    },
    {
      _id: "4747437a7833748347b78434c",
      title: 'Tech Talk - Cyber Security',
      contactEmail: 'techx@mrTech.com',
      contactName: 'Randy Newman',
      contactPhone: '812-360-9945',
      date: new Date('November 19 2021 15:30 MST'),
      description: 'Come watch Ted talk at this weeks Ted Talk. Look, sir.  Look, sir. Mr. Knox, sir. Lets do tricks with bricks and blocks, sir. Lets do tricks with chicks and clocks, sir.',
      eventUrl: 'https://gizmodo.com/',
      imageURL: '🖥️',
      properties: ['adultsOnly', 'paidEvent', 'weeklyEvent'],
      address: {
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
        businessName: ''
      },
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
