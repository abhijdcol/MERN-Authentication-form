import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// here "/" means http://localhost:5000/api/user and it is set in server.js like this app.use("/api/users", userRoutes);
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
// router.get("/profile", getUserProfile);
// router.put("/profile", updateUserProfile);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
