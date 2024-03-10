// import fs from "fs";
// import { nanoid } from "nanoid";
// import path from "path";


import { Contact } from "../schemas/contactsSchemas.js"


async function listContacts() {
  const data = await Contact.find();
  return data;
}

async function getContactById(contactId) {


  const result = Contact.findById(contactId);
  return result || null;

}

async function addContact({ name, email, phone, favorite }) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    favorite,
  };
  contacts.push(newContact);
  await Contact.create(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await Contact.findByIdAndDelete(contactId);
  return result;
}

async function updateContactById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
    for (const key in data) {
    if (data.hasOwnProperty(key)) {
      contacts[index][key] = data[key];
    }
  }
  await Contact.findByIdAndUpdate(id, data);

  return contacts[index];
}

async function updateStatusById(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
    for (const key in data) {
    if (data.hasOwnProperty(key)) {
      contacts[index][key] = data[key];
    }
  }
  await Contact.findByIdAndUpdate(contactId, data);

  return contacts[index];
}

export {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContactById,
  updateStatusById,
};
