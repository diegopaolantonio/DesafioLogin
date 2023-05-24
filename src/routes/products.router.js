import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts); // Pedido de todos los productos y con limite
router.get("/:pid", getProductById); // Pedido de un product especifico por el pid (product id)
router.post("/", addProduct); // Agregar un nuevo product
router.put("/:pid", updateProduct); // Actualizar los datos de un product epecifico por el pid (product id)
router.delete("/:pid", deleteProduct); // Eliminar un product especifico por el pid (product id)

export default router;
