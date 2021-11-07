import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchStringEmitter = new EventEmitter();

  searchString = '';

  onSearchString(){
    this.searchStringEmitter.emit(this.searchString);
  };

  constructor() { }

  ngOnInit(): void {
  }

}
