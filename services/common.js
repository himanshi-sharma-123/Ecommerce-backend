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
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjM5M2YzNjc4MmFiNTI4YjM5NTQxOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk2ODMwNDU3fQ.F5t2OMNnrj1CYeFzasVOBi0smloz7GB4fB2saoBNAmU";

  //admin@gmmail.com
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmE4Njg0MzQ4Mjg1ZmE3OGM0Yzk1OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3Mjg1NzcwfQ.9podwB0bdSLJOrDfwyzpbmBxKpY8Ns2miuwHw82tA5c";

  return token;
};
