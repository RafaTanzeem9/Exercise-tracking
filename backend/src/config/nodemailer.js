const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: "rafa.tanzeem@piecyfer.com",
    pass: "TVcgCDxJQXM3",
  },
});
