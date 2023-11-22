import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import {getAllContacts, getById, addById, updateById, deleteById} from "./index.js";

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getById: ctrlWrapper(getById),
    addById: ctrlWrapper(addById),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
};
