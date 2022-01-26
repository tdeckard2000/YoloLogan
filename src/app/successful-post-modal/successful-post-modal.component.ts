import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-successful-post-modal',
  templateUrl: './successful-post-modal.component.html',
  styleUrls: ['./successful-post-modal.component.scss']
})
export class SuccessfulPostModalComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  onDone(){
    this.modalService.toggleModalById('successfulPostModal');
  };

  ngOnInit(): void {
  }

}
