import {HttpError} from "../../helpers/index.js";
import Contact from "../../models/Contact.js";

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json({
        message: "contact deleted"
    })
};

export default deleteById;
