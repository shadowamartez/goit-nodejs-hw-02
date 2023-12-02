import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

const avatarsPath = path.resolve("public", "avatars");
const tmpPath = path.resolve("tmp");

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

        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarURL,
        });

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