import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { EventObject, FilterObject } from '../services/interfaces';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  // filteredObjects:Array<EventObject> = [] as Array<EventObject>;
  filterMap = new Map([
    ['alcohol', 'Alcohol'],
    ['adultsOnly', 'Adults Only'],
    ['catFriendly', 'Cat Friendly'],
    ['coffee', 'Coffee'],
    ['dogFriendly', 'Dog Friendly'],
    ['freeEvent', 'Free Event'],
    ['indoors', 'Indoors'],
    ['kidFriendly', 'Kid Friendly'],
    ['monthlyEvent', 'Monthly Event'],
    ['noAlcohol', 'No Alcohol'],
    ['noCoffee', 'No Coffee'],
    ['oneTimeEvent', 'One Time Event'],
    ['outdoors', 'Outdoors'],
    ['paidEvent', 'Paid Event'],
    ['weeklyEvent', 'Weekly Event']
  ]);

  transform(eventArray: Array<EventObject>, searchString:string, checkboxFilters: FilterObject): Array<EventObject> {

    if(searchString.length < 3 && Object.values(checkboxFilters).every((v)=> v === false)){
      return eventArray;
    };

    searchString = searchString.toLowerCase();
    let filteredObjects:Array<EventObject> = [] as Array<EventObject>;
    let listOfEvents = JSON.parse(JSON.stringify(eventArray));

    for(let filter in checkboxFilters){
      const filterIsChecked = checkboxFilters[filter as keyof FilterObject];
      const filterHumanReadable = this.filterMap.get(filter)
      if(filterIsChecked){
        for(let i = 0; i < listOfEvents.length; i++){
          if(!listOfEvents[i].properties.includes(filterHumanReadable as string)){
            listOfEvents.splice(i,1);
            i--
          };
        };
      };
    };

    for(let i = 0; i < listOfEvents.length; i++){
      if(listOfEvents[i].title.toLowerCase().includes(searchString)){
        filteredObjects.push(listOfEvents[i]);
      }else if(listOfEvents[i].description.toLowerCase().includes(searchString)){
        filteredObjects.push(listOfEvents[i]);
      }else if(listOfEvents[i].address.businessName.toLowerCase().includes(searchString)){
        filteredObjects.push(listOfEvents[i]);
      }else if(listOfEvents[i].contactName.toLowerCase().includes(searchString)){
        filteredObjects.push(listOfEvents[i]);
      };
    };

    return filteredObjects;
  };
};
