import express from "express";

const router = express.Router();
import {registerController,loginController,userController,refreshController,locationController} from "../controllers";
import auth from "../middlewares/auth";

router.post("/register",registerController.register);
router.post("/login",loginController.login);
router.get("/me",auth,userController.me);
router.post("/refresh",refreshController.refresh);
router.post("/logout",auth,loginController.logout);
router.post("/location",locationController.location);

export default router;