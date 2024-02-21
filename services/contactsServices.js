import fs from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("./db/contacts.json");


async function listContacts() {
  const data = await fs.promises.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function updateContactById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

export {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContactById,
};
