import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'umberto46-home',
  imports: [RouterLink],
  template: `
     <div class="p-5 mb-4 bg-light rounded-3 text-center">
  <div class="container-fluid py-5">
    <h1 class="display-5 fw-bold">Benvenuti alla Pizzeria Codice & Basilico!</h1>
    <p class="fs-4">Le migliori pizze, preparate con passione e ingredienti di prima scelta. Scopri il nostro menu e ordina subito le tue preferite.</p>
    <a routerLink="/menu" class="btn btn-primary btn-lg">Vai al Menu</a>
  </div>
</div>
  `,
  styles: ``
})
export class HomeComponent {

}
