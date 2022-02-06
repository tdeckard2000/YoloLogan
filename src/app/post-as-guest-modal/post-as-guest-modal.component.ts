import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { ContactInfo, EventInfo, EventObject } from '../services/interfaces';
import { MainService } from '../services/main.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-post-as-guest-modal',
  templateUrl: './post-as-guest-modal.component.html',
  styleUrls: ['./post-as-guest-modal.component.scss']
})
export class PostAsGuestModalComponent implements OnInit {

  constructor(private modalService:ModalService, private httpService:HttpService, private mainService:MainService) { }

  eventInfoObject:EventInfo = {} as EventInfo;
  postAsGuestForm = new FormGroup({
    hostBusinessName: new FormControl(),
    hostEmail: new FormControl(),
    hostFirstName: new FormControl(),
    hostHideEmail: new FormControl(),
    hostHideName: new FormControl(),
    hostHidePhone: new FormControl(),
    hostLastName: new FormControl,
    hostPhone: new FormControl(),
  });

  onBack() {
    this.modalService.toggleModalById('postAsGuestModal')
  }

  combineEventObjects(contactInfoObject:ContactInfo, eventInfoObject:EventInfo) {
    const eventObject = {
      title: eventInfoObject.title,
      date: eventInfoObject.date,
      description: eventInfoObject.description,
      eventUrl: eventInfoObject.eventUrl,
      imageURL: eventInfoObject.imageURL,
      properties: eventInfoObject.properties,
      address: {
        coordLat: eventInfoObject.address?.coordLat,
        coordLng: eventInfoObject.address?.coordLng,
        city: eventInfoObject.address?.city,
        state: eventInfoObject.address?.state,
        streetNumber: eventInfoObject.address?.streetNumber,
        street: eventInfoObject.address?.street,
        zip: eventInfoObject.address?.zip,
      },
      contactInfo: {
        business: contactInfoObject.business,
        email: contactInfoObject.email,
        phone: contactInfoObject.phone,
        firstName: contactInfoObject.firstName,
        lastName: contactInfoObject.lastName,
        hideEmail: contactInfoObject.hideEmail,
        hidePhone: contactInfoObject.hidePhone,
        hideName: contactInfoObject.hideName
      }
    };
    return eventObject as EventObject;
  };

  onPost() {
    const contactInfoObject = this.prepareContactInfoObject();
    const newEventObject = this.combineEventObjects(contactInfoObject, this.eventInfoObject);

    this.httpService.postNewEvent(newEventObject).subscribe((val:any)=>{
      const successful = val.acknowledged;
      if(successful) {
        this.modalService.toggleModalById('successfulPostModal');
        this.modalService.toggleModalById('postAsGuestModal');
        this.modalService.toggleModalById('newEventModal');
      } else {
        console.warn('Error Posting from Guest Modal')
      };
    });
  };

  onToggleSignInModal() {
    this.modalService.toggleModalById('postAsGuestModal')
    this.modalService.toggleModalById('signInModal')
  };

  prepareContactInfoObject() {
    const contactInfo = {
      business: this.postAsGuestForm.get('hostBusinessName')?.value,
      email: this.postAsGuestForm.get('hostEmail')?.value,
      phone: this.postAsGuestForm.get('hostPhone')?.value,
      firstName: this.postAsGuestForm.get('hostFirstName')?.value,
      lastName: this.postAsGuestForm.get('hostLastName')?.value,
      hideEmail: this.postAsGuestForm.get('hostHideEmail')?.value || false,
      hidePhone: this.postAsGuestForm.get('hostHidePhone')?.value || false,
      hideName: this.postAsGuestForm.get('hostHideName')?.value || false
    };
    return contactInfo;
  };

  ngOnInit(): void {
    this.mainService.getNewEventInfo().subscribe((val)=>{
      this.eventInfoObject = val as EventInfo;
    });
  };

}
