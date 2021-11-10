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

    const re = new RegExp(textToHighlight, 'gi');
    return documentText.replace(re, `<span class="highlightedText">$&</span>`);
  }
}
