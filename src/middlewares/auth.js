function checkLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}

function checkAdmin(req, res, next) {
  console.log(req.session.user);
    if (req.session.user) {
      console.log(req.session.user);
      const {userLevel} = req.session.user;
      console.log(userLevel);
      if (userLevel === "admin") {
      return res.redirect("/cart/6434c6d595f9e8d1043cb867");
      }
      if (userLevel === "user") {
        return res.redirect("/products");
      }
    }
    next();
}

export { checkLogged, checkLogin, checkAdmin };
