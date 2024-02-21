import HttpError from "../helpers/HttpError.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";


import {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContactById,
} from "../services/contactsServices.js";






export const getAllContacts = async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async(req, res) => {};

export const createContact = async (req, res, next) => {
  try {
    // const result = await addContact(req.body)
    const { error }= createContactSchema.validate(req.body)
    
    
    // res.status(201).json(result)

  } catch (error) {
    next(error)
  }
};

export const updateContact = (req, res) => {};
