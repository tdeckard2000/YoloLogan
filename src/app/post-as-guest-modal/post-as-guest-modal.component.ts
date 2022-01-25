import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-post-as-guest-modal',
  templateUrl: './post-as-guest-modal.component.html',
  styleUrls: ['./post-as-guest-modal.component.scss']
})
export class PostAsGuestModalComponent implements OnInit {

  constructor(private modalService:ModalService) { }

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

  }

  onToggleSignInModal() {
    this.modalService.toggleModalById('postAsGuestModal')
    this.modalService.toggleModalById('signInModal')
  }

  ngOnInit(): void {
  }

}
