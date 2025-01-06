const ContactUs = require("../Models/contactus.model");

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
