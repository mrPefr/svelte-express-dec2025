require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: "mrpefr@gmail.com",
        pass: process.env.MAIL,
    },
});

async function sendCode(email, code) {
  const info = await transporter.sendMail({
    from: 'mrpefr@gmail.com',
    to: email,
    subject: "CODE",
    text: "code: "+code, // plain‑text body
    html: "<b>code: "+code+"</b>", // HTML body
  });


};

module.exports = sendCode;