import { Server } from "socket.io";
import { productRepository } from "./repositories/product.repository.js";
import { messageRepository } from "./repositories/message.repository.js";

const socket = {};
let products;
let messages;

socket.connect = function (httpServer) {
  socket.io = new Server(httpServer);

  let { io } = socket;

  //Conexion con el servidor
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    products = await productRepository.getProducts();
    io.emit("printProducts", products);

    messages = await messageRepository.getMessages();
    io.emit("printMessages", messages);

    // Agregar producto
    socket.on("addProduct", async (product) => {
      await productRepository.addProduct(product);
      products = await productRepository.getProducts();
      io.emit("printProducts", products);
    });

    // Eliminar producto
    socket.on("deleteProduct", async (pid) => {
      await productRepository.deleteProduct(pid);
      products = await productRepository.getProducts();
      io.emit("printProducts", products);
    });

    // Actualizar vista products
    socket.on("getProduct", async () => {
      products = await productRepository.getProducts();
      io.emit("printProducts", products);
    });

    // Agregar mensaje
    socket.on("addMessage", async (message) => {
      await messageRepository.addMessage(message);
      messages = await messageRepository.getMessages();
      io.emit("printMessages", messages);
    });

    // Actualizar vista messages
    socket.on("getMessages", async () => {
      messages = await messageRepository.getMessages();
      io.emit("printMessages", messages);
    });
  });
};

export default socket;
