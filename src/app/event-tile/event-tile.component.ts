import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../services/http.service';
import { EventObject } from '../services/interfaces';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent implements OnInit {

  @Input() tileData:EventObject = {} as EventObject;
  @Input() searchString:string = 'Pool';

  constructor(private httpService: HttpService, private mainService: MainService) { }

  events:Array<EventObject> = [];

  ngOnInit(): void {
    this.httpService.getAllEvents().subscribe(results=> {
      this.events = results;
    })

    this.httpService.getFilteredEvents().subscribe(results=> {
      this.events = results;
    })

    this.mainService.getSearchString().subscribe(results=> {
      this.searchString = results;
    })
  }

}
