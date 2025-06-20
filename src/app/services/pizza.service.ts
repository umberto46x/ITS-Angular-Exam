
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}



@Injectable({
  providedIn: 'root'
})


export class PizzaService {
  private apiUrl = 'https://my-json-server.typicode.com/zoelounge/menupizza/cards';
  http = inject(HttpClient);

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);

  }

}
