
import { Contact } from "../schemas/contactsSchemas.js";

async function listContacts(owner, page, limit, favorite) {
  const skip = (page - 1) * limit
  let data
  if (favorite !== undefined && favorite.toLowerCase() === 'true') {
    data = await Contact.find({owner, favorite}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription");
  return data;
  }

  data = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription");
  return data;
}

async function getContactById(contactId) {
  const result = Contact.findById(contactId);
  return result || null;
}

async function addContact({ name, email, phone, favorite, owner }) {
  const newContact = {
    name,
    email,
    phone,
    favorite,
    owner,
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
