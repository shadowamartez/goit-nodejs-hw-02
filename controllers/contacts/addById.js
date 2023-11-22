import Contact from "../../models/Contact.js";

const addById = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

export default addById;