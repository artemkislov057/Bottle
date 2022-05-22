import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRequestItem } from '../components/request-list/request-list.component';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor() { }

  public getRequests() : Observable<IRequestItem[]> {
    return of(requests);
  }
}


const requests: IRequestItem[] = [
  { position: 1, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 2, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 3, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
  { position: 4, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 5, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 6, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 7, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
  { position: 8, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 9, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 10, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
  { position: 11, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 12, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 13, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 14, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
  { position: 15, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 16, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 17, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 18, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
  { position: 19, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 20, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 21, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
  { position: 22, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 23, company: 'ООО "Моя оборона"', name: 'Егор Летов', inn: 7727563778, ogrn: 1057749631994},
  { position: 24, company: 'ООО "Пример"', name: 'А.С.Пушкин', inn: 7722263771, ogrn: 1057749631994},
  { position: 25, company: 'ЗАО "РДУ"', name: 'Повелитель зверей', inn: 7727563778, ogrn: 1057749631994},
];
