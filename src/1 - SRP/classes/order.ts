import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping-cart';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';

export class Order {
  private _orderStatus: OrderStatus = 'opened';
  private readonly _cart: ShoppingCart;
  private readonly _messaging: Messaging;
  private readonly _persistency: Persistency;

  // Injeção de dependência
  constructor(cart: ShoppingCart, messaging: Messaging, persistency: Persistency) {
    this._cart = cart;
    this._messaging = messaging;
    this._persistency = persistency;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this._cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this._messaging.sendMessage(
      `Seu pedido com total de ${this._cart.total()} foi recebido.`,
    );
    this._persistency.saveOrder();
    this._cart.clear();
  }
}
