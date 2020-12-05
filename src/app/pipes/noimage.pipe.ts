import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
})
export class NoimagePipe implements PipeTransform {
  transform(imagenURL: string): string {
    if (!imagenURL) {
      return 'assets/img/noimage.png';
    }

    return imagenURL;

    // return null;
  }
}
