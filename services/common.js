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
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjI3YzNiMzBkMzQ0NzQ5YTg5M2M1NSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk2NzU4ODQzfQ.jNAlgqSQLurbsbbJO8fMdoQkENwYYrqFrMaXZnqSeAI";
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjI2ZTgxN2Q5YzQyZTgyZjZmY2I3MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk2NzgzMDMzfQ.vLXFMBhnK3S0pRp4I3fOMXpD9rvcWoIqGFF5oYYbobo";
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjM5M2YzNjc4MmFiNTI4YjM5NTQxOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk2ODMwNDU3fQ.F5t2OMNnrj1CYeFzasVOBi0smloz7GB4fB2saoBNAmU";
  return token;
};
