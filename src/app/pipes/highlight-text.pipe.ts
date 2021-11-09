import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {
  transform(documentText: string, textToHighlight:string): string {
    if(textToHighlight.length < 1){
      console.log(textToHighlight)
      console.log('too short')
      return documentText;
    };

    console.log(textToHighlight)
    const re = new RegExp(textToHighlight, 'gi');
    console.log(re)
    return documentText.replace(re, `<span class="highlightedText">$&</span>`);
  }
}
