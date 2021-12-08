import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapper implements OnInit {

  constructor(private elementRef: ElementRef, private renderer2:Renderer2) { }

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'none')
    console.log(this.renderer2)
  }

}
