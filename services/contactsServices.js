
import { Contact } from "../schemas/contactsSchemas.js";

async function listContacts() {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  return data;
}

async function getContactById(contactId) {
  const result = Contact.findById(contactId);
  return result || null;
}

async function addContact({ name, email, phone, favorite }) {
  const newContact = {
    name,
    email,
    phone,
    favorite,
  };
  const addContact = await Contact.create(newContact);
  return addContact;
}

async function removeContact(contactId) {
  const deleteContact= await Contact.findByIdAndDelete(contactId);
  return deleteContact;
}

async function updateContactById(contactId, data) {
  const updateContact = await Contact.findByIdAndUpdate(contactId, data, {new: true} );
  return updateContact;
}

async function updateStatusById(contactId, data) {
  const updateStatusContact= await Contact.findByIdAndUpdate(contactId, data, {new: true});

  return updateStatusContact;
}

export {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContactById,
  updateStatusById,
};
