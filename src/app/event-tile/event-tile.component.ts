import { Component, OnInit, Input } from '@angular/core';
import { EventObject } from '../services/interfaces';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent implements OnInit {

  @Input() tileData:EventObject = {} as EventObject;

  constructor() { }

  ngOnInit(): void {
  }

}
