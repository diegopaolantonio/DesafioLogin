import express from "express";
import handlebars from "express-handlebars";
import socket from "./socket.js";
import database from "./db.js";
import morgan from "morgan";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app = express();

// Midlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));

// Seteo de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Conexion a Database
database.connect();

// Servidor
const httpServer = app.listen(8080, () => {
  console.log(`Server on port 8080`);
});

// Ruteos
app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

socket.connect(httpServer);
