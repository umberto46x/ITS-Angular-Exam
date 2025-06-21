
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from '../models/Pizza';





@Injectable({
  providedIn: 'root'
})


export class PizzaService {
  http = inject(HttpClient);

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>('https://my-json-server.typicode.com/zoelounge/menupizza/cards');

  }

}
