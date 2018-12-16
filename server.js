const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    auth: {
      user: "ridinleo@gmail.com",
      pass: "4318516now"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
);

app.post("/send-mail", (req, res) => {
  var mailOptions = {
    from: "ridinleo@gmail.com",
    to: "aryehshapiro@gmail.com",
    subject: "Someone sent a Contact Form from Trendhaus Web Page!",
    text: `Name: ${req.body.name}
  
             Email: ${req.body.email}
  
             Message: ${req.body.message}
      `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Massege was sent! :)");
      console.log(info);
    }
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
