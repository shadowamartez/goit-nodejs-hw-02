import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import {isEmptyBody} from "../../middlewares/index.js";
import {validateBody} from "../../decorators/index.js";
import { contactAddSchema, contactUpdateSchema } from "../../schemas/contacts-schema.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts); 

contactsRouter.get('/:id', contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.addById); 

contactsRouter.put('/:id', isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

contactsRouter.delete('/:id', contactsController.deleteById);

export default contactsRouter; 
