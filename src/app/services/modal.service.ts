import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  toggleModal:Subject<string> = new Subject;

  toggleModalById(modalId:string){
    this.toggleModal.next(modalId);
  };

}
