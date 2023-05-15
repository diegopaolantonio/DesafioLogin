import { cartModel } from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";

export default class CartManager {
  constructor() {}

  // Funcion para obtener los datos del db
  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      if (!carts) {
        return "Get cart error";
      } else {
        return carts;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para obtener los datos de un cart especifico por el id
  getCartById = async (cartId) => {
    try {
      const carts = await cartModel
        .find({ _id: cartId })
        .populate("products.product");
      if (!carts) {
        return "Id not found";
      } else {
        return carts;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un cart al db
  addCart = async () => {
    try {
      const created = await cartModel.create({ products: [] });
      if (!created) {
        return "Add cart error";
      } else {
        return created;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un producto por el id al cart indicado por su id
  updateCart = async (cartId, productId, productQuantity) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    let cartProductsArray = [];
    let indexEncontrado = -1;

    if (!productQuantity) {
      productQuantity = 1;
    }

    try {
      const product = await productModel.find({ _id: productId });
      if (!product) {
        return "Id product not found";
      } else {
        cartToUpdated = await cartModel.find({ _id: cartId });
        if (!cartToUpdated) {
          return "Id cart not found";
        } else {
          cartToUpdated.forEach((element, index) => {
            elementsToUpdated = element.products;
            element.products.forEach((element, index) => {
              cartProductsArray[index] = element.product;
            });
          });

          if (cartProductsArray.length === 0) {
            elementsToUpdated = {
              product: productId,
              quantity: productQuantity,
            };
          } else {
            cartProductsArray.forEach((element, index) => {
              if (element.toString() === productId) {
                indexEncontrado = index;
              }
            });
            if (indexEncontrado === -1) {
              const newProduct = {
                product: productId,
                quantity: productQuantity,
              };
              elementsToUpdated.push(newProduct);
            } else {
              elementsToUpdated[indexEncontrado].quantity += productQuantity;
            }
          }

          const updatedCart = await cartModel.updateOne(
            { _id: cartId },
            { products: elementsToUpdated }
          );
          if (!updatedCart) {
            return "Add product in cart error";
          } else {
            return updatedCart;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para modificar los products de un cart especifico
  modifyCart = async (cartId, productsElements) => {
    let cartToModify;

    try {
      cartToModify = await cartModel.find({ _id: cartId });
      if (!cartToModify) {
        return "Id cart not found";
      } else {
        if (!productsElements) {
          return "No elements to update";
        } else {
          const modifyCart = await cartModel.updateOne(
            { _id: cartId },
            { products: productsElements }
          );
          if (!modifyCart) {
            return "Modify cart error";
          } else {
            return modifyCart;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para actualizar el quantity de un product especifico de un cart especifico
  modifyProductCart = async (cartId, productId, quantity) => {
    let cartToModify;
    let elementsToModify = [];
    let cartProductsArray = [];
    let indexEncontrado = -1;

    try {
      cartToModify = await cartModel.find({ _id: cartId });
      if (!cartToModify) {
        return "Id cart not found";
      } else {
        if (productId) {
          if (!quantity) {
            return "No quantity to update";
          } else {
            cartToModify.forEach((element) => {
              elementsToModify = element.products;
              element.products.forEach((element, index) => {
                console.log(element.product);
                cartProductsArray[index] = element.product;
              });
            });
            if (cartProductsArray.length === 0) {
              return "Empty cart";
            } else {
              cartProductsArray.forEach((element, index) => {
                if (element.toString() === productId) {
                  indexEncontrado = index;
                }
              });
              if (indexEncontrado === -1) {
                return "Product not found in cart";
              } else {
                elementsToModify[indexEncontrado].quantity = quantity;
                const modifyCart = await cartModel.updateOne(
                  { _id: cartId },
                  { products: elementsToModify }
                );
                if (!modifyCart) {
                  return "Modify cart error";
                } else {
                  return modifyCart;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para eliminar un product de un cart si el id del product no existe vacia el cart
  deleteCart = async (cartId, productId) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    let updatedProducts = [];

    try {
      cartToUpdated = await cartModel.find({ _id: cartId });
      if (!cartToUpdated) {
        return "Id cart not found";
      } else {
        if (!productId) {
          const updatedCart = await cartModel.updateOne(
            { _id: cartId },
            { products: [] }
          );
          return updatedCart;
        } else {
          cartToUpdated.forEach((element, index) => {
            elementsToUpdated = element.products;
          });

          const updatedProducts = elementsToUpdated.filter(
            (element) => element.product != productId
          );
          const updatedCart = await cartModel.updateOne(
            { _id: cartId },
            { products: updatedProducts }
          );
          if (!updatedCart) {
            return "Delete product in cart error";
          } else {
            return updatedCart;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
