import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pizza } from '../../models/Pizza';


@Component({
  selector: 'umberto46-pizza-card',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card h-100 text-decoration-none text-dark shadow-sm rounded-4">
      <a [routerLink]="['/pizze', pizzaData.id]">
        <img
          [src]="pizzaData.image"
          class="card-img-top rounded-top-4 object-fit-cover "
          [alt]="pizzaData.name"
          style="height: 240px"
        />
      </a>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-center mb-2 text-danger">
          {{ pizzaData.name }}
        </h5>
        <div
          class="d-flex justify-content-between flex-column gap-4  flex-lg-row align-items-center mb-3 mt-auto"
        >
          <strong class="text-danger fs-5">
            {{ pizzaData.price | currency : 'EUR' }}
          </strong>
          <div class="input-group w-auto ">
            <button
              class="btn btn-success fs-4 rounded-start-pill px-4 px-lg-3"
              type="button"
              (click)="
                $event.preventDefault();
                $event.stopPropagation();
                incrementQuantity()
              "
            >
              +
            </button>
            <input
              type="text"
              class="form-control text-center fs-4 quantity-input "
              [value]="pizzaQuantity"
              readonly
              style="width: 75px; border-color: #dee2e6;"
            />
            <button
              class="btn btn-danger   fs-4 rounded-end-pill px-4 px-lg-3  "
              type="button"
              (click)="
                $event.preventDefault();
                $event.stopPropagation();
                decrementQuantity()
              "
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class PizzaCardComponent {
  @Input() pizzaData!: Pizza;
  @Input() pizzaQuantity!: number;

  @Output() updateCartEvent = new EventEmitter<{
    pizzaId: number;
    quantity: number;
  }>();
  @Output() addToCartEvent = new EventEmitter<{
    pizza: Pizza;
    quantity: number;
  }>();

  incrementQuantity() {
    if (this.pizzaQuantity){
      this.updateCartEvent.emit({
        pizzaId: this.pizzaData.id,
        quantity: this.pizzaQuantity + 1,
      });
    }else{
      this.addToCartEvent.emit({pizza: this.pizzaData, quantity: 1});
    }

  }

  decrementQuantity() {
    if (this.pizzaQuantity) {
      this.updateCartEvent.emit({
        pizzaId: this.pizzaData.id,
        quantity: this.pizzaQuantity - 1,
      });
    }
  }
}
