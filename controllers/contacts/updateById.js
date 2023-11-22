import HttpError from "../../helpers/HttpError.js";
import Contact from "../../models/Contact.js";

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

export default updateById;