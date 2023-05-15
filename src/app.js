import express from "express";
import handlebars from "express-handlebars";
import socket from "./socket.js";
import database from "./db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import sessionsRouter from "./routes/sessions.router.js";
import messagesRouter from "./routes/messages.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import initializePassport from "./auth/passport.js";

// Inicializacion
const app = express();

// Midlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

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

socket.connect(httpServer);

// Ruteos
app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
