import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapper implements OnInit {

  constructor(private modalService:ModalService, private elementRef:ElementRef) {}

  @Input() closeOnClickOut:boolean = true;
  @Input() modalTitle:string = '';
  @Input() id:string = '';

  modalIsOpen:boolean = false;

  onBackdropClick($event:any){
    const elementClicked = $event.target.getAttribute('class');
    if(elementClicked === "modalBackdrop" && this.closeOnClickOut){
      this.modalIsOpen = false;
    }
  };

  onCloseButton(){
    this.modalIsOpen = false;
  };

  ngOnInit(): void {
    this.modalService.toggleModal$.subscribe((val:string)=>{
      if(val === this.id){
        this.modalIsOpen = !this.modalIsOpen;
      };
    });
  }

}
