import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '@interfaces';

@Pipe({
  name: 'userInitials',
})
export class UserInitialsPipe implements PipeTransform {
  transform(user: IUser, ...args: unknown[]): string {
    return (
      user.firstName.slice(0, 1).toUpperCase() +
      user.lastName.slice(0, 1).toUpperCase()
    );
  }
}
