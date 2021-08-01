

//
// sample from
//   https://www.codegrepper.com/code-examples/javascript/angular+filter+ngfor
//
//   https://long2know.com/2017/04/angular-pipes-filtering-on-multiple-keys/
//
// In your pipe:
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genericCustomfilter',
    pure: false
})
export class GenericCustomFilter implements PipeTransform {
  transform(items: any[], filter: any, matchCriteria?: {[key: string]: string}): any {
    let filterKeys: string[] = Object.keys(filter);
    // match criteria on many components of the object ?
    if (!items || !filter || !filterKeys || !(filterKeys.length > 0)) {
      return items;
    }
    if (matchCriteria && (Object.keys(matchCriteria).length > 0)) {
      // TODO: implement
      throw('please implement');
    } else {
      // match criteria on one component (conventionally the first)
      let filterKey: string = filterKeys[0];
      // filter items array, items which match and return true will be
      // kept, false will be filtered out
      return items.filter((item: any) => {
        const theResult: boolean = item 
          && (item[filterKey] !== "undefined") // beware: necessary in this way when item[filterKey return a boolean false value (example: when it is a boolean type with false value...)]
          && ((Array.isArray(item[filterKey])
            ?
          item[filterKey].indexOf(filter[filterKey]) !== -1
          :
          item[filterKey] === filter[filterKey]
         ));
        return theResult;
      });
    }
  }
}
