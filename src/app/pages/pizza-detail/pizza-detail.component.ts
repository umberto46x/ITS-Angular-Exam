import { CommonModule, Location } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pizza, PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'umberto46-pizza-detail',
  imports: [CommonModule,RouterLink],
  template: `
 <div class="container py-4">
  <div *ngIf="pizza; else notFound" class="card shadow-lg rounded-4">
    <div class="row g-0">
      <div class="col-md-6">
        <img [src]="pizza.image" [alt]="pizza.name" class="img-fluid rounded-start-4 detail-img">
      </div>
      <div class="col-md-6 d-flex flex-column p-4">
        <h1 class="card-title display-4 fw-bold text-primary mb-3">{{ pizza.name }}</h1>
        <p class="lead text-muted flex-grow-1">{{ pizza.description || 'Nessuna descrizione disponibile per questa deliziosa pizza. È fatta con i migliori ingredienti freschi!' }}</p>
        <h3 class="text-success fs-2 mb-4">{{ pizza.price | currency:'EUR' }}</h3>

        <div class="d-flex align-items-center mb-4">
          <div class="input-group w-auto me-4">
            <button class="btn btn-outline-secondary rounded-start-pill px-3" type="button" (click)="decrementQuantity()">-</button>
            <input type="text" class="form-control text-center quantity-input" [value]="pizzaQuantity" readonly style="width: 60px;">
            <button class="btn btn-outline-secondary rounded-end-pill px-3" type="button" (click)="incrementQuantity()">+</button>
          </div>
          <button class="btn btn-success btn-lg rounded-pill px-5 py-3 shadow-sm" (click)="addToCart()">
            <i class="bi bi-cart-plus-fill me-2"></i> Aggiungi al Carrello
          </button>
        </div>

        <div class="mt-auto pt-3 border-top">
          <button class="btn btn-outline-primary rounded-pill px-4 py-2" (click)="goBack()">
            <i class="bi bi-arrow-left-circle-fill me-2"></i> Torna al Menu
          </button>
        </div>
      </div>
    </div>
  </div>

  <ng-template #notFound>
    <div class="text-center p-5 card shadow-sm rounded-4 mt-4">
      <div class="display-1 mb-3">❓</div>
      <h3>Ops! Pizza non trovata.</h3>
      <p class="lead text-muted">Sembra che la pizza che stai cercando non sia nel nostro menu.</p>
      <a routerLink="/menu" class="btn btn-primary btn-lg mt-3 rounded-pill px-4 py-2">
        <i class="bi bi-arrow-left-circle-fill me-2"></i> Vai al Menu
      </a>
    </div>
  </ng-template>
</div>
  `,
  styles: ` .detail-img {
    height: 100%;
    object-fit: cover;
  }
  .quantity-input {
    -moz-appearance: textfield;
  }
  .quantity-input::-webkit-outer-spin-button,
  .quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }`
})
export class PizzaDetailComponent implements OnInit {
  pizza: Pizza | undefined;
  pizzaQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const pizzaId = +idParam;
      this.pizzaService.getPizzaById(pizzaId).subscribe(data => {
        this.pizza = data;
      });
    }
  }


  incrementQuantity(): void {
    this.pizzaQuantity++;
  }


  decrementQuantity(): void {
    if (this.pizzaQuantity > 1) {
      this.pizzaQuantity--;
    }
  }


  addToCart(): void {
    if (this.pizza) {
      this.cartService.addToCart(this.pizza, this.pizzaQuantity);
      console.log(`${this.pizza.name} (x${this.pizzaQuantity}) aggiunta al carrello dal dettaglio!`);
      this.pizzaQuantity = 1;

    }
  }


  goBack(): void {
    this.location.back();
  }
}
