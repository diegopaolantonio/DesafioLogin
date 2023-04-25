import { Router } from "express";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// Pedido de todos los productos y con limite
router.get("/", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  const products = await productManager.getProducts(limit, page, query, sort);

  if (!products) {
    return res
      .status(400)
      .send({ status: "Error", error: "Get products error" });
  } else {
    const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } =
      products;
    const actualPage = products.page;
    let prevLink, nextLink;

    if (hasPrevPage) {
      prevLink = `/api/products?limit=${limit}&page=${prevPage}`;
      if (query) {
        prevLink += `&query=${query}`;
      }
      if (sort) {
        prevLink += `&sort=${sort}`;
      }
    } else {
      prevLink = null;
    }
    if (hasNextPage) {
      nextLink = `/api/products?limit=${limit}&page=${nextPage}`;
      if (query) {
        nextLink += `&query=${query}`;
      }
      if (sort) {
        nextLink += `&sort=${sort}`;
      }
    } else {
      nextLink = null;
    }
    const products2 = {
      docs,
      totalPages,
      prevPage,
      nextPage,
      actualPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };
    return res.send({ status: "Success", payload: products2 });
  }
});

// Pedido de un product especifico por el pid (product id)
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductById(pid);
  if (!product) {
    return res.status(400).send({ status: "error", error: "Id not found" });
  } else {
    return res.send(product);
  }
});

// Agregar un nuevo product
router.post("/", async (req, res) => {
  const product = req.body;
  const products = await productManager.addProduct(product);
  if (!products) {
    return res
      .status(400)
      .send({ status: "error", error: "Add product error" });
  } else {
    return res.send({ products });
  }
});

// Actualizar los datos de un product epecifico por el pid (product id)
router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const updateProduct = req.body;
  const products = await productManager.updateProduct(pid, updateProduct);
  if (!products) {
    return res
      .status(400)
      .send({ status: "error", error: "Update product error" });
  } else {
    return res.send({ products });
  }
});

// Eliminar un product especifico por el pid (product id)
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const products = await productManager.deleteProduct(pid);
  if (!products) {
    return res
      .status(400)
      .send({ status: "error", error: "Delete product error" });
  } else {
    return res.send({ products });
  }
});

export default router;
