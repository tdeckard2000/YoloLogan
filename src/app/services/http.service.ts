import { Injectable, isDevMode} from '@angular/core';
import { EventObject } from './interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  port = isDevMode()? 'http://localhost:3000' : '';

  getAllEvents(){
    return this.http.get<Array<EventObject>>(this.port + '/api/getAllEvents');
  };

  exampleData:Array<EventObject> = [
    {
      _id: "4747437a7833748347b78434c",
      title: 'Dogs Splash Pool Day',
      businessName: 'Logan Community Pool',
      contactEmail: 'tdeckard@notmydog.com',
      contactPhone: '812-360-1234',
      contactName: 'Jack Black',
      date: new Date('November 2 2021 15:30 MST'),
      description: 'Come place your dog in the pool. Dogs love water. Watch them float, watch them sink.',
      eventUrl: 'https://corgiorgy.com/',
      imageURL: 'assets/images/examplePic1.jpeg',
      properties: ['Kid Friendly', 'Free Event', 'One Time Event', 'Dog Friendly'],
      address: {
        coordLat: -111.870100,
        coordLng: 41.727778,
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
      }
    },
    {
      _id: "4747437a7833748347578434c",
      title: 'Tech Talk - Cyber Security',
      businessName: '',
      contactEmail: 'techx@mrTech.com',
      contactName: 'Randy Newman',
      contactPhone: '812-360-9945',
      date: new Date('November 19 2021 15:30 MST'),
      description: "Come watch Ted talk at this week's Ted Talk. Look, sir.  Look, sir. Mr. Knox, sir. Lets do tricks with bricks and blocks, sir. Lets do tricks with chicks and clocks, sir. This event is $15 to attend and will last 45 minutes.",
      eventUrl: 'https://gizmodo.com/',
      imageURL: 'assets/images/examplePic2.jpeg',
      properties: ['Adults Only', 'Paid Event', 'Weekly Event'],
      address: {
        coordLat: -111.860100,
        coordLng: 41.727778,
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
      }
    },
    {
      _id: "4747437ae833748347b78434c",
      title: 'Volunteer Day at Zootah!',
      businessName: '',
      contactEmail: 'zoo@tah.hov',
      contactName: 'Steve Irwin',
      contactPhone: '313.313.3138',
      date: new Date('December 1 2021 15:30 MST'),
      description: 'Come help keep the zoo grounds clean. Grab a shovel and pick a cage! Free lunch included for volunteers.',
      eventUrl: 'https://gizmodo.com/',
      imageURL: 'assets/images/examplePic3.jpg',
      properties: ['Adults Only', 'Paid Event', 'Monthly Event'],
      address: {
        coordLat: -111.850100,
        coordLng: 41.727778,
        city: 'Logan',
        state: 'Utah',
        street: '650 S 100 E',
        zip: '84321',
      }
    },
    {
      _id: "4747437a4833748347b78434c",
      title: 'Karaoke Night!',
      businessName: 'The Cache Bar',
      contactEmail: 'zoo@tah.hov',
      contactName: 'Marshall B. Mathers',
      contactPhone: '313.313.3138',
      date: new Date('November 18 2021 15:30 MST'),
      description: 'Come join us at the Cache Bar for some fun in the stage lights. No cover fee. Come hang out at the best bar in town!',
      eventUrl: 'https://gizmodo.com/',
      imageURL: 'assets/images/examplePic4.jpg',
      properties: ['Adults Only', 'Free Event', 'Weekly Event', 'Alcohol'],
      address: {
        coordLat: -111.840100,
        coordLng: 41.727778,
        city: 'Logan',
        state: 'Utah',
        street: '119 Main St',
        zip: '84321',
      }
    }
  ];

}
