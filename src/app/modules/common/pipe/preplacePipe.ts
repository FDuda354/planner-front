import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, stringToReplace: string, replacementStr: string): any {
    if (!value || !stringToReplace || !replacementStr) return value;

    return value.replace(new RegExp(stringToReplace, 'g'), replacementStr);
  }
}
