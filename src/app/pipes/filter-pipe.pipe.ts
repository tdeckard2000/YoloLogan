import { Pipe, PipeTransform } from '@angular/core';
import { EventObject } from '../services/interfaces';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  filteredObjects:Array<EventObject> = [] as Array<EventObject>;

  transform(objectArray: Array<EventObject>, searchString:string): Array<EventObject> {
    if(searchString.length < 2){
      return objectArray;
    };

    searchString = searchString.toLowerCase();
    this.filteredObjects = [] as Array<EventObject>;

    for(let object of objectArray){
      if(object.title.toLowerCase().includes(searchString)){
        this.filteredObjects.push(object);
      }else if(object.description.toLowerCase().includes(searchString)){
        this.filteredObjects.push(object);
      }else if(object.address.businessName.toLowerCase().includes(searchString)){
        this.filteredObjects.push(object);
      }else if(object.contactName.toLowerCase().includes(searchString)){
        this.filteredObjects.push(object);
      };
    };

    return this.filteredObjects;
  }

}
