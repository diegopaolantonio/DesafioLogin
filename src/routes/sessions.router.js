import { Router } from "express";
import userModel from "../dao/models/userModel.js";
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
  passport.authenticate("login", { failureLogin: "/failLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ status: "error", error: "Unauthorized" });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.send({ status: "Success", payload: req.user });
    // let rol = null;
    // let first_name = "";
    // let last_name = "";
    // let age;
    // let email = "";
    // let password = "";
    // let user = { first_name, last_name, age, email, password };
    // try {
    //   const { email, password } = req.body;
    //   console.log(email);
    //   console.log(password);
    //   if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    //     console.log("object");
    //     rol = "admin";
    //   }
    //   user = await userModel.findOne({ email, password });
    //   if (user) {
    //     rol = "user";
    //     console.log(user);
    //     first_name = user.first_name;
    //     last_name = user.last_name;
    //     age = user.age;
    //   }

    //   if (!rol) {
    //     return res
    //       .status(400)
    //       .send({ status: "error", error: "Incorrect credentials" });
    //   } else {
    //     req.session.user = {
    //       name: `${first_name} ${last_name}`,
    //       email: email,
    //       age: age,
    //       rol: rol,
    //     };

    //     res.send({
    //       status: "sucess",
    //       message: "Logged In",
    //       payload: req.session.user,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
);

router.get("/failLogin", (req, res) => {
  res.send({ status: "error", error: "Failed login" });
});

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
