import { productRepository } from "../repositories/product.repository.js";

class ProductService {
  constructor() {
    this.productRepository = productRepository;
  }

  getProducts = async (limit, page, query, sort) => {
    try {
      const products = await this.productRepository.getProducts(
        limit,
        page,
        query,
        sort
      );
      if(!products) {
        return { error: "Get products collection error" };
      }
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };

  getProductById = async (pid) => {
    try {
      const product = await this.productRepository.getProductById(pid);
      if(!product) {
        return { error: "Id not found" };
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (product) => {
    try {
      const products = await productRepository.addProduct(product);
      if(!products) {
        return { error: "Add product error" };
      }
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProduct = async (pid, updateProduct) => {
    try {
      const products = await productRepository.updateProduct(
        pid,
        updateProduct
      );
      if(!products) {
        return { error: "Update product error" };
      }
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteProduct = async (pid) => {
    try {
      const products = await productRepository.deleteProduct(pid);
      if(!products) {
        return { error: "Delete product error" };
      }
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const productService = new ProductService();
