import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PizzaCardComponent } from '../../components/pizza-card/pizza-card.component';
import { CartService } from '../../services/cart.service';
import { Pizza, PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'umberto46-menu',
  imports: [CommonModule, PizzaCardComponent],
  template: `
    <h2 class="text-center mb-4 display-5 fw-bold text-success">
      Menu
    </h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 container mx-auto ">
      <div class="col" *ngFor="let pizza of pizzas">
        <umberto46-pizza-card
          [pizzaData]="pizza"
          (addToCartEvent)="onAddToCart($event)"
        ></umberto46-pizza-card>
      </div>
    </div>
  `,
  styles: ``,
})
export class MenuComponent implements OnInit {
  pizzas: Pizza[] = [];

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe((data) => {
      this.pizzas = data;
    });
  }

  onAddToCart(event: { pizza: Pizza; quantity: number }) {
    this.cartService.addToCart(event.pizza, event.quantity);
  }
}
