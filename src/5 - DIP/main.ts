/*
Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem
depender de abstrações.
Dependa de abstrações, não de implementações. Ou seja, ao fazer a injeção de
dependência, não injetar a classe diretamente em outra, mas injetar a interface dela.
Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

Classes de baixo nível são classes que executam tarefas (os detalhes).
Classes de alto nível são classes que gerenciam as classes de baixo nível.
*/

/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { NoDiscount } from './classes/interfaces/discount';
import { IndividualCustomer } from './classes/customer';
import { IMessaging } from './services/interfaces/messaging-protocol';

const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const individualCustomer = new IndividualCustomer('Gabriel', 'Fernandes', '129.007.496-89');

class MessagingMock implements IMessaging {
  sendMessage(): void {
    console.log('Message sent by mock');
  }
}
const messagingMock = new MessagingMock();

const order = new Order(shoppingCart, messagingMock, persistency, individualCustomer);
shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lapis', 1.49));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
