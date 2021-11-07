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
    }

    this.filteredObjects = [] as Array<EventObject>;

    for(let object of objectArray){
      if(object.title.includes(searchString)){
        this.filteredObjects.push(object);
      }
    }

    console.log(this.filteredObjects)
    return this.filteredObjects;
  }

}
