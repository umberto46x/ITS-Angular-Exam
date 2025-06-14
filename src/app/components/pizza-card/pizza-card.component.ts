import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pizza } from '../../services/pizza.service';

@Component({
  selector: 'umberto46-pizza-card',
  imports: [CommonModule, RouterLink],
  template: `
   <div class="card h-100 text-decoration-none text-dark shadow-sm rounded-4">
  <a [routerLink]="['/pizze', pizzaData.id]">
    <img [src]="pizzaData.image" class="card-img-top rounded-top-4" [alt]="pizzaData.name" style="height: 180px; object-fit: cover;">
  </a>
  <div class="card-body d-flex flex-column">
    <h5 class="card-title text-center mb-2">{{ pizzaData.name }}</h5>
    <p class="card-text text-center text-muted flex-grow-1 small">
     
      {{ pizzaData.description ? (pizzaData.description.length > 70 ? (pizzaData.description | slice:0:70) + '...' : pizzaData.description) : 'Deliziosa pizza artigianale, preparata con ingredienti freschi e di alta qualità.' }}
    </p>
    <div class="d-flex justify-content-between align-items-center mb-3 mt-auto">
      <strong class="text-primary fs-5">{{ pizzaData.price | currency:'EUR' }}</strong>
      <div class="input-group w-auto">
        <button class="btn btn-outline-secondary rounded-start-pill px-3" type="button" (click)="$event.preventDefault(); $event.stopPropagation(); decrementQuantity()">-</button>
        <input type="text" class="form-control text-center quantity-input" [value]="pizzaQuantity" readonly style="width: 50px; border-color: #dee2e6;">
        <button class="btn btn-outline-secondary rounded-end-pill px-3" type="button" (click)="$event.preventDefault(); $event.stopPropagation(); incrementQuantity()">+</button>
      </div>
    </div>
    <button
      class="btn btn-success btn-lg mt-2 w-100 rounded-pill"
      (click)="$event.preventDefault(); $event.stopPropagation(); onAddButtonClick()">
      Aggiungi {{ pizzaQuantity }} al Carrello
    </button>
  </div>
</div>
  `,
  styles: ` .quantity-input {
    -moz-appearance: textfield; /* Firefox */
  }
  .quantity-input::-webkit-outer-spin-button,
  .quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }`
})
export class PizzaCardComponent {
  @Input() pizzaData!: Pizza;

 @Output() addToCartEvent = new EventEmitter<{ pizza: Pizza, quantity: number }>();

 pizzaQuantity: number = 1;

 incrementQuantity(): void {
    this.pizzaQuantity++;
  }

  decrementQuantity(): void {
    if (this.pizzaQuantity > 1) {
      this.pizzaQuantity--;
    }
  }

  onAddButtonClick() {

    this.addToCartEvent.emit({ pizza: this.pizzaData, quantity: this.pizzaQuantity });
    this.pizzaQuantity = 1; 
  }
}
