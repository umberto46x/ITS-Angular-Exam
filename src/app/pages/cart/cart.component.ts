import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Pizza,CartItem } from '../../services/pizza.service';

@Component({
  selector: 'umberto46-cart',
  imports: [CommonModule,RouterLink],
  template: ` 
   <div class="container py-4">
  <h2 class="text-center mb-4 display-5 fw-bold text-primary">Il tuo Carrello</h2>

  <div *ngIf="(cartItems$ | async) as items; else emptyCart" class="card shadow-lg rounded-4">
    <div *ngIf="items.length > 0; else emptyCart">
      <ul class="list-group list-group-flush border-0">
        <li *ngFor="let item of items" class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center py-3 px-4">
          <div class="d-flex align-items-center mb-3 mb-md-0">
            <img [src]="item.pizza.image" [alt]="item.pizza.name" class="rounded-3 me-3" style="width: 80px; height: 80px; object-fit: cover; border: 1px solid #eee;">
            <div>
              <h5 class="mb-1 fw-bold">{{ item.pizza.name }}</h5>
              <small class="text-muted">{{ item.pizza.price | currency:'EUR' }} ciascuno</small>
            </div>
          </div>
          <div class="d-flex align-items-center flex-wrap justify-content-center">
            <div class="input-group input-group-sm me-3 mb-2 mb-md-0" style="width: 120px;">
              <button class="btn btn-outline-secondary rounded-start-pill" type="button" (click)="decrementQuantity(item)">-</button>
              <input type="text" class="form-control text-center" [value]="item.quantity" readonly>
              <button class="btn btn-outline-secondary rounded-end-pill" type="button" (click)="incrementQuantity(item)">+</button>
            </div>
            <strong class="text-success fs-5 me-3 mb-2 mb-md-0">{{ (item.pizza.price * item.quantity) | currency:'EUR' }}</strong>
            <button class="btn btn-danger btn-sm rounded-pill px-3" (click)="removeItem(item.pizza.id)">
              <i class="bi bi-trash-fill me-1"></i> Rimuovi
            </button>
          </div>
        </li>
      </ul>
      <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-light rounded-bottom-4">
        <h4 class="mb-3 mb-md-0">Totale: <strong class="text-success display-6 fw-bold">{{ total | currency:'EUR' }}</strong></h4>
        <div class="d-flex flex-column flex-md-row align-items-center">
          <button class="btn btn-warning btn-lg rounded-pill px-4 py-3 shadow-sm me-md-3 mb-3 mb-md-0" (click)="openClearCartConfirmModal()">
            <i class="bi bi-x-circle-fill me-2"></i> Svuota Carrello
          </button>
          <button class="btn btn-success btn-lg rounded-pill px-5 py-3 shadow-sm" (click)="checkout()">
            <i class="bi bi-wallet-fill me-2"></i> Acquista Ora
          </button>
        </div>
      </div>
    </div>
  </div>

  <ng-template #emptyCart>
    <div class="text-center p-5 card shadow-sm rounded-4">
      <div class="display-1 mb-3">🛒</div>
      <h3>Il tuo carrello è vuoto!</h3>
      <p class="lead text-muted">Aggiungi alcune delle nostre deliziose pizze per iniziare il tuo ordine.</p>
      <a routerLink="/menu" class="btn btn-primary btn-lg mt-3 rounded-pill px-4 py-2">
        <i class="bi bi-arrow-left-circle-fill me-2"></i> Vai al Menu
      </a>
    </div>
  </ng-template>
</div>


<div class="modal fade" [class.show]="showThankYouModal" [style.display]="showThankYouModal ? 'block' : 'none'" tabindex="-1" role="dialog" aria-labelledby="thankYouModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content rounded-4 shadow-lg border-0">
      <div class="modal-header border-bottom-0 pb-0">
        <h5 class="modal-title fs-5 fw-bold text-primary" id="thankYouModalLabel">🎉 Ordine Confermato!</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="closeThankYouModal()"></button>
      </div>
      <div class="modal-body py-4 text-center">
        <p class="lead">Grazie mille per il tuo acquisto! Il tuo ordine è stato confermato con successo.</p>
        <p>Prepareremo le tue pizze con amore e cura. Torna presto a trovarci!</p>
      </div>
      <div class="modal-footer flex-column border-top-0 pt-0">
        <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2 rounded-pill shadow-sm" (click)="closeThankYouModal()">
          <i class="bi bi-house-door-fill me-2"></i> Torna alla Home
        </button>
      </div>
    </div>
  </div>
</div>

<div class="modal-backdrop fade" [class.show]="showThankYouModal" [style.display]="showThankYouModal ? 'block' : 'none'"></div>



<div class="modal fade" [class.show]="showClearCartConfirmModal" [style.display]="showClearCartConfirmModal ? 'block' : 'none'" tabindex="-1" role="dialog" aria-labelledby="clearCartModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content rounded-4 shadow-lg border-0">
      <div class="modal-header border-bottom-0 pb-0">
        <h5 class="modal-title fs-5 fw-bold text-danger" id="clearCartModalLabel">Attenzione!</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="closeClearCartConfirmModal()"></button>
      </div>
      <div class="modal-body py-4 text-center">
        <p class="lead">Sei sicuro di voler svuotare completamente il carrello?</p>
        <p class="text-muted">Questa azione è irreversibile.</p>
      </div>
      <div class="modal-footer flex-column border-top-0 pt-0">
        <button type="button" class="btn btn-danger w-100 mx-0 mb-2 rounded-pill shadow-sm" (click)="clearCartConfirmed()">
          <i class="bi bi-check-circle-fill me-2"></i> Sì, Svuota Carrello
        </button>
        <button type="button" class="btn btn-outline-secondary w-100 mx-0 rounded-pill" (click)="closeClearCartConfirmModal()">
          <i class="bi bi-x-circle-fill me-2"></i> Annulla
        </button>
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade" [class.show]="showClearCartConfirmModal" [style.display]="showClearCartConfirmModal ? 'block' : 'none'"></div>
`,
  styles: ` .input-group-sm .form-control {
    font-size: 0.875rem; /* Rende il testo più piccolo */
    padding: 0.25rem 0.5rem; /* Riduce il padding */
    height: calc(1.5em + 0.5rem + 2px); /* Aggiusta l'altezza */
  }
  .input-group-sm .btn {
    padding: 0.25rem 0.5rem; /* Riduce il padding dei bottoni */
  }

  input[type="text"] {
    -moz-appearance: textfield; /* Firefox */
  }
  input[type="text"]::-webkit-outer-spin-button,
  input[type="text"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .card-footer {
    background-color: #f8f9fa !important; /* Colore di sfondo leggero */
  }`
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  total: number = 0;
  showThankYouModal: boolean = false;
  showClearCartConfirmModal: boolean = false; 

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartItems$.subscribe(items => {
      this.total = items.reduce((sum, item) => sum + (item.pizza.price * item.quantity), 0);
    });
  }

  incrementQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.pizza.id, item.quantity + 1);
  }

  decrementQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.pizza.id, item.quantity - 1);
  }

  removeItem(pizzaId: number): void {
    this.cartService.removeItemFromCart(pizzaId);
  }

  checkout(): void {
    this.showThankYouModal = true;
  }

  closeThankYouModal(): void {
    this.showThankYouModal = false;
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  
  openClearCartConfirmModal(): void {
    this.showClearCartConfirmModal = true;
  }

  closeClearCartConfirmModal(): void {
    this.showClearCartConfirmModal = false;
  }


  clearCartConfirmed(): void {
    this.cartService.clearCart();
    this.closeClearCartConfirmModal(); // Chiudi la modale dopo aver svuotato
  }
}
