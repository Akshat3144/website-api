const ContactUs = require("../models/contactus.model");
const nodemailer = require("nodemailer");

const getResponse = async (req, res) => {
  const contactus = req.body;

  if (!contactus.name || !contactus.email || !contactus.message) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return;
  }

  const newContactUs = new ContactUs(contactus);

  try {
    await newContactUs.save();

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `A Query from ${contactus.name}`,
      text: `Email: ${contactus.email}\nMessage: ${contactus.message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error in saving to database" });
  }
};

module.exports = { getResponse };
