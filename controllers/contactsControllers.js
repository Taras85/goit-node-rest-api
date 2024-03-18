import HttpError from "../helpers/HttpError.js";

import {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContactById,
  updateStatusById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page=1, limit=20, favorite } = req.query;
  try {
    const result = await listContacts(owner, page, limit, favorite);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id: owner } = req.user;
  try {
    const { id } = req.params;
    const result = await getContactById(owner, id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id: owner } = req.user;
  try {
    const { id } = req.params;
    const result = await removeContact(owner, id);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { id: owner } = req.user;
  try {
    const result = await addContact({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id: owner } = req.user;
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const result = await updateContactById( owner, id, req.body );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id: owner } = req.user;
  try {
    const { id } = req.params;

    const result = await updateStatusById(owner, id, req.body );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
