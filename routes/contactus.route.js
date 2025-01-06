const express = require("express");
const { getResponse } = require("../controller/contactus.controller");

const router = express.Router();

router.post("/", getResponse);

module.exports = router;
