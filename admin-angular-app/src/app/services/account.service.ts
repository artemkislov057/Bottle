import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  public logout() : Observable<void> {
    return this.http.post<void>(`https://${this.settings.host}/api/account/logout`, {}, {
      withCredentials: true
    });
  }

  public isAuthorized(): Observable<IUser> {
    return this.http.get<IUser>(`https://${this.settings.host}/api/account`, {
      withCredentials: true
    })
  }
}

export interface IUser {
  nickname: string
}
