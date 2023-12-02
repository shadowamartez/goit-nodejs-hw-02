import Jimp from "jimp";
import path from "path";
import { HttpError } from "../../helpers/index.js";

const processAvatar = async (inputPath, outputPath, filename) => {
    try {
        const image = await Jimp.read(inputPath);
        await image.resize(250, 250).writeAsync(path.join(outputPath, filename));
        return path.join("avatars", filename);
    } catch (error) {
        console.error("Avatar processing error:", error);
        throw HttpError(500, "Avatar processing error");
    }
};

export default processAvatar; 