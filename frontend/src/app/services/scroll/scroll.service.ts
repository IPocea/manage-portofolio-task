import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}
  scrollTo(id: string): void {
    const screenWidth: number = window.screen.availWidth;
    if (screenWidth < 819) {
      setTimeout(() => {
        document.getElementById(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 500);
    }
  }
  scrollToIgnoreWidth(id: string): void {
    setTimeout(() => {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 500);
  }
}
