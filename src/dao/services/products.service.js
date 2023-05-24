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
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (pid) => {
    try {
      const product = await this.productRepository.getProductById(pid);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const products = await productRepository.addProduct(product);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (pid, updateProduct) => {
    try {
      const products = await productRepository.updateProduct(
        pid,
        updateProduct
      );
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (pid) => {
    try {
      const products = await productRepository.deleteProduct(pid);
      return products;
    } catch (error) {
      console.log(error);
    }
  };
}

export const productService = new ProductService();
