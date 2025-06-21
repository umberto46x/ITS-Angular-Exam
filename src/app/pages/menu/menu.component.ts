import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PizzaCardComponent } from '../../components/pizza-card/pizza-card.component';
import { CartService } from '../../services/cart.service';
import { MenuService } from '../../states/menu.service';

@Component({
  selector: 'umberto46-menu',
  imports: [CommonModule, PizzaCardComponent],
  template: `
    <h2 class="text-center mb-4 display-5 fw-bold text-success">Menu</h2>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 container mx-auto "
    >
      <div class="col" *ngFor="let pizza of menuService.getMenu()">
        <umberto46-pizza-card
          [pizzaData]="pizza"
          [pizzaQuantity]="this.cartService.getCartItemById(pizza.id)?.quantity || 0"
          (updateCartEvent)="
            this.cartService.updateItemQuantity($event.pizzaId,$event.quantity)
          "
          (addToCartEvent)="
            this.cartService.addToCart($event.pizza, $event.quantity)
          "

        ></umberto46-pizza-card>
      </div>
    </div>
  `,
  styles: ``,
})
export class MenuComponent {
  cartService = inject(CartService);
  menuService = inject(MenuService);
}
