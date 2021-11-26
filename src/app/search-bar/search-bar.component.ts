import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MainService } from '../services/main.service';
import { WindowSizeService } from '../services/window-size.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchStringEmitter = new EventEmitter();

  constructor(private mainService:MainService) { }

  searchString = '';
  mobileToolSelected = 'main';

  onMobileToolToggle(buttonName:string){
    if(buttonName === this.mobileToolSelected){
      this.mobileToolSelected = 'main';
      this.mainService.setMobileToolSelected('main');
    }else{
      this.mobileToolSelected = buttonName;
      this.mainService.setMobileToolSelected(buttonName);
    };
  }

  onSearchString(){
    // this.searchStringEmitter.emit(this.searchString);
    this.mainService.setSearchString(this.searchString);
  };


  ngOnInit(): void {

  }

}
