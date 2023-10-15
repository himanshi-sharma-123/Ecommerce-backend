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

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // TODO: this is temporary token

  //demo@gmail.com

  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmFhOTZjZTcyZTFiYzdlYWE0MDc0ZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3Mjk0NzA2fQ.NgsJQwKUKX_GT-HbzoPN_n_4WvK6hhjoXzBxR8IOyWM";

  //admin@gmmail.com

  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmFiMWM1YWM4ZGQ0OWU4YjE3OTI3NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3Mjk2ODQzfQ.q3UPYg21jA1yQnO0Kg8T_lvqpfsI_wNpnuXjPJOXFjc";

  return token;
};
