import { productService } from "../dao/services/products.service.js";

export async function getProducts(req, res) {
  try {
    const { limit, page, query, sort } = req.query;
    const products = await productService.getProducts(limit, page, query, sort);

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
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(req, res) {
  try {
    const pid = req.params.pid;
    const product = await productService.getProductById(pid);
    if (!product) {
      return res.status(400).send({ status: "error", error: "Id not found" });
    } else {
      return res.send(product);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addProduct(req, res) {
  try {
    const product = req.body;
    const products = await productService.addProduct(product);
    if (!products) {
      return res
        .status(400)
        .send({ status: "error", error: "Add product error" });
    } else {
      return res.send({ products });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(req, res) {
  try {
    const pid = req.params.pid;
    const updateProduct = req.body;
    const products = await productService.updateProduct(pid, updateProduct);
    if (!products) {
      return res
        .status(400)
        .send({ status: "error", error: "Update product error" });
    } else {
      return res.send({ products });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(req, res) {
  try {
    const pid = req.params.pid;
    const products = await productService.deleteProduct(pid);
    if (!products) {
      return res
        .status(400)
        .send({ status: "error", error: "Delete product error" });
    } else {
      return res.send({ products });
    }
  } catch (error) {
    console.log(error);
  }
}
