const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
  //   if (req.user) {
  //     done();
  //   } else {
  //     res.send(401);
  //   }
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
