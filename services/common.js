const passport = require("passport");
const nodemailer = require("nodemailer");

//Email

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "himanshish456@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

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

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"E-commerce" <himanshish456@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  return info;
};
