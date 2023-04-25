function checkLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}

function checkRol(req, res, next) {
    if (req.session.user) {
      const {userLevel} = req.session.user;
      if (userLevel === "admin") {
      return res.redirect("/cart/6434c6d595f9e8d1043cb867");
      }
      if (userLevel === "user") {
        return res.redirect("/products");
      }
    }
    next();
}

export { checkLogged, checkLogin, checkRol };
