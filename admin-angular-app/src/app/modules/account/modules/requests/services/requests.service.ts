import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { RequestItem } from '../components/request-list/request-list.component';

@Injectable()
export class RequestsService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  public getRequests(type: string) : Observable<RequestItem[]> {
    return this.http.get<IRequestData[]>(`https://${this.settings.host}/api/moderator/requests/${type}`, {
      withCredentials: true
    }).pipe(
      map(requests => {
      return requests.map(request => new RequestItem(
          request.id,
          request.data.contactPerson,
          request.data.fullName,
          request.data.identificationNumber,
          request.data.psrn
        ))
    }));
  }

  public getPdf(id: string): Observable<Blob> {
    return this.http.get(`https://${this.settings.host}/api/moderator/requests/${id}/document`, { 
      headers: {
        'Accept': 'application/pdf'
      },
      responseType: 'blob',
      withCredentials: true
    });
  }

  public rejectRequest(id: string, message: string) : Observable<void> {
    return this.http.post<void>(`https://${this.settings.host}/api/moderator/requests/${id}/reject`,{
      value: message
    }, {
      withCredentials: true
    })
  }

  public acceptRequest(id: string) : Observable<void> {
    return this.http.post<void>(`https://${this.settings.host}/api/moderator/requests/${id}/accept`,{}, {
      withCredentials: true
    })
  }
}

interface IRequestData {
  id: string,
  data: {
    fullName: string,
    contactPerson: string,
    email: string,
    phoneNumber: number,
    identificationNumber: number,
    psrn: number
  }
}



