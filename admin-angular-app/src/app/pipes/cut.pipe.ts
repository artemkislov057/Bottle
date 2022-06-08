import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutPipe implements PipeTransform {

  transform(value: string, start: number, end: number): unknown {
    return value.slice(start, end);
  }
}
