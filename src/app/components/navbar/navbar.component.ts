import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'umberto46-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center m-2" routerLink="/">
          <span class="fw-bold ">🍕 Pizzeria Codice & Basilico</span>
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
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
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
            <li class="nav-item">
              <a
                class="nav-link position-relative"
                routerLink="/carrello"
                routerLinkActive="active"
              >
                Carrello
                <span
                  *ngIf="cartItemCount$ | async as count"
                  class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                  [class.d-none]="count === 0"
                >
                  {{ count }}
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
export class NavbarComponent implements OnInit {
  cartItemCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemCount$ = this.cartService.cartItems$.pipe(
      map((items) => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }
}
