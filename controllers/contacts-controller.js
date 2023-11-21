import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Contact from "../models/Contact.js";

const getAllContacts = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
}

const addById = async (req, res) => {
    const result = await Contact.create(req.body); 
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body); 
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result); 
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id); 
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