import { Router } from "express";
import {
  getCarts,
  getCartsById,
  createCart,
  addProductInCart,
  deleteCart,
  deleteProductInCart,
  updateProductInCart,
  updateQuantityProductInCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getCarts); // Pedido de el archivo completo de carts
router.get("/:cid", getCartsById); // Pedido de un cart especifico por el cid (cart id)
router.post("/", createCart); // Crear un nuevo cart
router.post("/:cid/product/:pid", addProductInCart); // Agergar un nuevo producto pid (product id) a un cart cid (cart id)
router.delete("/:cid", deleteCart); // Llamado para eliminar todos los produscts de un cart con id cid
router.delete("/:cid/products/:pid", deleteProductInCart); // Llamado para eliminar un product con id pid de un cart con id cid
router.put("/:cid", updateProductInCart); // Llamado para actualizas un cart con id cid mediante un el cuerpo del llamado
router.put("/:cid/products/:pid", updateQuantityProductInCart); // Llamado para actualizas el quantity de un product de un cart con id cid mediante un el cuerpo del llamado

export default router;
