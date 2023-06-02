import { sendError } from "../utils/helpers.js";
import ResetToken from "../models/resetToken.js";
import User from "../models/Users.js";
import { mongoose } from "mongoose";

const isResetTokenValid = async (req, res, next) => {
  const { id, token } = req.query;

  if (!(token || id)) return sendError(res, "Invalid request");

  if (!mongoose.Types.ObjectId.isValid(id))
    return sendError(res, "Invalid user");

  const user = await User.findById(id);
  if (!user) return sendError(res, "User not found");

  const resetToken = await ResetToken.findOne({ owner: user._id });
  if (!resetToken) return sendError(res, "Reset token not found");

  const validToken = await resetToken.compareToken(token);
  if (!validToken) return sendError(res, "Reset token is not valid");

  req.user = user;
  next();
};

export default isResetTokenValid;
