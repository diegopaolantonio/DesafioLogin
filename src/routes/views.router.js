import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";
import MessageManager from "../dao/dbManagers/MessageManager.js";
import { checkLogged, checkLogin, checkRol } from "../middlewares/auth.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();
const messageManager = new MessageManager();

// Llamado a la vista de login
router.get("/login", checkRol, (req, res) => {
  res.render("login");
});

// Llamado a la vista para un nuevo registro
router.get("/register", checkLogged, (req, res) => {
  res.render("register");
});

// Llamado a la vista para hacer login que remplaza la vista que originalmente tenia con products
router.get("/", checkLogin, (req, res) => {
  res.render("profile", { user: req.session.user });
});

// Llamado a la vista de products con querys con Handlebars
router.get("/products", checkLogin, async (req, res) => {
  const { limit, page, query, sort } = req.query;

  const { name, email, age, userLevel } = req.session.user

  const products = await productManager.getProducts(limit, page, query, sort);

  let productsArray = [];
  products.docs.forEach((element, index) => {
    const _id = element._id;
    const title = element.title;
    const description = element.description;
    const price = element.price;
    const code = element.code;
    const stock = element.stock;
    const category = element.category;
    const status = element.status;
    const thumbnail = element.thumbnail;

    productsArray[index] = {
      _id,
      title,
      description,
      price,
      code,
      stock,
      category,
      status,
      thumbnail,
    };
  });
  const { totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = products;
  const actualPage = products.page;
  let prevLink, nextLink;

  if (hasPrevPage) {
    prevLink = `/products?limit=${limit}&page=${prevPage}`;
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
    nextLink = `/products?limit=${limit}&page=${nextPage}`;
    if (query) {
      nextLink += `&query=${query}`;
    }
    if (sort) {
      nextLink += `&sort=${sort}`;
    }
  } else {
    nextLink = null;
  }

  res.render("products", {
    name: name,
    email: email,
    age: age,
    userLevel: userLevel,
    productsArray: productsArray,
    totalPages: totalPages,
    prevPage: prevPage,
    nextPage: nextPage,
    actualPage: actualPage,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
    prevLink: prevLink,
    nextLink: nextLink,
  });
});

// Llamado a la vista de detalles del product
router.get("/product/Detail/:pid", checkLogin, async (req, res) => {
  const pid = req.params.pid;
  let product2;
  const product = await productManager.getProductById(pid);

  product.forEach((element) => {
    product2 = element;
  });
  const {
    _id,
    title,
    description,
    price,
    code,
    stock,
    category,
    status,
    thumbnail,
  } = product2;

  res.render("detail", {
    _id: _id,
    title: title,
    description: description,
    price: price,
    code: code,
    stock: stock,
    category: category,
    status: status,
    thumbnail: thumbnail,
  });
});

// Llamado a la vista de los productos del cart
router.get("/cart/:cid", checkLogin, async (req, res) => {
  const cid = req.params.cid;
  let cartId;
  const { name, email, age, userLevel } = req.session.user

  let cartProducts = [];
  const cart = await cartManager.getCartById(cid);
  cart.forEach((element) => {
    const products = element.products;
    cartId = element._id;
    products.forEach((element, index) => {
      const { product, quantity } = element;
      const {
        _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        status,
        thumbnail,
      } = product;
      cartProducts[index] = {
        _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        status,
        thumbnail,
        quantity,
      };
    });
  });
  res.render("cart", {
    name: name,
    email: email,
    age: age,
    userLevel: userLevel,
    cartId: cartId,
    cartProducts: cartProducts,
    cartId: cartId,
  });
});

// Llamado para agregar el product con id pid en el cart con id cid, con el boton en /products y /products/detail/pid
router.get("/:cid/product/:pid", checkLogin, async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const carts = await cartManager.updateCart(cid, pid);
  if (!carts) {
    return res
      .status(400)
      .send({ status: "error", error: "Add product in cart error" });
  } else {
    return res.redirect("back");
  }
});

// llamado a la vista de messages
router.get("/messages", checkLogin, async (req, res) => {
  const messages = await messageManager.getMessages();
  let messageArray = [];
  messages.forEach((element, index) => {
    const user = element.user;
    const message = element.message;
    messageArray[index] = { user, message };
  });
  res.render("chat", {
    messagesArray: messageArray,
  });
});

// Llamado a la vista con Socket actualizados en tiempo real de products y messages
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/realtimechat", async (req, res) => {
  res.render("realTimeChat", {});
});

export default router;
