import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventObject } from '../services/interfaces';
import { MainService } from '../services/main.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.scss']
})
export class NewEventModalComponent implements OnInit {

  constructor(private modalService:ModalService, private mainService:MainService) {
    this.loadGoogleMapsScriptPromise = new Promise((resolve) => {
      this.loadGoogleMapsScript();
      resolve(true);
    });
  }

  loadGoogleMapsScriptPromise: Promise<any> = {} as Promise<any>;
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

  createNewEventInfoObject() {
    let address = {
      coordLat: 1,
      coordLng: 2,
      city: 'sr',
      state: 'st',
      street: 'sr',
      zip: 'st',
    };

    const form = this.newEventForm;
    let properties:Array<string> = [];

    if(form.get('eventTags')?.get('tagAlcohol')?.value) {
      properties.push('alcohol');
    };

    if(form.get('eventTags')?.get('tagCatFriendly')?.value) {
      properties.push('catFriendly');
    };

    if(form.get('eventTags')?.get('tagCoffee')?.value) {
      properties.push('coffee');
    };

    if(form.get('eventTags')?.get('tagDogFriendly')?.value) {
      properties.push('dogFriendly');
    };

    if(form.get('eventTags')?.get('tagFreeEvent')?.value) {
      properties.push('freeEvent');
    };

    if(form.get('eventTags')?.get('tagKidFriendly')?.value) {
      properties.push('kidFriendly');
    };

    if(form.get('eventTags')?.get('tagOutdoorsEvent')?.value) {
      properties.push('outdoors');
    };

    const newEventInfoObject:Partial<EventObject> = {
      title: form.get('eventName')?.value,
      date: form.get('eventDate')?.value,
      description: form.get('eventDescription')?.value,
      eventUrl: form.get('eventWebsite')?.value,
      imageURL: form.get('eventImage')?.value,
      properties: properties,
      address: address
    };

    console.log(form.get('eventTags')?.get('tagFreeEvent')?.value)
    return newEventInfoObject;
  };

  onPostNewEvent() {
    const newEventInfoObject = this.createNewEventInfoObject();
    this.mainService.setNewEventInfo(newEventInfoObject);
    this.modalService.toggleModalById("postAsGuestModal");
  };

  onToggleNewEventModal() {
    this.modalService.toggleModalById("newEventModal");
  };

  loadGoogleMapsScript() {
    const mapsAPIScript = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJc-yDaLOZIIjGIdYQgHLAyD2Kz8O-u7U&libraries=places&callback=initAutocomplete";
    let node = document.createElement('script');
    node.type = 'text/javascript';
    node.async = true;
    node.defer = true;
    node.charset = 'utf-8';
    node.innerHTML = "initAutocomplete = function(){console.log('AUTO')}"
    node.src = mapsAPIScript;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
    this.mainService.getNewEventTitle().subscribe((val:string)=>{
      this.newEventTitle = val;
    });
  }

}
