import { Component, ChangeDetectionStrategy, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'umberto46-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <span class="fw-bold fs-3">🍕 Pizzeria Codice e Basilico</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5 fs-4 fw-bold">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/menu" routerLinkActive="active"
                >Menu</a
              >
            </li>
            <li class="nav-item ">
              <a
                class="nav-link position-relative "
                routerLink="/carrello"
                routerLinkActive="active"
              >
                Carrello
                <i class="bi bi-cart"></i>

                <span
                  *ngIf="cartItemCount()"
                  class="badge bg-danger rounded-pill position-absolute top-45 start-95 translate-middle"
                  [class.d-none]="cartItemCount() === 0"
                >
                  {{ cartItemCount() }}
                  <span class="visually-hidden">articoli nel carrello</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {
  cartItemCount: Signal<number>;

  constructor(private cartService: CartService) {
    this.cartItemCount = this.cartService.cartItemCount;
  }
}
