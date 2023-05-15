import { Router } from "express";
import UserManager from "../dao/dbManagers/userManager.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config.js";

const router = Router();
const userManager = new UserManager();

router.post(
  "/register",
  passport.authenticate("register", { session: false, failureRegister: "/api/sessions/failRegister" }),
  async (req, res) => {
    return res.send({ status: "Success", message: "User registered" });
  }
);

router.get("/failRegister", (req, res) => {
  console.log("Fail register");
  return res.send({ status: "error", error: "Register error" });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userManager.getUser({ email });

  if (!user)
    return res.status(401).send({ status: "error", error: "Unauthorized" });

  if (!isValidPassword(user, password))
    return res.status(401).send({ status: "error", error: "Unauthorized" });

  const jwtUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    cart: user.cart,
    rol: user.rol,
  };

  const token = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "1m" });

  res
    .cookie("jwtCookie", token, { httpOnly: true })
    .send({ status: "Success", message: "Login successful" });
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (!req.user) res.send({ status: "No user logged" });

  res.send({ status: "User logged", payload: req.user });
});

// router.get(
//   "/github",
//   passport.authenticate("githublogin", { scope: ["user:email"] }),
//   (req, res) => {}
// );

// router.get(
//   "/githubcallback",
//   passport.authenticate("githublogin", { failureRedirect: "/login" }),
//   async (req, res) => {
//     req.session.user = req.user;
//     res.redirect("/products");
//   }
// );

router.get("/logout", async (req, res) => {
  return res
    .clearCookie("jwtCookie")
    // .send({ status: "sucess", message: "log out sucessful" })
    .redirect("/login");
});

export default router;
