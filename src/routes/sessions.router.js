import { Router } from "express";
import { userModel } from "../dao/models/userModel.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    }

    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
    };
    await userModel.create(user);
    return res.send({ status: "sucess", message: "user registered" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  let rol = null;
  let first_name = "";
  let last_name = "";
  let age;
  let email = "";
  let password = "";
  let user = { first_name, last_name, age, email, password };
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      console.log("object");
      rol = "admin";
    }
    user = await userModel.findOne({ email, password });
    if (user) {
      rol = "user";
      console.log(user);
      first_name = user.first_name;
      last_name = user.last_name;
      age = user.age;
    }

    if (!rol) {
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect credentials" });
    } else {
      req.session.user = {
        name: `${first_name} ${last_name}`,
        email: email,
        age: age,
        rol: rol,
      };

      res.send({
        status: "sucess",
        message: "Logged In",
        payload: req.session.user,
      });
    }
  } catch (error) {
    console.log(error);
  }
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
