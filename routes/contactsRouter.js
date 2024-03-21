import express from "express";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import {authenticate} from "../middlewares/authenticate.js"

const contactsRouter = express.Router();

contactsRouter.get("/",authenticate, getAllContacts);

contactsRouter.get("/:id",authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id",authenticate, isValidId, deleteContact);

contactsRouter.post("/",authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite/",
  authenticate,
  isValidId,
  validateBody(updateContactFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
