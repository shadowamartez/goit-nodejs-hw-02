import {HttpError} from "../../helpers/index.js";
import Contact from "../../models/Contact.js";

const deleteById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndDelete({_id: id, owner});

    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }

    // res.status(204).send();

    res.json({
        message: "Delete success"
    })
};

export default deleteById;
