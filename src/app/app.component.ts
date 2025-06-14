import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'umberto46-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `

  <umberto46-navbar />
<main class="container mt-4">
  <router-outlet />
</main>
  `,
  styles: [],
})
export class AppComponent {
   title = 'Pizzeria';
}
