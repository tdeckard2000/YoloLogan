import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-modal-new-event',
  templateUrl: './modal-new-event.component.html',
  styleUrls: ['./modal-new-event.component.scss']
})
export class ModalNewEventComponent implements OnInit {

  constructor(private elementRef: ElementRef, private renderer2:Renderer2) { }

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'display', 'none')
    console.log(this.renderer2)
  }

}
