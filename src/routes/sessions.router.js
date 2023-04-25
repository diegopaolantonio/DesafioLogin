import { Router } from "express";
import { userModel } from "../dao/models/userModel.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, userLevel, password } = req.body;

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
      userLevel,
      password,
    };
    await userModel.create(user);
    return res.send({ status: "sucess", message: "user registered" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect credentials" });
    } else {
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        userLevel: user.userLevel,
      };

      res.send({
          status: "sucess",
          message: "Logged In",
          payload: req.session.user,
        })
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
