import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordSeparator',
})
export class WordSeparatorPipe implements PipeTransform {
  transform(value: string): string {
    const pattern = /[A-Z]/g;
    let newValue: string;
    if (pattern.test(value)) {
      newValue = value.split(/(?=[A-Z])/).join(' ');
      newValue = newValue.slice(0, 1).toUpperCase() + newValue.slice(1);
    } else {
      newValue = value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
    }
    switch (newValue) {
      case 'Img Url':
        return 'Image Url';
      case 'First Name':
        return 'Prenume';
      case 'Last Name':
        return 'Nume';
      case 'Is Visible':
        return 'Visibility';
      default:
        return newValue;
    }
  }
}
