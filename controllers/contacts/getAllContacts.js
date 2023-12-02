import Contact from "../../models/Contact.js";

const getAllContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, ...filterParams} = req.query;
    const skip = (page - 1) * limit;
    const filter = {owner, ...filterParams};
    
    const result = await Contact.find(filter, "-createdAt -updatedAt", {skip, limit}).populate("owner", "username email");
    const total = await Contact.countDocuments(filter);

    res.json({
        result,
        total,
    });
};

export default getAllContacts;