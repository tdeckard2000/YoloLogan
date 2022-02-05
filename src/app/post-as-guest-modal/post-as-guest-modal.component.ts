import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { MainService } from '../services/main.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-post-as-guest-modal',
  templateUrl: './post-as-guest-modal.component.html',
  styleUrls: ['./post-as-guest-modal.component.scss']
})
export class PostAsGuestModalComponent implements OnInit {

  constructor(private modalService:ModalService, private httpService:HttpService, private mainService:MainService) { }

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

  onPost() {

    this.httpService.postNewEvent(this.httpService.exampleData[3]).subscribe((val:any)=>{
      const successful = val.acknowledged;
      if(successful) {
        this.modalService.toggleModalById('successfulPostModal');
        this.modalService.toggleModalById('postAsGuestModal');
        this.modalService.toggleModalById('newEventModal');
      } else {
        console.warn('Error Posting from Guest Modal')
      };
    });
  }

  onToggleSignInModal() {
    this.modalService.toggleModalById('postAsGuestModal')
    this.modalService.toggleModalById('signInModal')
  }

  ngOnInit(): void {
    this.mainService.getNewEventInfo().subscribe((val)=>{
    });
  };

}
