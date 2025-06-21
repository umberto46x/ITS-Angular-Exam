
import {
  Injectable,
  signal,
  computed,
  WritableSignal,
  Signal,
} from '@angular/core';


import { CartItem } from '../models/CartItem';
import { Pizza } from '../models/Pizza';



@Injectable({
  providedIn: 'root',
})


export class CartService {
  private _cartItems: WritableSignal<CartItem[]> = signal([]);
  cartItems: Signal<CartItem[]> = this._cartItems.asReadonly();

  getTotal: Signal<number> = computed(() => {
    return this.cartItems().reduce(
      (sum, item) => sum + item.pizza.price * item.quantity,
      0
    );
  });

  getCartItemCount: Signal<number> = computed(() => {
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
