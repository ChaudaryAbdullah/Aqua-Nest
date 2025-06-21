// middleware/isAdmin.js
import { User } from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  console.log(req.headers);
  const userId = req.headers.userid || req.body.userId;
  if (!userId) return res.status(401).json({ message: "User ID required" });
  console.log("user athorized");
  const user = await User.findById(userId);
  if (!user?.isAdmin)
    return res.status(403).json({ message: "Not authorized" });

  next();
};
