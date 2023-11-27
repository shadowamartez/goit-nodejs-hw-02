import Contact from "../../models/Contact.js";

const addById = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});

    res.status(201).json(result);
};

export default addById;