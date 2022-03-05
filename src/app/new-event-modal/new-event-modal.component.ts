import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { EventInfo } from '../services/interfaces';
import { MainService } from '../services/main.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html',
  styleUrls: ['./new-event-modal.component.scss']
})
export class NewEventModalComponent implements OnInit {

  constructor(private modalService:ModalService, private mainService:MainService, private httpService:HttpService) { }

  loadGoogleMapsScriptPromise: Promise<any> = {} as Promise<any>;
  newEventForm = new FormGroup({
    eventAddress: new FormControl('',[Validators.required]),
    eventDate: new FormControl('',[Validators.required]),
    eventDescription: new FormControl('',[Validators.required]),
    eventName: new FormControl('',[Validators.required]),
    eventImage: new FormControl('',[Validators.required]),
    eventTags: new FormGroup({
      tagAlcohol: new FormControl(),
      tagCatFriendly: new FormControl(),
      tagCoffee: new FormControl(),
      tagDogFriendly: new FormControl(),
      tagFreeEvent: new FormControl(),
      tagKidFriendly: new FormControl(),
      tagOutdoorsEvent: new FormControl(),
    }),
    eventWebsite: new FormControl('')
  });
  newEventTitle:string = '';

  getProperties() {
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

    return properties;
  };

  onPostIt(unparsedAddress:string) {
    if(this.newEventForm.valid) {
      this.postNewEvent(unparsedAddress);
    } else {
      console.warn("Form is not valid.")
    }
  };

  async postNewEvent(unparsedAddress:string) {
    const newEventInfoObject = this.prepareEventInfoObject();
    // this.mainService.setNewEventInfo(newEventInfoObject);
    this.modalService.toggleModalById("postAsGuestModal");
  };

  prepareEventInfoObject() {
    const city = 'Bloomington'
    const state = 'Indiana'
    const street = '9201 W Elwren Rd'
    const properties = this.getProperties();
    let test = {}

    this.httpService.getAddressCoordinates(street, city, state).subscribe((data=>{

      const newEventInfoObject:EventInfo = {
        title: this.newEventForm.get('eventName')?.value,
        date: this.newEventForm.get('eventDate')?.value,
        description: this.newEventForm.get('eventDescription')?.value,
        eventUrl: this.newEventForm.get('eventWebsite')?.value,
        imageURL: this.newEventForm.get('eventImage')?.value,
        properties: properties,
        address: {
          coordLat: data.coordLat,
          coordLng: data.coordLng,
          city: city,
          state: state,
          streetNumber: '',
          street: street,
          zip: data.zip
        }
      };
      console.log(newEventInfoObject)
      return newEventInfoObject
    }));
    // return test;
  };

  onToggleNewEventModal() {
    this.modalService.toggleModalById("newEventModal");
  };

  loadGoogleMapsAPI() {
    if(!document.getElementById('mapsAPI')){
      const mapsAPI = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJc-yDaLOZIIjGIdYQgHLAyD2Kz8O-u7U&libraries=places&callback=initAutocomplete";
      let node = document.createElement('script');
      node.id = 'mapsAPI';
      node.type = 'text/javascript';
      node.async = true;
      node.defer = true;
      node.charset = 'utf-8';
      node.src = mapsAPI;
      document.getElementsByTagName('head')[0].appendChild(node);
    };
  };

  loadGoogleMapsScript() {
    if(!document.getElementById('mapsScript')){
      const mapsScript = "function initAutocomplete() {new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});}";
      let node = document.createElement('script');
      node.id = 'mapsScript'
      node.type = 'text/javascript';
      node.async = true;
      node.defer = true;
      node.charset = 'utf-8';
      node.innerHTML = mapsScript;
      document.getElementsByTagName('head')[0].appendChild(node);
    };

    this.loadGoogleMapsAPI();
  };

  ngOnInit(): void {
    this.mainService.getNewEventTitle().subscribe((val:string)=>{
      this.newEventTitle = val;
    });

    this.modalService.toggleModal$.subscribe((val)=>{
      if(val === 'newEventModal') {
        this.loadGoogleMapsScriptPromise = new Promise((resolve) => {
          this.loadGoogleMapsScript();
          resolve(true);
        });
      }
    })
  }
}
