export async function postRegister(req, res) {
  try {
    return res.send({ status: "Success", message: "User registered" });
  } catch (error) {
    console.log(error);
  }
}

export async function getFailRegister(req, res) {
  try {
    return res.send({ status: "error", error: "Register error" });
  } catch (error) {
    console.log(error);
  }
}

export async function postLogin(req, res) {
  try {
    if (!req.user) {
      return res.status(401).send({ status: "error", error: "Unauthorized" });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      cart: req.user.cart,
      rol: req.user.rol,
    };
    res.send({ status: "Success", payload: req.user });
  } catch (error) {
    console.log(error);
  }
}

export async function getFailLogin(req, res) {
  try {
    res.send({ status: "error", error: "Failed login" });
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrent(req, res) {
  try {
    if (!req.session.user) {
      res.send({ status: "No user logged" });
    }
    res.send({ status: "User logged", payload: req.session.user });
  } catch (error) {
    console.log(error);
  }
}

export async function getGithub(req, res) {}

export async function getGithubCallback(req, res) {
  try {
    req.session.user = req.user;
    res.redirect("/products");
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
}
