import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  public login(login: string, password: string, rememberMe: boolean): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`https://${this.settings.host}/api/account/login`, {
      nickname: login,
      password: password,
      rememberMe: rememberMe
    }, {
      withCredentials: true
    })
  }
}


interface ILoginResponse {
  id: string;
  nickname: string;
  email: string;
}