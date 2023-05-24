import { cartService } from "../dao/services/carts.service.js";

export async function getCarts(req, res) {
  try {
    const carts = await cartService.getCarts();
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Get collection error" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCartsById(req, res) {
  try {
    const cid = req.params.cid;
    const products = await cartService.getCartById(cid);
    if (!products) {
      return res.status(400).send({ status: "error", error: "Id not found" });
    } else {
      return res.send({ products });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createCart(req, res) {
  try {
    const carts = await cartService.createCart();
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Cart not created" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const { quantity } = req.body;

    const carts = await cartService.addProductInCart(cid, pid, quantity);
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Add product in cart error" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCart(req, res) {
  try {
    const cid = req.params.cid;

    const carts = await cartService.deleteCart(cid);
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Delete product in cart error" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const carts = await cartService.deleteProductInCart(cid, pid);
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Delete product in cart error" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductInCart(req, res) {
  try {
    const cid = req.params.cid;

    const productsElements = req.body;

    const carts = await cartService.updateProductInCart(cid, productsElements);
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Add product in cart error" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
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
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Add product in cart error" });
    } else {
      return res.send({ carts });
    }
  } catch (error) {
    console.log(error);
  }
}
