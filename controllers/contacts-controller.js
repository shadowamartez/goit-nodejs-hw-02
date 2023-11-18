import * as contactsService from "../models/contacts.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
}

const addById = async (req, res) => {
    const result = await contactsService.addContact(req.body); 
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body); 
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result); 
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id, req.body); 
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json({
        message: "contact deleted"
    })
}

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getById: ctrlWrapper(getById),
    addById: ctrlWrapper(addById),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}