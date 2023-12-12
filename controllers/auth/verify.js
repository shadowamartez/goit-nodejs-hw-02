import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

const { BASE_URL } = process.env;

const verify = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) {
        throw HttpError(401, "Email not found");
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });

    res.json({
        message: "Email verify success"
    })
}
export default verify;



