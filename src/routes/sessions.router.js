import { Router } from "express";
import { userModel } from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRegister: "/failRegister" }),
  async (req, res) => {
    return res.send({ status: "Sucsses", message: "User registered" });
  }
);

router.get("/failRegister", (req, res) => {
  console.log("Fail register");
  return res.send({ status: "error", error: "Register error" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRegister: "/failLogin" }),
  async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ status: "error", error: "Unauthorized" });
    }
    console.log(req.user);
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      rol: req.user.rol,
    };
    res.send({ status: "Success", payload: req.user });
  }
);

router.get("/failLogin", (req, res) => {
  res.send({ status: "error", error: "Failed login" });
});

router.get("/github", passport.authenticate("githublogin", {scope:["user:email"]}), (req, res) => {
});

router.get("/githubcallback", passport.authenticate("githublogin", {failureRedirect: "/login"}), async (req,res) => {
  req.session.user = req.user;
  res.redirect("/products");
})

router.get("/logout", async (req, res) => {
  try {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);

      req.session.regenerate(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
