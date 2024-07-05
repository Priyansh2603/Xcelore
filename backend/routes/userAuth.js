import express from "express";
import {protect} from '../middlewares/protect.js'
import { authLogin, authRegister, getUser} from "../controllers/userAuth.js";
import { loginValidation, registerValidation } from "../middlewares/authValidator.js";
import validate from "../middlewares/validate.js";

const router = express.Router();
// router.post("/login",authLogin);
router.post('/register', registerValidation, validate, authRegister);
router.post('/login', loginValidation, validate, authLogin);
router.post("/getUser",protect,getUser);
export const authroute = router;