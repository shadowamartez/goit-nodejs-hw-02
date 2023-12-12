import express from "express"; 
import authController from "../../controllers/auth/auth-controller.js";
import {authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupSchema, userSigninSchema, userEmailSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), isEmptyBody, validateBody(userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema), authController.resendVerify);

authRouter.post("/signin", isEmptyBody, validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

export default authRouter;
