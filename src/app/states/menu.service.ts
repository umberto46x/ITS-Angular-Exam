import { inject, Injectable } from '@angular/core';
import { Pizza, PizzaService } from '../services/pizza.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  pizzaService = inject(PizzaService);
  private menu: Pizza[] | undefined;

  constructor() {
    this.pizzaService.getPizzas().subscribe((data) => {
      this.setMenu(data);
    });
  }


  setMenu(menu: Pizza[]) {
    this.menu = menu;
  }


  getMenu(): Pizza[] | undefined {
    return this.menu;
  }

  getItemById(id: number): Pizza | undefined {

    return this.menu!.find((item) => item.id === id) ?? undefined;
  }

}
