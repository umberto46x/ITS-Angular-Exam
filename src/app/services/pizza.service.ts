
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  getPizzaById(id: number): Observable<Pizza | undefined> {
    return this.getPizzas().pipe(
      map(pizzas => pizzas.find(p => p.id === id))
    );
  }
}
