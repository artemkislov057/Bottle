import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public get host(): string {
    if (environment.production) {
      return 'bottle.somee.com';
    }
    return 'localhost:44358'
  }
}
