import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainService } from '../services/main.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.scss']
})
export class NewEventModalComponent implements OnInit {

  constructor(private modalService:ModalService, private mainService:MainService) { }

  newEventTitle:string = '';

  newEventForm = new FormGroup({
    eventAddress: new FormControl(),
    eventDate: new FormControl(),
    eventDescription: new FormControl(),
    eventName: new FormControl(),
    eventImage: new FormControl(),
    eventTags: new FormGroup({
      tagAlcohol: new FormControl(),
      tagCatFriendly: new FormControl(),
      tagCoffee: new FormControl(),
      tagDogFriendly: new FormControl(),
      tagFreeEvent: new FormControl(),
      tagKidFriendly: new FormControl(),
      tagOutdoorsEvent: new FormControl(),
    }),
    eventWebsite: new FormControl()
  });

  onPostNewEvent() {
    this.modalService.toggleModalById("postAsGuestModal")
  }

  onToggleNewEventModal() {
    this.modalService.toggleModalById("newEventModal");
  };

  ngOnInit(): void {
    this.mainService.newEventTitle$.subscribe((val:string)=>{
      this.newEventTitle = val;
    })
  }

}
