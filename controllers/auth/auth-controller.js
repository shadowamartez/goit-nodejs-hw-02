import { ctrlWrapper } from "../../decorators/index.js";
import { signup, signin, getCurrent, signout, processAvatar, updateAvatar } from "./index.js";

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    processAvatar: ctrlWrapper(processAvatar),
    updateAvatar: ctrlWrapper(updateAvatar),
}
