
import {
  Injectable,
  signal,
  computed,
  WritableSignal,
  Signal,
} from '@angular/core';
import { Pizza } from './pizza.service';

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})


export class CartService {
  private _cartItems: WritableSignal<CartItem[]> = signal([]);
  cartItems: Signal<CartItem[]> = this._cartItems.asReadonly();

  total: Signal<number> = computed(() => {
    return this.cartItems().reduce(
      (sum, item) => sum + item.pizza.price * item.quantity,
      0
    );
  });

  cartItemCount: Signal<number> = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });



  addToCart(pizzaToAdd: Pizza, quantity: number = 1) {
    this._cartItems.update((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.pizza.id === pizzaToAdd.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        currentItems.push({ pizza: pizzaToAdd, quantity: quantity });
      }

      return [...currentItems];
    });
  }

  removeItemFromCart(pizzaId: number) {
    this._cartItems.update((currentItems) => {
      return currentItems.filter((item) => item.pizza.id !== pizzaId);
    });
  }

  updateItemQuantity(pizzaId: number, newQuantity: number) {
    this._cartItems.update((currentItems) => {
      const itemToUpdate = currentItems.find(
        (item) => item.pizza.id === pizzaId
      );

      if (itemToUpdate) {
        if (newQuantity <= 0) {
          return currentItems.filter((item) => item.pizza.id !== pizzaId);
        } else {
          itemToUpdate.quantity = newQuantity;
        }
      }
      return [...currentItems];
    });
  }

  clearCart() {
    this._cartItems.set([]);
  }
}
