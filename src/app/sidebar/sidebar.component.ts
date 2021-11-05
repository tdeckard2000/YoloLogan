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
      imageURL: 'assets/images/examplePic1.jpeg',
      properties: ['Kid Friendly', 'Free Event', 'One Time Event', 'Dog Friendly'],
      address: {
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
        businessName: 'Logan Community Pool'
      }
    },
    {
      _id: "4747437a7833748347578434c",
      title: 'Tech Talk - Cyber Security',
      contactEmail: 'techx@mrTech.com',
      contactName: 'Randy Newman',
      contactPhone: '812-360-9945',
      date: new Date('November 19 2021 15:30 MST'),
      description: "Come watch Ted talk at this week's Ted Talk. Look, sir.  Look, sir. Mr. Knox, sir. Lets do tricks with bricks and blocks, sir. Lets do tricks with chicks and clocks, sir. This event is $15 to attend and will last 45 minutes.",
      eventUrl: 'https://gizmodo.com/',
      imageURL: 'assets/images/examplePic2.jpeg',
      properties: ['Adults Only', 'Paid Event', 'Weekly Event'],
      address: {
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
        businessName: ''
      }
    },
    {
      _id: "4747437ae833748347b78434c",
      title: 'Volunteer Day at Zootah!',
      contactEmail: 'zoo@tah.hov',
      contactName: 'Steve Irwin',
      contactPhone: '313.313.3138',
      date: new Date('December 1 2021 15:30 MST'),
      description: 'Come help keep the zoo grounds clean. Grab a shovel and pick a cage! Free lunch included for volunteers.',
      eventUrl: 'https://gizmodo.com/',
      imageURL: 'assets/images/examplePic3.jpg',
      properties: ['Adults Only', 'Paid Event', 'Monthly Event'],
      address: {
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
        businessName: ''
      }
    },
    {
      _id: "4747437a4833748347b78434c",
      title: 'Karaoke Night!',
      contactEmail: 'zoo@tah.hov',
      contactName: 'Marshall B. Mathers',
      contactPhone: '313.313.3138',
      date: new Date('November 18 2021 15:30 MST'),
      description: 'Come join us at the Cache Bar for some fun in the stage lights. No cover fee. Come hang out at the best bar in town!',
      eventUrl: 'https://gizmodo.com/',
      imageURL: 'assets/images/examplePic4.jpg',
      properties: ['Adults Only', 'Free Event', 'Weekly Event'],
      address: {
        city: 'Logan',
        state: 'Utah',
        street: '119 Main St',
        zip: '84321',
        businessName: 'The Cache Bar'
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}