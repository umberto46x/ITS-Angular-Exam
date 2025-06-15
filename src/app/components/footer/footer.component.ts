import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'umberto46-footer',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <footer class=" bg-success text-white pt-5 pb-4 mt-5 shadow-lg ">
      <div class="container text-center text-md-start">
        <div class="row text-center text-md-start">
          <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fs-3 text-center fw-bold ">
              <i class="bi bi-pizza me-2"></i>Pizzeria Codice e Basilico
            </h5>
            <p class="text-center">
              La tua pizzeria di fiducia. Ingredienti freschi, passione
              artigianale e la migliore pizza in città! Ordina online e gusta a
              casa.
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fw-bold text-white">Link Utili</h5>
            <p>
              <a
                routerLink="/"
                class="text-white text-decoration-none"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </p>
            <p>
              <a
                routerLink="/menu"
                class="text-white text-decoration-none"
                routerLinkActive="active"
                >Menu</a
              >
            </p>
            <p>
              <a
                routerLink="/carrello"
                class="text-white text-decoration-none"
                routerLinkActive="active"
                >Carrello <i class="bi bi-cart"></i
              ></a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fw-bold text-white">Contatti</h5>
            <p>
              <i class="bi bi-house-door-fill me-3"></i> Via della pizza 27, Napoli
            </p>
            <p>
              <i class="bi bi-envelope-fill me-3"></i>
              info&#64;codicebasilico.it
            </p>
            <p><i class="bi bi-telephone-fill me-3"></i> +39 06 12345678</p>
            <p><i class="bi bi-printer-fill me-3"></i> +39 06 87654321</p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fw-bold text-white">Seguici</h5>
            <div class="d-flex justify-content-center justify-content-md-start">
              <a
                *ngFor="let link of socialLinks"
                [href]="link.url"
                target="_blank"
                class="btn btn-outline-light btn-social me-2 rounded-circle"
              >
                <i [class]="link.iconClass"></i>
              </a>
            </div>
          </div>
        </div>

        <hr class="my-4" />


          <p class="text-center text-white mx-auto">
            © {{ currentYear }} Tutti i diritti riservati da
            <a routerLink="/" class=" text-white text-decoration-none"
              ><strong>Pizzeria Codice e Basilico</strong></a
            >
          </p>

      </div>
    </footer>
  `,
  styles: `.btn-social {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  .btn-social:hover {
    background-color: var(--bs-danger);
    color: var(--bs-light);
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  socialLinks = [
    {
      name: 'Facebook',
      iconClass: 'bi bi-facebook',
      url: 'https://www.facebook.com/Codice+e+Basilico',
    },
    {
      name: 'Instagram',
      iconClass: 'bi bi-instagram',
      url: 'https://www.instagram.com/Codice+e+Basilico',
    },
    {
      name: 'X',
      iconClass: 'bi bi-twitter-x',
      url: 'https://x.com/Codice+e+Basilico',
    },
  ];
}
