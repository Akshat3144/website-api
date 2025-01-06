const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();

connectDB();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/contact-us", require("./routes/contactus.route"));

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
