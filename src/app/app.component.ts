import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'umberto46-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <umberto46-navbar />
    <main class="container mt-4">
      <router-outlet />
      <umberto46-footer />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Pizzeria';
}
