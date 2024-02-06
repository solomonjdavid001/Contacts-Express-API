const asyncHandler = require("express-async-handler");
const responseHandler = require("../middlewares/responseHandler.middlewares");
const Contact = require("../models/contact.models");

//@desc Get All contacts
//@route GET /api/v1/contacts/allContacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ uuid: req.user.id });
  responseHandler(res, 200, "List of all contacts", contacts);
});

//@desc Create new contact
//@route POST /api/v1/contacts/addContact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    responseHandler(res, 400, "All fields are mandatory !", []);
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    uuid: req.user.id,
  });
  responseHandler(res, 201, "New Contact Created", contact);
});

//@desc Get contact
//@route GET /api/v1/contacts/getContact
const getContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.query;
  console.log(name + " " + phone);
  if (!name && !phone) {
    responseHandler(res, 400, "Name or Phone is required", []);
  }

  const contact = await Contact.findOne({ $or: [{ name }, { phone }] });
  if (!contact) {
    responseHandler(res, 404, "Contact not found", []);
  }
  responseHandler(res, 200, "Contact data", contact);
});

//@desc Update contact
//@route PUT /api/v1/contacts/updateContact
const updateContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.query;
  if (!name && !phone) {
    responseHandler(res, 400, "Name or Phone is required", []);
  }

  const contact = await Contact.findOne({ $or: [{ name }, { phone }] });
  if (!contact) {
    responseHandler(res, 404, "Contact not found", []);
  }

  if (contact.uuid.toString() !== req.user.id) {
    responseHandler(
      res,
      403,
      "User doesnt have permission to update other user's contact",
      []
    );
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { $or: [{ name }, { phone }] },
    req.body,
    { new: true }
  );

  responseHandler(res, 200, "Contact Updated", updatedContact);
});

//@desc Delete contact
//@route DELETE /api/v1/contacts/deleteContact
const deleteContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.query;
  if (!name && !phone) {
    responseHandler(res, 400, "Name or Phone is required", []);
  }
  const contact = await Contact.findOneAndDelete({
    $or: [{ name }, { phone }],
  });
  if (!contact) {
    responseHandler(res, 404, "Contact not found", []);
  }

  if (contact.uuid.toString() !== req.user.id) {
    responseHandler(res, 403, "User doesnt have permission to delete other user's contact", []);
  }
  
  responseHandler(res, 200, "Contact Deleted", contact);
});

module.exports = {
  createContact,
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
