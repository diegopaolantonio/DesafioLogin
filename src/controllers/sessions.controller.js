import { responder } from "../traits/Responder.js";

export async function postRegister(req, res) {
  try {
    return res.send({ status: "Success", message: "User registered" });
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function getFailRegister(req, res) {
  try {
    return responder.errorResponse(res, products.error = "Register error", 400);
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function postLogin(req, res) {
  try {
    if (!req.user) {
      return responder.errorResponse(res, products.error = "Unauthorized", 401);
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      cart: req.user.cart,
      rol: req.user.rol,
    };
    return responder.successResponse(res, req.user);
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function getFailLogin(req, res) {
  try {
    return responder.errorResponse(res, products.error = "Failed login", 400);
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function getCurrent(req, res) {
  try {
    if (!req.session.user) {
      res.send({ status: "No user logged" });
    }
    res.send({ status: "User logged", payload: req.session.user });
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function getGithub(req, res) {}

export async function getGithubCallback(req, res) {
  try {
    req.session.user = req.user;
    res.redirect("/products");
  } catch (error) {
    return responder.errorResponse(res, error.message)
  }
}

export async function getLogout(req, res) {
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
    return responder.errorResponse(res, error.message)
  }
}
