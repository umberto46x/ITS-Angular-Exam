import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'umberto46-home',
  imports: [RouterLink, CommonModule],
  template: `
    <div class="p-5 mb-4 rounded-3 text-center hero-section">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold text-white mb-3 shadow-text">
          Benvenuti alla Pizzeria Codice & Basilico!
        </h1>
        <p class="fs-4 text-white mb-4 shadow-text">
          Le migliori pizze, preparate con passione e ingredienti di prima
          scelta. Scopri il nostro menu e ordina subito le tue preferite.
        </p>
        <a routerLink="/menu" class="btn btn-success btn-lg custom-btn-glow"
          >Vai al Menu</a
        >
      </div>
    </div>

    <div class="container my-5">
      <h2 class="text-center mb-4 text-success display-6 fw-bold">
        Scopri di più sulla nostra passione
      </h2>
      <div
        id="pizzaCarousel"
        class="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
            <img
              src="fornace.jpg"
              class="d-block w-100 carousel-img"
              alt="[Image of Pizza from the oven]"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5 class="shadow-text">La nostra passione, appena sfornata</h5>
              <p class="shadow-text">Scopri l'autentico sapore italiano.</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img
              src="ingredienti.jpg"
              class="d-block w-100 carousel-img"
              alt="[Image of Fresh ingredients]"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5 class="shadow-text">Solo ingredienti freschi e di qualità</h5>
              <p class="shadow-text">La base di ogni capolavoro.</p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img
              src="pizzaiolo.webp"
              class="d-block w-100 carousel-img"
              alt="[Image of Chef preparing pizza]"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5 class="shadow-text">Maestria e dedizione in ogni pizza</h5>
              <p class="shadow-text">L'arte del pizzaiolo nelle tue mani.</p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#pizzaCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Precedente</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#pizzaCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Successivo</span>
        </button>
      </div>
    </div>
  `,
  styles: `
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images7.alphacoders.com/596/596343.jpg') no-repeat center center;
      background-size: cover;
      color: white;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .hero-section h1, .hero-section p {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
    .custom-btn-glow {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      transition: all 0.3s ease;
    }
    .custom-btn-glow:hover {
      box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.6);
      transform: translateY(-2px);
    }
    .carousel-img {
      max-height: 175px;
      object-fit: cover;
    }
    @media (min-width: 425px) {
      .carousel-img {
      max-height: 250px;

    }
    }
    @media (min-width: 768px) {
      .carousel-img {
      max-height: 300px;

    }
    }
    @media (min-width: 1024px) {
      .carousel-img {
      max-height: 400px;

    }
    }
    @media (min-width: 1440px) {
      .carousel-img {
      max-height: 500px;

    }
    }



    .carousel-caption {
      background: rgba(0, 0, 0, 0.6);
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 2rem;
    }
    .shadow-text {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }`,
})
export class HomeComponent {}
