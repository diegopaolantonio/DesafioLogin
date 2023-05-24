import { productModel } from "../models/product.model.js";

class ProductRepository {
  constructor() {
    this.productModel = productModel;
  }

  //Funcion para obtener todos los datos del db
  getProducts = async (limit, page, query, sort) => {
    let products;
    try {
      if (!limit) {
        limit = 10;
      }
      if (!page) {
        page = 1;
      }
      if (!sort) {
        if (!query) {
          products = await this.productModel.paginate(
            {},
            { limit: limit, page: page }
          );
        } else {
          if (query === "true" || query === "false") {
            products = await this.productModel.paginate(
              { status: query },
              { limit: limit, page: page }
            );
          } else {
            products = await this.productModel.paginate(
              { category: query },
              { limit: limit, page: page }
            );
          }
        }
      } else {
        if (!query) {
          products = await this.productModel.paginate(
            {},
            { limit: limit, page: page, sort: { price: sort } }
          );
        } else {
          if (query === "true" || query === "false") {
            products = await this.productModel.paginate(
              { status: query },
              { limit: limit, page: page, sort: { price: sort } }
            );
          } else {
            products = await this.productModel.paginate(
              { category: query },
              { limit: limit, page: page, sort: { price: sort } }
            );
          }
        }
      }
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para obtener un product especifico por el id
  getProductById = async (productId) => {
    try {
      const products = await this.productModel.find({ _id: productId });
      if (!products) {
        return "Id not found";
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un product al db
  addProduct = async (product) => {
    if (product.status != false) {
      product.status = true;
    }
    try {
      const createdProduct = await this.productModel.create(product);
      if (!createdProduct) {
        return "Add product error";
      } else {
        return createdProduct;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para actualizar un product por el id en el db
  updateProduct = async (productId, product) => {
    try {
      const updated = await this.productModel.updateOne(
        { _id: productId },
        product
      );
      if (!updated) {
        return "Update product error";
      } else {
        return updated;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para eliminar un product por el id en el db
  deleteProduct = async (productId) => {
    try {
      const eliminado = await this.productModel.deleteOne({ _id: productId });
      if (!eliminado) {
        return "Delete product error";
      } else {
        return eliminado;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const productRepository = new ProductRepository();
