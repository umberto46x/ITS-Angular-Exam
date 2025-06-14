import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { PizzaDetailComponent } from './pages/pizza-detail/pizza-detail.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Pizzeria Codice e Basilico' },
  { path: 'menu', component: MenuComponent, title: 'Il nostro Menu' },
  { path: 'pizze/:id', component: PizzaDetailComponent, title: 'Dettaglio Pizza' },
  { path: 'carrello', component: CartComponent, title: 'Carrello' },
  { path: '**', redirectTo: '', pathMatch: 'full' } ];
