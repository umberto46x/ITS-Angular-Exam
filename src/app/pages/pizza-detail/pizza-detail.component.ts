import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pizza, PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'umberto46-pizza-detail',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container py-4 ">
      <div *ngIf="isLoading" class="d-flex justify-content-center pt-5">
        <div
          class="spinner-border text-success"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="visually-hidden">Caricamento...</span>
        </div>
      </div>
      <div *ngIf="!isLoading && pizza" class="card shadow-lg rounded-4 ">
        <div class="row g-0">
          <div class="col-md-6">
            <img
              [src]="pizza.image"
              [alt]="pizza.name"
              class="img-fluid rounded-start-4 detail-img"
            />
          </div>
          <div class="col-md-6 d-flex flex-column p-4">
            <h1
              class="card-title display-4 fw-bold text-danger mb-3 text-center"
            >
              {{ pizza.name }}
            </h1>
            <p class=" fs-4 flex-grow-1 text-center">
              {{
                pizza.description ||
                  'Nessuna descrizione disponibile per questa deliziosa pizza. È fatta con i migliori ingredienti freschi!'
              }}
            </p>
            <h3 class="text-danger fs-2 mb-4 text-center">
              {{ pizza.price | currency : 'EUR' }}
            </h3>

            <div
              class="d-flex align-items-center  justify-content-center mb-4 mx-auto "
            >
              <div
                class=" d-flex justify-content-center flex-column  me-5 w-50 "
              >
                <button
                  class="btn btn-success fs-4 rounded-top-4 p-2   "
                  type="button"
                  (click)="incrementQuantity()"
                >
                  +
                </button>
                <input
                  type="text"
                  class="form-control text-center p-2  "
                  [value]="pizzaQuantity"
                  readonly
                />
                <button
                  class="btn btn-danger fs-4 rounded-bottom-4 p-2  "
                  type="button"
                  (click)="decrementQuantity()"
                >
                  -
                </button>
              </div>
              <button
                class="btn btn-success  rounded-pill p-3 shadow-sm "
                (click)="addToCart()"
              >
                <i class="bi bi-cart-plus-fill me-2"></i> Aggiungi al Carrello
              </button>
            </div>

            <div
              *ngIf="showAddedToCartMessage"
              class="alert alert-success mt-3 w-50  animated-alert text-center position-absolute top-50 end-25 "
              role="alert"
            >
              <i class="bi bi-check-circle-fill me-2"></i> Pizza aggiunta al
              carrello!
            </div>

            <div class="mt-auto pt-3 border-top mx-auto">
              <button
                class="btn btn-danger  rounded-pill px-4 py-2"
                (click)="goBack()"
              >
                <i class="bi bi-arrow-left-circle-fill me-2"></i> Torna al Menu
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        *ngIf="!isLoading && !pizza"
        class="text-center p-5 card shadow-sm rounded-4 mt-4"
      >
        <div class="display-1 mb-3">❓</div>
        <h3 class="text-danger">Ops! Pizza non trovata.</h3>
        <p class="lead text-muted fs-5">
          Sembra che la pizza che stai cercando non sia nel nostro menu.
        </p>
        <a
          routerLink="/menu"
          class="btn btn-success btn-lg mt-3 rounded-pill px-4 py-2"
        >
          <i class="bi bi-arrow-left-circle-fill me-2"></i> Vai al Menu
        </a>
      </div>
    </div>
  `,
  styles: ` .detail-img {
    height: 100%;
    object-fit: cover;
  }


  .animated-alert {
    animation: fadeinout 3s forwards;
  }
  @keyframes fadeinout {
    0% { opacity: 0; transform: translateY(-10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); display: none; }
  }`,
})
export class PizzaDetailComponent implements OnInit {
  pizza: Pizza | undefined;
  pizzaQuantity: number = 1;
  showAddedToCartMessage: boolean = false;
  requestedPizzaId: string | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService,
    private cartService: CartService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.requestedPizzaId = this.route.snapshot.paramMap.get('id');
    if (this.requestedPizzaId) {
      const pizzaId = +this.requestedPizzaId;
      if (isNaN(pizzaId)) {
        console.warn(
          `ID della pizza non valido: ${this.requestedPizzaId}. Deve essere un numero.`
        );
        this.pizza = undefined;
        this.isLoading = false;
        return;
      }

      this.pizzaService.getPizzaById(pizzaId).subscribe(
        (data) => {
          this.pizza = data;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Errore nel recupero della pizza:', error);
          this.pizza = undefined;
          this.isLoading = false;
        }
      );
    } else {
      console.warn('ID della pizza non fornito nella route.');
      this.pizza = undefined;
      this.isLoading = false;
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

      this.showAddedToCartMessage = true;
      setTimeout(() => {
        this.showAddedToCartMessage = false;
      }, 3000);
      this.pizzaQuantity = 1;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
