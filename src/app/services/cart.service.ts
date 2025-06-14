
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pizza, CartItem } from './pizza.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private cartItems = new BehaviorSubject<CartItem[]>([]);


  cartItems$ = this.cartItems.asObservable();

  constructor() { }

  addToCart(pizzaToAdd: Pizza, quantity: number = 1) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.pizza.id === pizzaToAdd.id);
     if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ pizza: pizzaToAdd, quantity: quantity });
    }
    this.cartItems.next([...currentItems]);
  }

removeItemFromCart(pizzaId: number) {
    let currentItems = this.cartItems.getValue();
    currentItems = currentItems.filter(item => item.pizza.id !== pizzaId);
    this.cartItems.next([...currentItems]);
  }

updateItemQuantity(pizzaId: number, newQuantity: number) {
    const currentItems = this.cartItems.getValue();
    const itemToUpdate = currentItems.find(item => item.pizza.id === pizzaId);

    if (itemToUpdate) {
      if (newQuantity <= 0) {
        this.removeItemFromCart(pizzaId);
      } else {
        itemToUpdate.quantity = newQuantity;
        this.cartItems.next([...currentItems]); 
      }
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems.getValue();
  }

  clearCart() {
    this.cartItems.next([]);
  }
}