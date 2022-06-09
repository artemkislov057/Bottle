import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public readonly host: string = 'localhost:44358'
}
