import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getItem(item: string): object | string {
    const storage: object = JSON.parse(localStorage.getItem('portofolieEntriesTask')) || {};
    return storage[item];
  };
  
  setItem(item: string, newValue: object | string): void {
    const storage: object = JSON.parse(localStorage.getItem('portofolieEntriesTask')) || {};
    storage[item] = newValue;
    const newStorage: string = JSON.stringify(storage);
    localStorage.setItem('portofolieEntriesTask', newStorage);
  };
  
  removeItem(item: string): void {
    const storage: object = JSON.parse(localStorage.getItem('portofolieEntriesTask')) || {};
    delete storage[item];
    const newStorage: string = JSON.stringify(storage);
    localStorage.setItem('portofolieEntriesTask', newStorage);
  };

}
