function admin(req, res, next) {
  if (req.session.passport) {
    if (req.session.passport.user.isAdmin) {
      next();
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
}

module.exports = admin;
