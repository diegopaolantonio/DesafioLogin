import { cartRepository } from "../repositories/cart.repository.js";

class CartService {
  constructor() {
    this.cartRepository = cartRepository;
  }

  getCarts = async () => {
    try {
      const carts = await this.cartRepository.getCarts();
      if(!carts) {
        return { error: "Carts collection not found" };
    }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  getCartById = async (cid) => {
    try {
      const products = await this.cartRepository.getCartById(cid);
      if(!products) {
        return { error: "Id not found" };
      }
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };

  createCart = async () => {
    try {
      const carts = await this.cartRepository.addCart();
      if(!carts) {
        return { error: "Cart not created" };
      }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductInCart = async (cid, pid, quantity) => {
    try {
      const carts = await this.cartRepository.updateCart(cid, pid, quantity);
      if(!carts) {
        return { error: "Add product in cart error" };
      }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteCart = async (cid) => {
    try {
      const carts = await this.cartRepository.deleteCart(cid);
      if(!carts) {
        return { error: "Delete products in cart error"};
      }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteProductInCart = async (cid, pid) => {
    try {
      const carts = await this.cartRepository.deleteCart(cid, pid);
      if (!carts) {
        return { error: "Delete products in cart error" };
      }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProductInCart = async (cid, productsElements) => {
    try {
      const carts = await this.cartRepository.modifyCart(cid, productsElements);
      if(!carts) {
        return { error: "Update product in cart error" }
      }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateQuantityProductInCart = async (cid, pid, quantity) => {
    try {
      const carts = await this.cartRepository.modifyProductCart(
        cid,
        pid,
        quantity
      );
      if (!carts) {
        return { error: "Update product in cart error" }
      }
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const cartService = new CartService();
