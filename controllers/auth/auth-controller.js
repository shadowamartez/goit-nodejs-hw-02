import { ctrlWrapper } from "../../decorators/index.js";
import { signup, signin, getCurrent, signout } from "./index.js";

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}
