import { cartService } from "../services/carts.service.js";
import { responder } from "../traits/Responder.js";

export async function getCarts(req, res) {
  try {
    const carts = await cartService.getCarts();
    if (carts && carts.error) {
      return responder.errorResponse(res, carts.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function getCartsById(req, res) {
  try {
    const cid = req.params.cid;
    const products = await cartService.getCartById(cid);
    if (products && products.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, products);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function createCart(req, res) {
  try {
    const carts = await cartService.createCart();
    if (carts && carts.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function addProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const { quantity } = req.body;

    const carts = await cartService.addProductInCart(cid, pid, quantity);
    if (carts && carts.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function deleteCart(req, res) {
  try {
    const cid = req.params.cid;

    const carts = await cartService.deleteCart(cid);
    if (carts && carts.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function deleteProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const carts = await cartService.deleteProductInCart(cid, pid);
    if (carts && carts.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function updateProductInCart(req, res) {
  try {
    const cid = req.params.cid;

    const productsElements = req.body;

    const carts = await cartService.updateProductInCart(cid, productsElements);
    if (carts && carts.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function updateQuantityProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const { quantity } = req.body;

    const carts = await cartService.updateQuantityProductInCart(
      cid,
      pid,
      quantity
    );
    if (carts && carts.error) {
      return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}
