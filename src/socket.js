import { Server } from "socket.io";
import ProductManager from "./dao/dbManagers/ProductManager.js";
import MessageManager from "./dao/dbManagers/MessageManager.js";

const socket = {};
const productManager = new ProductManager();
const messageManager = new MessageManager();
let products;
let messages;

socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);

  let { io } = socket;

  //Conexion con el servidor
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    products = await productManager.getProducts();
    io.emit("printProducts", products);

    messages = await messageManager.getMessages();
    io.emit("printMessages", messages);

    // Agregar producto
    socket.on("addProduct", async (product) => {
      await productManager.addProduct(product);
      products = await productManager.getProducts();
      io.emit("printProducts", products);
    });

    // Eliminar producto
    socket.on("deleteProduct", async (pid) => {
      await productManager.deleteProduct(pid);
      products = await productManager.getProducts();
      io.emit("printProducts", products);
    });

    // Actualizar vista products
    socket.on("getProduct", async () => {
      products = await productManager.getProducts();
      io.emit("printProducts", products);
    });

    // Agregar mensaje
    socket.on("addMessage", async (message) => {
      await messageManager.addMessage(message);
      messages = await messageManager.getMessages();
      io.emit("printMessages", messages);
    });

    // Actualizar vista messages
    socket.on("getMessages", async () => {
      messages = await messageManager.getMessages();
      io.emit("printMessages", messages);
    });

    socket.on("logged", async () => {
      products = await productManager.getProducts();
      io.emit("printProducts", products);
    });
  });
};

export default socket;
