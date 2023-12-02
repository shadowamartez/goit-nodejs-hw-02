import path from "path";
import fs from "fs/promises";
import User from "../../models/User.js";

const updateAvatar = async (req, res) => {
    try {
        const { filename, path: tmpFilePath } = req.file;
        const newPath = path.join(tmpPath, filename);

        await fs.rename(tmpFilePath, newPath);

        const avatar = await processAvatar(newPath, avatarsPath, filename);

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true }
        );

        res.status(200).json({
            avatarURL: path.join("avatars", filename),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default updateAvatar; 