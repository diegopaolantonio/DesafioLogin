import { cartRepository } from "../repositories/cart.repository.js";

class CartService {
  constructor() {
    this.cartRepository = cartRepository;
  }

  getCarts = async () => {
    try {
      const carts = await this.cartRepository.getCarts();
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (cid) => {
    try {
      const products = await this.cartRepository.getCartById(cid);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  createCart = async () => {
    try {
      const carts = await this.cartRepository.addCart();
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  addProductInCart = async (cid, pid, quantity) => {
    try {
      const carts = await this.cartRepository.updateCart(cid, pid, quantity);
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  deleteCart = async (cid) => {
    try {
      const carts = await this.cartRepository.deleteCart(cid);
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProductInCart = async (cid, pid) => {
    try {
      const carts = await this.cartRepository.deleteCart(cid, pid);
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  updateProductInCart = async (cid, productsElements) => {
    try {
      const carts = await this.cartRepository.modifyCart(cid, productsElements);
      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  updateQuantityProductInCart = async (cid, pid, quantity) => {
    try {
      const carts = await this.cartRepository.modifyProductCart(
        cid,
        pid,
        quantity
      );
      return carts;
    } catch (error) {
      console.log(error);
    }
  };
}

export const cartService = new CartService();
