import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { nanoid } from "nanoid";

export const avatarsPath = path.resolve("public", "avatars");
export const tmpPath = path.resolve("tmp");

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { filename, path: tmpFilePath } = req.file;
        const newPath = path.join(tmpPath, filename);

        await fs.rename(tmpFilePath, newPath);

        const avatarURL = gravatar.url(email, { s: '250', d: 'retro' });

        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email is already in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationCode = nanoid();

        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarURL,
            verificationCode,
        });

        const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
        }
        await sendEmail(verifyEmail);

        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            avatarURL: newUser.avatarURL,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export default signup; 