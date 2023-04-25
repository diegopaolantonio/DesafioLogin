import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";

const router = Router();
const cartManager = new CartManager();
let carts = [];

// Pedido de el archivo completo de carts
router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Get collection error" });
  } else {
    return res.send({ carts });
  }
});

// Pedido de un cart especifico por el cid (cart id)
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = await cartManager.getCartById(cid);
  if (!products) {
    return res.status(400).send({ status: "error", error: "Id not found" });
  } else {
    return res.send({ products });
  }
});

// Crear un nuevo cart
router.post("/", async (req, res) => {
  const carts = await cartManager.addCart();
  if (!carts) {
    return res.status(400).send({ status: "error", error: "Cart not created" });
  } else {
    return res.send({ carts });
  }
});

// Agergar un nuevo producto pid (product id) a un cart cid (cart id)
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const { quantity } = req.body;

  const carts = await cartManager.updateCart(cid, pid, quantity);
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Add product in cart error" });
  } else {
    return res.send({ carts });
  }
});

// Llamado para eliminar todos los produscts de un cart con id cid
router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const carts = await cartManager.deleteCart(cid);
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Delete product in cart error" });
  } else {
    return res.send({ carts });
  }
});

// Llamado para eliminar un product con id pid de un cart con id cid
router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const carts = await cartManager.deleteCart(cid, pid);
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Delete product in cart error" });
  } else {
    return res.send({ carts });
  }
});

// Llamado para actualizas un cart con id cid mediante un el cuerpo del llamado
router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const productsElements = req.body;

  const carts = await cartManager.modifyCart(cid, productsElements);
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Add product in cart error" });
  } else {
    return res.send({ carts });
  }
});

// Llamado para actualizas el quantity de un product de un cart con id cid mediante un el cuerpo del llamado
router.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const { quantity } = req.body;

  const carts = await cartManager.modifyProductCart(cid, pid, quantity);
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Add product in cart error" });
  } else {
    return res.send({ carts });
  }
});

export default router;
