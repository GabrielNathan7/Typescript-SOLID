import { OrderStatus } from './interfaces/order-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';
import { CustomerOrder } from './interfaces/customer-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'opened';
  private readonly _cart: ShoppingCart;
  private readonly _messaging: Messaging;
  private readonly _persistency: Persistency;
  private readonly _customer: CustomerOrder;

  // Injeção de dependência
  constructor(cart: ShoppingCart, messaging: Messaging, persistency: Persistency, customer: CustomerOrder) {
    this._cart = cart;
    this._messaging = messaging;
    this._persistency = persistency;
    this._customer = customer;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this._cart.isEmpty()) {
      console.log('Your cart is empty!');
    }

    this._orderStatus = 'closed';
    this._messaging.sendMessage(`Your order of ${this._cart.totalWithDiscount()} dolars has been received`);
    this._persistency.saveOrder();
    this._cart.clearCart();
    console.log('Client: ', this._customer.getName(), this._customer.getIDN());
  }
}
