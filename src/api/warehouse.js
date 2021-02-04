/**
 * Mocking client-server processing
 */
import { inventory } from './inventory.json';
import { products } from './products.json';

const TIMEOUT = 100;

export default {
  getInventory: (cb, timeout) =>
      new Promise(resolve => setTimeout(() => resolve(cb(inventory)), timeout || TIMEOUT)),
  getProducts: (cb, timeout) =>
      new Promise(resolve => setTimeout(() => resolve(cb(products)), timeout || TIMEOUT)),
};
