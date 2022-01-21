import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapper implements OnInit {

  constructor(private elementRef: ElementRef, private renderer2:Renderer2) { }

  @Input() modalTile:string = '';
  @Input() set openModal(val:boolean) {
    this._openModal = val;
    console.log("_openModal: ", this.openModal)
  }
  get openModal():boolean {
    return this._openModal;
  }

  public _openModal: boolean = false;

  onCloseButton(){
    this.openModal = false;
  };

  ngOnInit(): void {
    // this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'absolute')
    console.log("here first")
    // this.showModal = true
  }

}
