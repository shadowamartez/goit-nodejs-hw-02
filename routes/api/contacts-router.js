import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import {isEmptyBody, isValidId} from "../../middlewares/index.js";
import {validateBody} from "../../decorators/index.js";
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts); 

contactsRouter.get('/:id', isValidId, contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.addById); 

contactsRouter.put('/:id', isEmptyBody, isValidId, validateBody(contactUpdateSchema), contactsController.updateById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody, validateBody(contactFavoriteSchema), contactsController.updateById);

contactsRouter.delete('/:id', isValidId, contactsController.deleteById);

export default contactsRouter; 
