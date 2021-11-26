import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchStringEmitter = new EventEmitter();

  constructor(public mainService:MainService) { }

  searchString = '';

  onMobileToolToggle(buttonName:string){
    this.mainService.setMobileToolSelected(buttonName);
  }

  onSearchString(){
    // this.searchStringEmitter.emit(this.searchString);
    this.mainService.setSearchString(this.searchString);
  };


  ngOnInit(): void {
  }

}
