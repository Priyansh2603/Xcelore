import express from "express";
import {protect} from '../middlewares/protect.js'
import { AddUser, deleteUser, editUserDetails, getAllUsers, searchUser } from "../controllers/adminTasks.js";

const router = express.Router();
// router.post("/login",authLogin);
router.post("/add",protect,AddUser);
router.get("/getUsers",protect,getAllUsers);
router.delete("/delete/:userId",protect,deleteUser);
router.put("/update/:userId",protect, editUserDetails);
router.post("/search",protect,searchUser);
export const adminRoute = router;