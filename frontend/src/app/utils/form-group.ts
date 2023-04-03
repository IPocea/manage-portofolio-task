import { FormGroup } from '@angular/forms';

export function cleanForm(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((key) => {
    if (
      formGroup.get(key).value &&
      typeof formGroup.get(key).value === 'string'
    ) {
      return formGroup.get(key).setValue(formGroup.get(key).value?.trim());
    }
  });
}

export function getPasswordToolTip(): string {
  return 'The password must contain at least 8 characters, at least one lower case, one upper case, a number and one special character';
}

export function getUsernameToolTip(): string {
  return 'The username must contain at least 6 characters and can letters, numbers, point, hypen and underscore';
}
