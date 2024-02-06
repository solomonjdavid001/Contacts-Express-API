const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controllers");
const validateToken = require("../middlewares/validateToken.middlewares");

router.use(validateToken);

router.get("/allContacts", getContacts);
router.post("/addContact", createContact);
router.get("/getContact", getContact);
router.put("/updateContact", updateContact);
router.delete("/deleteContact", deleteContact);

module.exports = router;
